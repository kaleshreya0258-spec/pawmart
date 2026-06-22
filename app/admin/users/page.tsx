'use client'
import { useState } from 'react'
import { users as initialUsers, User } from '@/lib/data'
import { Search, UserCheck, ShieldCheck, ArrowLeft, Mail, Calendar, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/admin/PageHeader'

export default function AdminUsersPage() {
  const router = useRouter()
  const [items] = useState<User[]>(initialUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'customer'>('all')

  const filtered = items.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const admins = items.filter(u => u.role === 'admin').length
  const customers = items.filter(u => u.role === 'customer').length

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Desktop header */}
      <PageHeader title="Users" subtitle={`${items.length} users registered`} />

      {/* Mobile header */}
      <div className="lg:hidden flex items-center gap-3 mb-5">
        <button onClick={() => router.back()} className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Users</h2>
          <p className="text-gray-500 text-xs">{items.length} registered</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-5">
        {[
          { label: 'Total',     value: items.length, icon: UserCheck,   color: 'text-blue-600 bg-blue-50' },
          { label: 'Customers', value: customers,     icon: ShoppingBag, color: 'text-purple-600 bg-purple-50' },
          { label: 'Admins',    value: admins,        icon: ShieldCheck, color: 'text-orange-600 bg-orange-50' },
        ].map(s => (
          <div key={s.label} className="card p-3 md:p-5 flex items-center gap-3">
            <span className={`p-2 md:p-2.5 rounded-xl ${s.color} shrink-0`}><s.icon className="w-4 h-4 md:w-5 md:h-5" /></span>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 truncate">{s.label}</p>
              <p className="text-lg md:text-xl font-bold text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input pl-9" placeholder="Search name or email…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(['all', 'customer', 'admin'] as const).map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                roleFilter === r ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
              }`}>
              {r === 'all' ? 'All' : r.charAt(0).toUpperCase() + r.slice(1) + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {filtered.map(u => (
          <div key={u.id} className="card p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold shrink-0">
              {u.name[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-gray-900 text-sm">{u.name}</p>
                {u.role === 'admin'
                  ? <span className="bg-orange-100 text-orange-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><ShieldCheck className="w-2.5 h-2.5" /> Admin</span>
                  : <span className="bg-blue-100 text-blue-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">Customer</span>}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                <p className="text-xs text-gray-500 truncate">{u.email}</p>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-[10px] text-gray-400">
                  <Calendar className="w-2.5 h-2.5" /> {u.joined}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400">
                  <ShoppingBag className="w-2.5 h-2.5" /> {u.orders} orders
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">User</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Role</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Joined</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium">Orders</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {u.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {u.role === 'admin'
                      ? <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit"><ShieldCheck className="w-3 h-3" /> Admin</span>
                      : <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">Customer</span>}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{u.joined}</td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-900">{u.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
