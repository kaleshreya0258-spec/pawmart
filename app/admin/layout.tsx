import AdminSidebar from '@/components/admin/Sidebar'
import AdminMobileHeader from '@/components/admin/MobileHeader'
import { SidebarProvider } from '@/context/SidebarContext'

export const metadata = { title: 'PawMart – Admin' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-950 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Right side */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile sticky header */}
          <AdminMobileHeader />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
