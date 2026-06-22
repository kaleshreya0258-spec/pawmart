'use client'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart</h1>
      <p className="text-gray-500 mb-6 text-sm text-center">
        Cart state is managed client-side via React state in this demo.<br/>Connect to a backend or localStorage to persist items.
      </p>
      <Link href="/shop" className="btn-primary">
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </Link>
    </div>
  )
}
