'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ShoppingCart, Star, Search } from 'lucide-react'
import { useProducts } from '@/context/ProductContext'
import { getCategoryEmoji } from '@/lib/data'
import { Suspense } from 'react'

const CATEGORIES = ['All', 'Dogs', 'Cats', 'Birds', 'Fish', 'Small Pets']

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get('cat') || 'All'

  const { products } = useProducts()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(initialCat)
  const [sort, setSort] = useState('default')
  const [cart, setCart] = useState<string[]>([])

  const filtered = products
    .filter(p => {
      const matchesCat = category === 'All' || p.category === category
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchesCat && matchesSearch
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return 0
    })

  const addToCart = (id: string) => setCart(c => [...c, id])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand-600">
            <span className="text-2xl">🐾</span> PawMart
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative p-2 hover:bg-orange-50 rounded-xl transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link href="/login" className="btn-secondary text-sm py-2 px-4">Log In</Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="input pl-9"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="input sm:w-40" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                category === cat
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-semibold text-lg">No products found</p>
            <p className="text-sm">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <div key={product.id} className="card overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                <Link href={`/shop/${product.id}`}>
                  <div className="bg-orange-50 h-44 flex items-center justify-center text-6xl overflow-hidden">
                    {product.image
                      ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      : getCategoryEmoji(product.category)}
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-xs text-brand-500 font-semibold">{product.category}</span>
                  <Link href={`/shop/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mt-1 text-sm leading-snug group-hover:text-brand-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{product.rating} ({product.reviews})</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{product.stock} in stock</p>
                  <div className="flex items-center justify-between mt-auto pt-3">
                    <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="btn-primary text-xs py-1.5 px-3"
                    >
                      {cart.includes(product.id) ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
