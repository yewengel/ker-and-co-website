'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/ServicesCondensed'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import Team from '@/components/Team'
import StakeholderHighlights from '@/components/StakeholderHighlights'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <ProjectsShowcase />
      <Team />
      <StakeholderHighlights />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
