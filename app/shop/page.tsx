'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ShoppingCart, Star, Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useProducts } from '@/context/ProductContext'
import { getCategoryEmoji } from '@/lib/data'
import { Suspense } from 'react'

const CATEGORIES = ['Dogs', 'Cats', 'Birds', 'Fish', 'Small Pets']

const SUBCATEGORIES: Record<string, { label: string; icon: string }[]> = {
  Dogs:        [{ label: 'All', icon: '🐶' }, { label: 'Food', icon: '🥩' }, { label: 'Toys & Play', icon: '🎾' }, { label: 'Grooming', icon: '✂️' }, { label: 'Leash & Collar', icon: '🦮' }],
  Cats:        [{ label: 'All', icon: '🐱' }, { label: 'Food', icon: '🐟' }, { label: 'Litter & Care', icon: '🪣' }, { label: 'Scratchers', icon: '🧶' }, { label: 'Beds', icon: '🛏️' }],
  Birds:       [{ label: 'All', icon: '🐦' }, { label: 'Bird Feed', icon: '🌾' }, { label: 'Cages', icon: '🏠' }, { label: 'Perches & Toys', icon: '🎠' }],
  Fish:        [{ label: 'All', icon: '🐟' }, { label: 'Fish Food', icon: '🦐' }, { label: 'Aquariums', icon: '🫙' }, { label: 'Filters & Pumps', icon: '💧' }],
  'Small Pets':[{ label: 'All', icon: '🐹' }, { label: 'Food & Treats', icon: '🥕' }, { label: 'Bedding', icon: '🛏️' }, { label: 'Habitat', icon: '🏡' }],
}

const RATING_OPTIONS = [4, 3, 2]

function FilterSection({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button onClick={onToggle} className="flex items-center justify-between w-full font-semibold text-gray-800 text-sm mb-3">
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && children}
    </div>
  )
}

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get('cat') || ''

  const { products } = useProducts()
  const [search, setSearch] = useState('')
  const [selectedCats, setSelectedCats] = useState<string[]>(initialCat ? [initialCat] : [])
  const [activeSub, setActiveSub] = useState('All')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState('default')
  const [cart, setCart] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openSections, setOpenSections] = useState({ price: true, category: true, rating: true })

  const maxPrice = Math.max(...products.map(p => p.price), 5000)

  const toggleCat = (cat: string) => {
    setSelectedCats(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
    setActiveSub('All')
  }

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections(s => ({ ...s, [key]: !s[key] }))

  const activeCat = selectedCats.length === 1 ? selectedCats[0] : null
  const subcats = activeCat ? SUBCATEGORIES[activeCat] : null

  const filtered = products
    .filter(p => {
      const matchesCat = selectedCats.length === 0 || selectedCats.includes(p.category)
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      const matchesRating = p.rating >= minRating
      return matchesCat && matchesSearch && matchesPrice && matchesRating
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return 0
    })

  const addToCart = (id: string) => setCart(c => [...c, id])

  const clearFilters = () => {
    setSelectedCats([])
    setPriceRange([0, maxPrice])
    setMinRating(0)
    setActiveSub('All')
  }

  const hasFilters = selectedCats.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice || minRating > 0

  const Sidebar = (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-gray-800 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" /> FILTERS
        </span>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-orange-500 font-semibold hover:underline flex items-center gap-1">
            Clear all <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Price */}
      <FilterSection title="Price" open={openSections.price} onToggle={() => toggleSection('price')}>
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category" open={openSections.category} onToggle={() => toggleSection('category')}>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCats.includes(cat)}
                onChange={() => toggleCat(cat)}
                className="w-4 h-4 accent-orange-500 rounded"
              />
              <span className={`text-sm ${selectedCats.includes(cat) ? 'text-orange-600 font-semibold' : 'text-gray-600'} group-hover:text-gray-900`}>
                {cat}
              </span>
              <span className="ml-auto text-xs text-gray-400">
                ({products.filter(p => p.category === cat).length})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Min. Rating" open={openSections.rating} onToggle={() => toggleSection('rating')}>
        <div className="space-y-2">
          {[0, ...RATING_OPTIONS].map(r => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="w-4 h-4 accent-orange-500"
              />
              <span className="flex items-center gap-1">
                {r === 0 ? (
                  <span className="text-sm text-gray-600">All Ratings</span>
                ) : (
                  <>
                    {Array.from({ length: r }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600">& above</span>
                  </>
                )}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand-600">
            <span className="text-2xl">🐾</span> PawMart
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="Search for products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative p-2 hover:bg-orange-50 rounded-xl transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link href="/login" className="btn-secondary text-sm py-2 px-4">Log In</Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile search */}
        <div className="md:hidden mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white"
            placeholder="Search for products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-xl text-sm font-semibold text-gray-700"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters {hasFilters && <span className="bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{selectedCats.length || '!'}</span>}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Desktop */}
          <aside className="hidden md:block w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              {Sidebar}
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-900">Filters</span>
                  <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
                </div>
                {Sidebar}
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Subcategory pills */}
            {subcats && (
              <div className="flex gap-3 mb-5 overflow-x-auto pb-1 scrollbar-hide">
                {subcats.map(sub => (
                  <button
                    key={sub.label}
                    onClick={() => setActiveSub(sub.label)}
                    className={`flex flex-col items-center gap-1.5 shrink-0 group`}
                  >
                    <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl transition-all ${
                      activeSub === sub.label
                        ? 'border-orange-500 bg-orange-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-orange-300'
                    }`}>
                      {sub.icon}
                    </div>
                    <span className={`text-xs font-medium text-center leading-tight max-w-[72px] ${
                      activeSub === sub.label ? 'text-orange-600' : 'text-gray-600'
                    }`}>
                      {sub.label}
                    </span>
                    {activeSub === sub.label && (
                      <div className="w-6 h-0.5 bg-orange-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Top bar */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{filtered.length}</span> products found
                {selectedCats.length > 0 && (
                  <span className="ml-1">in <span className="text-orange-600 font-medium">{selectedCats.join(', ')}</span></span>
                )}
              </p>
              <select
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                <option value="default">Sort: Relevance</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCats.map(cat => (
                  <span key={cat} className="flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 text-xs font-semibold px-3 py-1 rounded-full">
                    {cat}
                    <button onClick={() => toggleCat(cat)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
                {minRating > 0 && (
                  <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-semibold px-3 py-1 rounded-full">
                    {minRating}★ & above <button onClick={() => setMinRating(0)}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Product Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <p className="text-5xl mb-4">🔍</p>
                <p className="font-semibold text-lg text-gray-600">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
                <button onClick={clearFilters} className="mt-4 text-orange-500 text-sm font-semibold hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(product => (
                  <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                    <Link href={`/shop/${product.id}`}>
                      <div className="bg-orange-50 h-40 flex items-center justify-center text-6xl overflow-hidden">
                        {product.image
                          ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          : getCategoryEmoji(product.category)}
                      </div>
                    </Link>
                    <div className="p-3 flex flex-col flex-1">
                      <span className="text-[10px] text-orange-500 font-bold uppercase tracking-wide">{product.category}</span>
                      <Link href={`/shop/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 mt-0.5 text-xs sm:text-sm leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-500">{product.rating} ({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3">
                        <span className="text-base font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className={`text-xs py-1.5 px-3 rounded-xl font-semibold transition-colors ${
                            cart.includes(product.id)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-500 text-white hover:bg-orange-600'
                          }`}
                        >
                          {cart.includes(product.id) ? '✓ Added' : 'Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-gray-400">Loading…</div>}>
      <ShopContent />
    </Suspense>
  )
}
