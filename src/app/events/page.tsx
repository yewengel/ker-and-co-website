'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Briefcase, Globe, Users, Heart, Coffee } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { brand, eventHighlights, brandMedia } from '@/lib/brand'

export default function EventsPage() {
  const icons = [Globe, Heart, Coffee, Users]
  const images = [
    brandMedia.founder.portrait,
    brandMedia.ventures.hotel,
    brandMedia.ventures.export,
    brandMedia.ventures.mining,
  ]

  const blocks = eventHighlights.map((item, index) => ({
    ...item,
    icon: icons[index],
    image: images[index],
  }))

  return (
    <main className="relative min-h-screen bg-gray-50">
      <Navigation />

      <section className="pt-navbar pb-8 md:pb-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#C9A46A]/10 text-[#C9A46A] text-sm font-semibold mb-6">
              <Globe className="w-4 h-4" />
              Events & Engagement
            </div>
            <h1 className="text-2xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-5 font-heading">
              Events & <span className="text-[#C9A46A]">Engagement</span>
            </h1>
            <p className="text-xs md:text-xl text-gray-600 max-w-4xl mx-auto">
              Highlights from founder showcases, hospitality engagements, export meetings, and venture strategy sessions that shape the growth story of {brand.name}.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-10 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4 md:space-y-10">
          {blocks.map((b, idx) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`grid lg:grid-cols-2 gap-4 md:gap-8 items-center rounded-sm md:rounded-sm bg-white border border-gray-100 shadow-lg p-3 md:p-10`}
            >
              <div className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#C9A46A]/10 text-[#C9A46A] text-sm font-semibold">
                  <b.icon className="w-4 h-4" />
                  Events
                </div>
                <h2 className="text-base md:text-3xl font-bold text-gray-900 mt-2 md:mt-4">{b.title}</h2>
                <p className="text-[10px] md:text-base text-gray-600 mt-1.5 md:mt-3 leading-relaxed">{b.description}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => (window.location.href = '/gallery')}>
                    View Gallery
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" onClick={() => (window.location.href = '/partnerships')}>
                    Partners
                  </Button>
                </div>
              </div>

              <div className={`relative overflow-hidden rounded-sm shadow ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="relative aspect-[16/10]">
                  <Image
                    src={b.image}
                    alt={b.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </motion.div>
          ))}

          <div className="rounded-sm md:rounded-sm bg-gradient-to-r from-[#C9A46A] to-[#C9A46A] text-white p-4 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/10 text-white text-sm font-semibold">
                <Briefcase className="w-4 h-4" />
                Gallery
              </div>
              <h3 className="text-base md:text-3xl font-bold mt-2 md:mt-4">Explore Our Full Gallery</h3>
              <p className="text-[10px] md:text-base text-white/80 mt-1 md:mt-2 leading-relaxed max-w-2xl">
                Browse photos from our facilities, founder journey, venture engagements, and operational highlights across the Ker & Co. portfolio.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = '/gallery')}
              className="bg-white text-[#C9A46A] border-white hover:bg-gray-100"
            >
              Open Gallery
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
