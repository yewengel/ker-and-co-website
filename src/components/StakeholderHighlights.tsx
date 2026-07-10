'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Globe, ShieldCheck, Heart } from 'lucide-react'
import { brand, brandMedia } from '@/lib/brand'

export default function StakeholderHighlights() {
  const cards = [
    {
      title: 'Founder-Led Business Legacy',
      description:
        'Ker & Co. Business Group is rooted in our founder’s journey from a small import venture into a diversified portfolio built through practical market insight and disciplined growth.',
      icon: Globe,
    },
    {
      title: 'Diversified Venture Platform',
      description:
        'The group spans distribution, paper products, hospitality, wellness, real estate, mining, agriculture, and export—creating multiple pathways for long-term collaboration.',
      icon: ShieldCheck,
    },
    {
      title: 'Community Impact & Opportunity Creation',
      description:
        'Our ventures create employment, serve everyday needs, and build new opportunities across Ethiopian markets and future global trade relationships.',
      icon: Heart,
    },
  ]

  const featuredImages = [
    {
      title: 'Hospitality & Wellness',
      src: brandMedia.ventures.hotel,
      alt: 'Grand Palace Suites Hotel'
    },
    {
      title: 'Distribution Hub',
      src: brandMedia.ventures.paper,
      alt: 'Ker & Co. distribution hub'
    },
    {
      title: 'Founder Journey',
      src: brandMedia.founder.beginnings,
      alt: "Our founder's beginnings"
    }
  ]

  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 md:mb-12"
        >
          <h2 className="text-2xl md:text-5xl font-bold font-heading mb-2 md:mb-4">
            Growth, Trust & <span className="text-gradient">Commitment</span>
          </h2>
          <p className="text-xs md:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover why partners, investors, and stakeholders connect with {brand.name}—a founder-led group built on resilience, diversification, and long-term vision.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[2fr,3fr] gap-4 md:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[7px] md:rounded-[8px] shadow-xl md:shadow-2xl bg-white border border-gray-100"
          >
            <div className="relative aspect-[16/9] md:aspect-[16/11]">
              <Image
                src={brandMedia.ventures.distribution}
                alt="Ker & Co. group growth story"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-7 text-white">
                <div className="inline-flex items-center gap-1.5 md:gap-2 text-[9px] md:text-xs font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-[7px] bg-white/15 backdrop-blur">
                  <Globe className="w-3 h-3 md:w-4 md:h-4" />
                  {brand.tagline}
                </div>
                <h3 className="text-sm md:text-2xl font-bold mt-1.5 md:mt-3">A Group Built for Growth</h3>
                <p className="text-[10px] md:text-base text-white/85 mt-1 md:mt-2 leading-snug md:leading-relaxed max-w-xl line-clamp-2 md:line-clamp-none">
                  From Addis Ababa, {brand.name} continues to expand from strong local roots into new ventures, markets, and strategic partnerships.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 lg:grid-cols-3 gap-2 md:gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-[7px] md:rounded-[8px] border border-gray-100 shadow-md md:shadow-lg hover:shadow-xl transition-shadow p-2.5 md:p-7 flex flex-col"
              >
                <div className="inline-flex w-7 h-7 md:w-12 md:h-12 rounded-[7px] md:rounded-[8px] bg-medical-blue/10 items-center justify-center">
                  <card.icon className="w-3.5 h-3.5 md:w-6 md:h-6 text-medical-blue" />
                </div>
                <h3 className="text-[10px] md:text-xl font-bold text-gray-900 mt-1.5 md:mt-4 leading-tight">{card.title}</h3>
                <p className="text-[8px] md:text-base text-gray-600 mt-1 md:mt-2 leading-snug md:leading-relaxed flex-1 line-clamp-3 md:line-clamp-none">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:mt-12">
          <div className="mb-3 md:mb-6">
            <h3 className="text-lg md:text-3xl font-bold text-gray-900">Our Facilities</h3>
            <p className="text-[10px] md:text-base text-gray-600 mt-1">Modern headquarters and operational centers supporting our diversified business.</p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {featuredImages.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[7px] md:rounded-[8px] border border-gray-100 bg-white shadow-md md:shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[4/3] md:aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 md:p-4 text-left">
                    <div className="text-[9px] md:text-base text-white font-semibold">{item.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
