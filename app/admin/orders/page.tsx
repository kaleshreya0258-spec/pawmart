'use client'
import { useState } from 'react'
import { orders as initialOrders, Order } from '@/lib/data'
import { Search, X, ArrowLeft, Package, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/admin/PageHeader'

const statusClass: Record<string, string> = {
  Pending:    'badge-pending',
  Processing: 'badge-processing',
  Shipped:    'badge-shipped',
  Delivered:  'badge-delivered',
  Cancelled:  'badge-cancelled',
}

const STATUSES: Order['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function AdminOrdersPage() {
  const router = useRouter()
  const [items, setItems] = useState<Order[]>(initialOrders)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [detail, setDetail] = useState<Order | null>(null)

  const filtered = items.filter(o => {
    const matchSearch = o.id.includes(search) || o.customer.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'All' || o.status === filterStatus
    return matchSearch && matchStatus
  })

  const updateStatus = (id: string, status: Order['status']) => {
    setItems(orders => orders.map(o => o.id === id ? { ...o, status } : o))
    if (detail?.id === id) setDetail(d => d ? { ...d, status } : null)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Desktop header */}
      <PageHeader title="Orders" subtitle={`${items.length} orders total`} />

      {/* Mobile header */}
      <div className="lg:hidden flex items-center gap-3 mb-5">
        <button onClick={() => router.back()} className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Orders</h2>
          <p className="text-gray-500 text-xs">{items.length} total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input pl-9" placeholder="Search order or customer…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input sm:w-44" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All statuses</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Status pills */}
      <div className="flex gap-2 flex-wrap mb-5 overflow-x-auto pb-1">
        {['All', ...STATUSES].map(s => {
          const count = s === 'All' ? items.length : items.filter(o => o.status === s).length
          return (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-colors ${
                filterStatus === s ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
              }`}>
              {s} ({count})
            </button>
          )
        })}
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {filtered.map(o => (
          <button key={o.id} onClick={() => setDetail(o)}
            className="card p-4 w-full text-left hover:shadow-md active:scale-[0.99] transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-gray-500">{o.id}</span>
                  <span className={statusClass[o.status]}>{o.status}</span>
                </div>
                <p className="font-semibold text-gray-900 text-sm">{o.customer}</p>
                <p className="text-xs text-gray-400 mt-0.5">{o.date} · {o.items.length} item{o.items.length > 1 ? 's' : ''}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-bold text-gray-900 text-sm">₹{o.total.toLocaleString()}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Order ID</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Customer</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Date</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium">Total</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-gray-700">{o.id}</td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900">{o.customer}</p>
                    <p className="text-xs text-gray-400">{o.email}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{o.date}</td>
                  <td className="px-5 py-3"><span className={statusClass[o.status]}>{o.status}</span></td>
                  <td className="px-5 py-3 text-right font-bold text-gray-900">₹{o.total.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => setDetail(o)} className="text-xs text-brand-500 font-semibold hover:underline">View details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order detail drawer — bottom sheet on mobile, right panel on desktop */}
      {detail && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end lg:items-stretch lg:justify-end">
          <div className="bg-white w-full lg:w-[420px] rounded-t-3xl lg:rounded-none flex flex-col max-h-[90vh] lg:max-h-none lg:h-full">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <div>
                <h2 className="font-bold text-gray-900">{detail.id}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{detail.date}</p>
              </div>
              <button onClick={() => setDetail(null)} className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors active:scale-95">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Status badge */}
              <div className="flex items-center gap-2">
                <span className={statusClass[detail.status]}>{detail.status}</span>
              </div>

              {/* Customer */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Customer</p>
                <p className="font-semibold text-gray-900">{detail.customer}</p>
                <p className="text-sm text-gray-500">{detail.email}</p>
              </div>

              {/* Items */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Order Items</p>
                <div className="space-y-2">
                  {detail.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                      <Package className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="flex-1 text-sm text-gray-800">{item.name}</span>
                      <span className="text-xs text-gray-500">×{item.qty}</span>
                      <span className="font-semibold text-sm">₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-gray-900 mt-3 pt-3 border-t border-gray-100 px-1">
                  <span>Total</span>
                  <span>₹{detail.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Status update */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {STATUSES.map(s => (
                    <button key={s} onClick={() => updateStatus(detail.id, s)}
                      className={`py-2.5 rounded-xl text-xs font-semibold border transition-all active:scale-95 ${
                        detail.status === s
                          ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/25'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
