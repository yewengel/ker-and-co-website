'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Building2, Coffee, ArrowRight,
  CheckCircle, Heart, Globe, Shield, Leaf, Factory
} from 'lucide-react'
import { PaperIcon, HospitalityIcon, CoalMiningIcon } from '@/components/icons/DepartmentIcons'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { brand, departments as brandDepartments } from '@/lib/brand'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const departmentIconMap = {
  distribution: Globe,
  paper: PaperIcon,
  hospitality: HospitalityIcon,
  'real-estate': Building2,
  mining: Factory,
  'coal-mining': CoalMiningIcon,
  agriculture: Leaf,
  exports: Coffee,
} as const

const departmentPalette = ['blue', 'amber', 'red', 'charcoal', 'blue', 'amber', 'red', 'charcoal'] as const

const departments = brandDepartments.map((department, index) => ({
  ...department,
  icon: departmentIconMap[department.id as keyof typeof departmentIconMap],
  color: departmentPalette[index],
  highlights: [...department.features, ...department.benefits].slice(0, 6),
}))

const colorMap: Record<string, { bg: string; text: string; badge: string; border: string; light: string }> = {
  blue: { bg: 'bg-[#C9A46A]/8', text: 'text-[#C9A46A]', badge: 'bg-[#C9A46A]', border: 'border-[#C9A46A]/25', light: 'bg-[#C9A46A]' },
  amber: { bg: 'bg-[#C9A46A]/8', text: 'text-[#C9A46A]', badge: 'bg-[#C9A46A]', border: 'border-[#C9A46A]/25', light: 'bg-[#C9A46A]' },
  red: { bg: 'bg-[#C9A46A]/8', text: 'text-[#C9A46A]', badge: 'bg-[#C9A46A]', border: 'border-[#C9A46A]/25', light: 'bg-[#C9A46A]' },
  charcoal: { bg: 'bg-[#C9A46A]/8', text: 'text-[#C9A46A]', badge: 'bg-[#C9A46A]', border: 'border-[#C9A46A]/25', light: 'bg-[#C9A46A]' },
}

function DeptImageCarousel({ image1, image2, title, isEven }: { image1: string; image2: string; title: string; isEven: boolean }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const images = [image1, image2]

  return (
    <div className={`${!isEven ? 'lg:order-1' : ''}`}>
      {/* Mobile: tap-to-slide carousel */}
      <div className="md:hidden relative">
        <div
          className="relative h-48 rounded-sm overflow-hidden shadow-xl cursor-pointer"
          onClick={() => setActiveIdx((prev) => (prev + 1) % images.length)}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-300 carousel-slide"
              style={{ opacity: i === activeIdx ? 1 : 0 }}
            >
              <Image
                src={img}
                alt={i === 0 ? title : `${title} operations`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
          {/* Tap hint */}
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[8px] px-2 py-0.5 rounded-sm">
            Tap to slide
          </div>
          {/* Dots indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-sm transition-colors ${i === activeIdx ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: stacked images */}
      <div className="hidden md:block space-y-4">
        <div className="relative h-80 rounded-sm overflow-hidden shadow-xl">
          <Image
            src={image1}
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="relative h-56 rounded-sm overflow-hidden shadow-lg">
          <Image
            src={image2}
            alt={`${title} operations`}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </div>
  )
}

export default function DepartmentsPage() {
  return (
    <main className="relative min-h-screen bg-[#F8F4EF]">
      <Navigation />

      {/* Hero */}
      <section className="pt-navbar pb-10 md:pb-20 px-4 sm:px-6 lg:px-8 bg-[#F8F4EF]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#C9A46A]/14 text-[#C9A46A] text-sm font-semibold mb-6">
              <Globe className="w-4 h-4" />
              Our Departments
            </div>
            <h1 className="text-2xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-6 font-heading">
              {departments.length} Ventures, <span className="text-[#C9A46A]">One Vision</span>
            </h1>
            <p className="text-xs md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Explore the core ventures behind {brand.name}—a diversified platform built through distribution, hospitality, real estate, industrial activity, agriculture, and export growth.
            </p>
          </motion.div>

          {/* Quick Nav */}
          <div className="mt-6 md:mt-12 flex flex-wrap justify-center gap-1.5 md:gap-3">
            {departments.map((dept) => {
              const colors = colorMap[dept.color]
              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    const el = document.getElementById(dept.id)
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className={`inline-flex items-center gap-1 md:gap-2 px-2.5 py-1.5 md:px-5 md:py-2.5 rounded-sm ${colors.badge} text-white text-[10px] md:text-sm font-semibold hover:shadow-md transition-all border ${colors.border}`}
                >
                  <dept.icon className="w-3 h-3 md:w-4 md:h-4" />
                  {dept.title}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Department Sections */}
      {departments.map((dept, idx) => {
        const colors = colorMap[dept.color]
        const isEven = idx % 2 === 0

        return (
          <section
            key={dept.id}
            id={dept.id}
            className={`py-12 md:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24 bg-[#F8F4EF]`}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div {...fadeIn}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-sm ${colors.badge} flex items-center justify-center`}>
                    <dept.icon className={`w-5 h-5 text-white`} />
                  </div>
                  <span className={`text-sm font-semibold ${colors.text} uppercase tracking-wider`}>{dept.tagline}</span>
                </div>
                <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8">{dept.title}</h2>

                {/* Content Grid */}
                <div className={`grid lg:grid-cols-2 gap-5 md:gap-10 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <p className="text-xs md:text-lg text-gray-600 leading-relaxed mb-4 md:mb-8">
                      {dept.description}
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 md:gap-3">
                      {dept.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-1.5 md:gap-3">
                          <CheckCircle className={`w-3.5 h-3.5 md:w-5 md:h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-[10px] md:text-sm text-gray-700">{h}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="mt-8"
                      onClick={() => {
                        const el = document.getElementById('contact')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                        else window.location.href = '/#contact'
                      }}
                    >
                      Inquire About {dept.title}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  <DeptImageCarousel
                    image1={dept.image}
                    image2={dept.image2}
                    title={dept.title}
                    isEven={isEven}
                  />
                </div>
              </motion.div>
            </div>
          </section>
        )
      })}

      {/* CTA Section */}
      <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#C9A46A] to-[#C9A46A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-4">Ready to Work With Us?</h2>
            <p className="text-xs md:text-lg text-white/80 mb-4 md:mb-8">
              Whether you are exploring distribution, hospitality, industrial supply, agriculture, or export opportunities, {brand.shortName} is ready to build meaningful partnerships.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-[#C9A46A] hover:bg-gray-100"
                onClick={() => window.location.href = '/partnerships'}
              >
                Why Partner With Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10"
                onClick={() => window.location.href = '/#contact'}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
