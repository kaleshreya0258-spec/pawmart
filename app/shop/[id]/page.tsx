'use client'
import { use } from 'react'
import { useProducts } from '@/context/ProductContext'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Star, ShoppingCart, ArrowLeft, CheckCircle } from 'lucide-react'
import { getCategoryEmoji } from '@/lib/data'
import { useState } from 'react'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { products } = useProducts()
  const product = products.find(p => p.id === id)
  if (!product) notFound()

  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const emoji = getCategoryEmoji(product.category)

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/shop" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-xl font-bold text-brand-600">🐾 PawMart</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-start">
        <div className="bg-orange-50 rounded-3xl h-80 flex items-center justify-center text-[120px] overflow-hidden">
          {product.image
            ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            : emoji}
        </div>
        <div>
          <span className="text-xs font-semibold text-brand-500 bg-orange-50 px-3 py-1 rounded-full">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-3">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
            ))}
            <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          <p className="text-4xl font-bold text-gray-900 mb-2">₹{product.price.toLocaleString()}</p>
          <p className="text-sm text-green-600 font-medium mb-6">✓ {product.stock} in stock · Free delivery above ₹999</p>
          <button onClick={handleAdd} className="btn-primary text-base px-8 py-3 w-full justify-center">
            {added
              ? <><CheckCircle className="w-5 h-5" /> Added to Cart!</>
              : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
          </button>
        </div>
      </div>
    </div>
  )
}
