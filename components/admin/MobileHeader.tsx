'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, ArrowLeft, Bell, Search } from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'

const PAGE_TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/products':  'Products',
  '/admin/orders':    'Orders',
  '/admin/users':     'Users',
  '/admin/settings':  'Settings',
}

export default function AdminMobileHeader() {
  const { toggle } = useSidebar()
  const pathname = usePathname()
  const router = useRouter()

  const title = PAGE_TITLES[pathname] ?? 'Admin'
  const isDashboard = pathname === '/admin/dashboard'

  return (
    <header className="lg:hidden sticky top-0 z-30 bg-gray-900 border-b border-gray-800 px-4 h-14 flex items-center gap-3">
      {/* Hamburger */}
      <button
        onClick={toggle}
        className="p-2 -ml-1 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors active:scale-95"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Back button — hidden on dashboard */}
      {!isDashboard && (
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      {/* Page title */}
      <h1 className="flex-1 text-white font-semibold text-base truncate">{title}</h1>

      {/* Right icons */}
      <button className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors active:scale-95">
        <Search className="w-4.5 h-4.5" />
      </button>
      <button className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors active:scale-95">
        <Bell className="w-4.5 h-4.5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full ring-1 ring-gray-900" />
      </button>
      <button className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-xs shrink-0 active:scale-95 transition-transform">
        A
      </button>
    </header>
  )
}
