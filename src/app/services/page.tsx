'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Services from '@/components/ServicesFixed'

export default function ServicesPage() {
  return (
    <main className="relative">
      <Navigation />
      <div className="pt-navbar">
        <Services />
      </div>
      <Footer />
    </main>
  )
}
