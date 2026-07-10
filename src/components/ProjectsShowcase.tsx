'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Globe, 
  ShieldCheck, 
  Scale, 
  MapPin, 
  Building2, 
  CheckCircle,
  TrendingUp
} from 'lucide-react'
import { brand, partnershipReasons, brandMedia } from '@/lib/brand'

interface Reason {
  id: string
  title: string
  icon: any
  image: string
  description: string
  highlights: string[]
}

const ProjectsShowcase = () => {
  const icons = [TrendingUp, Globe, Building2, Scale, ShieldCheck, MapPin]
  const images = [
    brandMedia.ventures.grandPalace1,
    brandMedia.ventures.distribution,
    brandMedia.ventures.realEstate,
    brandMedia.ventures.grandPalace2,
    brandMedia.ventures.grandPalace3,
    brandMedia.ventures.export,
  ]

  const reasons: Reason[] = partnershipReasons.map((reason, index) => ({
    id: reason.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: reason.title,
    icon: icons[index],
    image: images[index],
    description: reason.description,
    highlights: [
      reason.title,
      brand.tagline,
      'Founder-led long-term vision',
      'Structured partnership opportunities',
    ],
  }))

  return (
    <section id="projects" className="py-10 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 md:mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold font-heading mb-3 md:mb-6">
            Why Partner With <span className="text-gradient">{brand.shortName}</span>
          </h2>
          <p className="text-xs md:text-xl text-gray-600 max-w-3xl mx-auto">
            A founder-led Ethiopian business group shaped by practical market knowledge, diversified execution, and a long-term growth mindset.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, scale: 0.8, y: 60 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white rounded-[7px] md:rounded-[8px] shadow-md md:shadow-lg hover-lift overflow-hidden border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-24 md:h-52 overflow-hidden">
                <Image
                  src={reason.image}
                  alt={reason.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-[7px] flex items-center justify-center">
                    <reason.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-2 md:p-5 lg:p-6">
                <h3 className="text-[11px] md:text-xl font-bold text-gray-900 mb-1 md:mb-3 leading-tight">
                  {reason.title}
                </h3>

                <p className="text-[9px] md:text-sm text-gray-600 leading-snug md:leading-relaxed mb-1 md:mb-4 line-clamp-3 md:line-clamp-none">
                  {reason.description}
                </p>

                <div className="hidden md:block space-y-2">
                  {reason.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-medical-blue flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsShowcase
