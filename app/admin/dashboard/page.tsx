'use client'
import { orders, users } from '@/lib/data'
import { useProducts } from '@/context/ProductContext'
import { Package, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/admin/PageHeader'

const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length
const recentOrders = [...orders].reverse().slice(0, 5)

const statusClass: Record<string, string> = {
  Pending:    'badge-pending',
  Processing: 'badge-processing',
  Shipped:    'badge-shipped',
  Delivered:  'badge-delivered',
  Cancelled:  'badge-cancelled',
}

export default function DashboardPage() {
  const router = useRouter()
  const { products } = useProducts()
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader title="Dashboard" subtitle="Welcome back, Admin 👋" />

      {/* Mobile title */}
      <div className="lg:hidden mb-5">
        <h2 className="text-lg font-bold text-gray-900">Welcome back 👋</h2>
        <p className="text-gray-500 text-sm">Here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6">
        {[
          { label: 'Revenue',      value: `₹${totalRevenue.toLocaleString()}`, icon: TrendingUp,  color: 'text-green-600 bg-green-50',   delta: '+18%' },
          { label: 'Orders',       value: orders.length,                        icon: ShoppingBag, color: 'text-blue-600 bg-blue-50',    delta: `${pendingOrders} pending` },
          { label: 'Products',     value: products.length,                      icon: Package,     color: 'text-orange-600 bg-orange-50', delta: '2 low stock' },
          { label: 'Customers',    value: users.filter(u => u.role === 'customer').length, icon: Users, color: 'text-purple-600 bg-purple-50', delta: '+3 this week' },
        ].map(stat => (
          <div key={stat.label} className="card p-4 md:p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium truncate">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{stat.delta}</p>
              </div>
              <span className={`p-2 md:p-2.5 rounded-xl ${stat.color} shrink-0`}>
                <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 card p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-brand-500 font-semibold hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full text-sm min-w-[480px] md:min-w-0">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left pb-3 px-4 md:px-0 text-gray-500 font-medium text-xs">Order</th>
                  <th className="text-left pb-3 text-gray-500 font-medium text-xs">Customer</th>
                  <th className="text-left pb-3 text-gray-500 font-medium text-xs">Status</th>
                  <th className="text-right pb-3 px-4 md:px-0 text-gray-500 font-medium text-xs">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td className="py-3 px-4 md:px-0 font-mono text-xs text-gray-700">{order.id}</td>
                    <td className="py-3 text-gray-800 text-xs md:text-sm">{order.customer}</td>
                    <td className="py-3">
                      <span className={statusClass[order.status]}>{order.status}</span>
                    </td>
                    <td className="py-3 px-4 md:px-0 text-right font-semibold text-gray-900 text-xs md:text-sm">
                      ₹{order.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top products */}
        <div className="card p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Top Products</h2>
            <Link href="/admin/products" className="text-xs text-brand-500 font-semibold hover:underline flex items-center gap-1">
              Manage <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((p, idx) => (
              <div key={p.id ?? idx} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-lg shrink-0">
                  {p.category === 'Dogs' ? '🐶' : p.category === 'Cats' ? '🐱' : p.category === 'Birds' ? '🐦' : p.category === 'Fish' ? '🐟' : '🐹'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.stock} in stock</p>
                </div>
                <p className="text-xs font-bold text-gray-900 shrink-0">₹{p.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
