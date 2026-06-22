'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingBag, Users,
  LogOut, ExternalLink, X, Settings, ChevronRight,
} from 'lucide-react'
import clsx from 'clsx'
import { useSidebar } from '@/context/SidebarContext'

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { href: '/admin/products',  label: 'Products',  icon: Package,          badge: '8' },
  { href: '/admin/orders',    label: 'Orders',    icon: ShoppingBag,      badge: '2' },
  { href: '/admin/users',     label: 'Users',     icon: Users,            badge: null },
  { href: '/admin/settings',  label: 'Settings',  icon: Settings,         badge: null },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { open, close } = useSidebar()

  const logout = () => {
    document.cookie = 'pawmart_admin_session=; max-age=0; path=/'
    router.push('/admin/login')
  }

  const handleNavClick = () => {
    // Auto-close on mobile after nav click
    close()
  }

  return (
    <>
      {/* Overlay — mobile only */}
      <div
        onClick={close}
        className={clsx(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          // Base
          'fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 flex flex-col',
          'transition-transform duration-300 ease-in-out',
          // Mobile: slide in/out
          'lg:static lg:translate-x-0 lg:z-auto lg:h-screen lg:shrink-0',
          open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        )}
      >
        {/* Logo + close button */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <Link
            href="/admin/dashboard"
            onClick={handleNavClick}
            className="flex items-center gap-2.5 text-white font-bold text-lg"
          >
            <span className="text-2xl leading-none">🐾</span>
            <div>
              <p className="leading-tight">PawMart</p>
              <p className="text-[10px] text-gray-500 font-normal leading-tight">Admin Panel</p>
            </div>
          </Link>
          <button
            onClick={close}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin avatar strip */}
        <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            A
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">Admin User</p>
            <p className="text-gray-500 text-xs truncate">admin@pawmart.com</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest px-3 pb-2">
            Main Menu
          </p>
          {NAV.map(({ href, label, icon: Icon, badge }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={handleNavClick}
                className={clsx(
                  'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
              >
                <Icon className={clsx('w-4.5 h-4.5 shrink-0', active ? 'text-white' : 'text-gray-500 group-hover:text-white')} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className={clsx(
                    'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                    active ? 'bg-white/20 text-white' : 'bg-gray-700 text-gray-300'
                  )}>
                    {badge}
                  </span>
                )}
                {active && <ChevronRight className="w-3.5 h-3.5 text-white/60" />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-gray-800 space-y-0.5">
          <Link
            href="/"
            target="_blank"
            onClick={handleNavClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            View Store
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  )
}
