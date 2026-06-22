'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Bell, Shield, Store, Palette } from 'lucide-react'
import PageHeader from '@/components/admin/PageHeader'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader title="Settings" subtitle="Manage your store preferences" />

      <div className="lg:hidden flex items-center gap-3 mb-5">
        <button onClick={() => router.back()} className="p-2 rounded-xl bg-gray-100 text-gray-600 active:scale-95 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">Settings</h2>
      </div>

      <div className="max-w-2xl space-y-4">
        {/* Store */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Store className="w-4 h-4 text-brand-500" />
            <h3 className="font-semibold text-gray-900">Store Details</h3>
          </div>
          <div className="space-y-3">
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Store Name</label><input className="input" defaultValue="PawMart" /></div>
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Support Email</label><input className="input" defaultValue="support@pawmart.com" /></div>
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Currency</label>
              <select className="input"><option>INR (₹)</option><option>USD ($)</option></select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-brand-500" />
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="space-y-3">
            {['New orders', 'Low stock alerts', 'Customer registrations', 'Daily sales report'].map(n => (
              <label key={n} className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-sm text-gray-700">{n}</span>
                <div className="relative">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 peer-checked:bg-brand-500 rounded-full transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-brand-500" />
            <h3 className="font-semibold text-gray-900">Security</h3>
          </div>
          <div className="space-y-3">
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Current Password</label><input type="password" className="input" placeholder="••••••••" /></div>
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label><input type="password" className="input" placeholder="••••••••" /></div>
          </div>
        </div>

        <button onClick={handleSave} className="btn-primary w-full sm:w-auto justify-center px-8">
          {saved ? '✓ Saved!' : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>
    </div>
  )
}
