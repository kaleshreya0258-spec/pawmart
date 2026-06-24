'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, Star, ArrowRight, Search } from 'lucide-react'
import { useProducts } from '@/context/ProductContext'
import { getCategoryEmoji } from '@/lib/data'

const categories = [
  { name: 'Dogs',       img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop&crop=faces,center&auto=format', color: 'bg-orange-50 border-orange-200',   href: '/shop?cat=Dogs' },
  { name: 'Cats',       img: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400&h=300&fit=crop&crop=faces,center&auto=format', color: 'bg-pink-50 border-pink-200',        href: '/shop?cat=Cats' },
  { name: 'Birds',      img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=300&fit=crop&crop=center&auto=format', color: 'bg-sky-50 border-sky-200',          href: '/shop?cat=Birds' },
  { name: 'Fish',       img: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=400&h=300&fit=crop&crop=center&auto=format', color: 'bg-teal-50 border-teal-200',        href: '/shop?cat=Fish' },
  { name: 'Small Pets', img: 'https://images.unsplash.com/photo-1591382386627-349b692688ff?w=400&h=300&fit=crop&crop=faces,center&auto=format', color: 'bg-yellow-50 border-yellow-200',    href: '/shop?cat=Small+Pets' },
]


export default function HomePage() {
  const { products, refreshProducts } = useProducts()
  const [searchTerm, setSearchTerm] = useState("")

  // ✅ Always fetch fresh data from MongoDB when homepage loads
  useEffect(() => {
    refreshProducts()
  }, [])

  const featured = products.filter(p => p.featured)
  const suggestions = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand-600">
            <span className="text-2xl">🐾</span>
            <span>PawMart</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/shop" className="hover:text-brand-600 transition-colors">Shop</Link>
            <Link href="/shop?cat=Dogs" className="hover:text-brand-600 transition-colors">Dogs</Link>
            <Link href="/shop?cat=Cats" className="hover:text-brand-600 transition-colors">Cats</Link>
            <Link href="/shop?cat=Birds" className="hover:text-brand-600 transition-colors">Birds</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative p-2 hover:bg-orange-50 rounded-xl transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
            </Link>
            <Link href="/login" className="hidden sm:inline-flex btn-secondary text-sm py-2 px-4">
              Log In
            </Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">
              Sign Up
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4 md:gap-12 items-center">

          {/* Text content */}
          <div>
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              🎉 Free delivery on orders over ₹999
            </span>
            <h1 className="font-display text-2xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-4">
              Everything<br/>
              <span className="text-brand-500">Your Pet</span><br/>
              Deserves
            </h1>
            <p className="text-gray-500 text-base md:text-lg mb-6 md:mb-8 max-w-md hidden sm:block">
              Premium food, toys, and accessories for dogs, cats, birds, fish & more — delivered to your door.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/shop" className="btn-primary text-xs md:text-base px-3 md:px-6 py-2 md:py-3 flex items-center gap-2">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/shop?featured=true" className="btn-secondary text-xs md:text-base px-3 md:px-6 py-2 md:py-3 hidden sm:inline-flex">
                View Bestsellers
              </Link>
            </div>

            {/* Search Box */}
            <div className="relative mt-4 md:mt-6 w-full max-w-md">
              <div className="flex items-center bg-white border rounded-2xl shadow-sm overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 outline-none text-xs md:text-sm"
                />
                <button className="bg-orange-500 text-white px-3 md:px-4 py-2 md:py-3" aria-label="Search">
                  <Search size={16} />
                </button>
              </div>
              {searchTerm && (
                <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow-lg mt-2 z-50">
                  {suggestions.length > 0 ? suggestions.map((product) => (
                    <Link key={product.id} href={`/shop/${product.id}`}
                      className="block px-4 py-3 hover:bg-orange-50 border-b last:border-0"
                      onClick={() => setSearchTerm("")}>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </Link>
                  )) : (
                    <p className="px-4 py-3 text-sm text-gray-400">No products found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Paw emoji - right side on both mobile and desktop */}
          <div className="flex justify-center items-center text-[80px] md:text-[180px] leading-none select-none">
            🐾
          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 md:mb-8">Shop by Pet</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {categories.map(cat => (
            <Link key={cat.name} href={cat.href}
              className={`${cat.color} border-2 rounded-2xl overflow-hidden hover:shadow-md transition-all group`}>
              <div className="h-28 md:h-36 overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="py-2 md:py-3 text-center">
                <span className="text-xs md:text-sm font-semibold text-gray-700">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Bestsellers</h2>
            <Link href="/shop" className="text-brand-600 text-sm font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map(product => (
              <Link key={product.id} href={`/shop/${product.id}`}
                className="card overflow-hidden hover:shadow-md transition-shadow group">
                <div className="bg-orange-50 h-36 md:h-48 flex items-center justify-center text-5xl md:text-6xl overflow-hidden">
                  {product.image
                    ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    : getCategoryEmoji(product.category)}
                </div>
                <div className="p-3 md:p-4">
                  <span className="text-xs text-brand-500 font-semibold">{product.category}</span>
                  <h3 className="font-semibold text-gray-900 mt-1 text-xs md:text-sm leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 md:mt-3">
                    <span className="text-base md:text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    <button className="btn-primary text-xs py-1 px-2 md:py-1.5 md:px-3">Add</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-10 md:py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {[
            { emoji: '🚚', title: 'Free Delivery',  sub: 'On orders above ₹999' },
            { emoji: '✅', title: 'Vet Approved',   sub: 'All products checked' },
            { emoji: '🔄', title: '30-Day Returns', sub: 'Hassle-free returns' },
            { emoji: '💬', title: '24/7 Support',   sub: 'Always here for you' },
          ].map(t => (
            <div key={t.title} className="flex flex-col items-center gap-2">
              <span className="text-2xl md:text-3xl">{t.emoji}</span>
              <p className="font-semibold text-gray-800 text-xs md:text-sm">{t.title}</p>
              <p className="text-xs text-gray-500">{t.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 pt-14 pb-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-white font-bold text-xl mb-2">🐾 PawMart</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">India's friendliest pet store. Premium products for every pet, delivered to your door.</p>
            <div className="flex gap-3 mt-2">
              {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center text-sm transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-white font-semibold mb-4">Shop</p>
            <ul className="space-y-2.5">
              {[
                { label: '🐶 Dogs',       href: '/shop?cat=Dogs' },
                { label: '🐱 Cats',       href: '/shop?cat=Cats' },
                { label: '🐦 Birds',      href: '/shop?cat=Birds' },
                { label: '🐟 Fish',       href: '/shop?cat=Fish' },
                { label: '🐹 Small Pets', href: '/shop?cat=Small+Pets' },
              ].map(c => (
                <li key={c.label}>
                  <Link href={c.href} className="hover:text-white transition-colors">{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-white font-semibold mb-4">Help</p>
            <ul className="space-y-2.5">
              {['Contact Us', 'FAQs', 'Returns & Refunds', 'Track Order', 'Shipping Info'].map(c => (
                <li key={c}><a href="#" className="hover:text-white transition-colors">{c}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold mb-4">Contact</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>42, Pet Lane, Bandra West,<br/>Mumbai – 400050</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+918001234567" className="hover:text-white transition-colors">+91 800 123 4567</a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:hello@pawmart.in" className="hover:text-white transition-colors">hello@pawmart.in</a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Mon–Sat, 9 AM – 7 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter */}
        <div className="max-w-7xl mx-auto mt-10 bg-gray-800 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold">🐾 Get pet care tips & exclusive offers</p>
            <p className="text-gray-400 text-xs mt-0.5">Join 20,000+ happy pet parents. Unsubscribe anytime.</p>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 sm:w-64 bg-gray-700 text-white text-sm px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} PawMart. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
              <a key={t} href="#" className="hover:text-white transition-colors">{t}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span>We accept:</span>
            {['💳', '🏦', '📱'].map((icon, i) => (
              <span key={i} className="bg-gray-800 px-2 py-1 rounded text-xs">{icon}</span>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}