'use client'

import AdminGuard from '@/components/AdminGuard'
import Navigation from '@/components/Navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-navbar px-4 sm:px-6 lg:px-8 pb-20">
          {children}
        </main>
      </div>
    </AdminGuard>
  )
}
