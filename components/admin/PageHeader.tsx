'use client'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

const CRUMBS: Record<string, { label: string; parent?: string }> = {
  '/admin/dashboard': { label: 'Dashboard' },
  '/admin/products':  { label: 'Products',  parent: '/admin/dashboard' },
  '/admin/orders':    { label: 'Orders',    parent: '/admin/dashboard' },
  '/admin/users':     { label: 'Users',     parent: '/admin/dashboard' },
  '/admin/settings':  { label: 'Settings',  parent: '/admin/dashboard' },
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const meta = CRUMBS[pathname]
  const isDashboard = pathname === '/admin/dashboard'

  return (
    <div className="hidden lg:block mb-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
        <Link href="/admin/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
          <Home className="w-3 h-3" /> Home
        </Link>
        {!isDashboard && meta && (
          <>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-gray-200 font-medium">{meta.label}</span>
          </>
        )}
      </nav>

      {/* Title row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {!isDashboard && (
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-150 active:scale-95 group"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold text-white leading-tight">{title}</h1>
            {subtitle && <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}
