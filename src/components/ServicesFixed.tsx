'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Globe,
  Shield,
  Heart,
  Building2,
  Factory,
  Leaf,
  Coffee,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react'
import { brand, departments as brandDepartments } from '@/lib/brand'

interface ServiceMedia {
  type: 'image'
  src: string
  alt: string
}

interface Service {
  id: string
  title: string
  description: string
  benefits: string[]
  features: string[]
  icon: any
  color: string
  media: ServiceMedia[]
}

const Services = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState<{[key: string]: number}>({})
  const [autoPlay, setAutoPlay] = useState<{[key: string]: boolean}>({})

  const serviceIcons = {
    distribution: Globe,
    paper: Shield,
    hospitality: Heart,
    'real-estate': Building2,
    mining: Factory,
    'coal-mining': Factory,
    agriculture: Leaf,
    exports: Coffee,
  } as const

  const serviceColors = ['bg-[#C9A46A]', 'bg-[#C9A46A]', 'bg-[#C9A46A]', 'bg-gray-900', 'bg-[#C9A46A]', 'bg-[#C9A46A]', 'bg-[#C9A46A]', 'bg-gray-900'] as const

  const services: Service[] = useMemo(() => (
    brandDepartments.map((department, index) => ({
      id: department.id,
      title: department.title,
      description: department.description,
      benefits: [...department.benefits],
      features: [...department.features],
      icon: serviceIcons[department.id as keyof typeof serviceIcons],
      color: serviceColors[index],
      media: [
        { type: 'image', src: department.image, alt: `${department.title} overview` },
        { type: 'image', src: department.image2, alt: `${department.title} operations` },
      ],
    }))
  ), [])

  // Auto-play functionality for multiple images
  useEffect(() => {
    const intervals: {[key: string]: NodeJS.Timeout} = {}
    
    services.forEach(service => {
      if (service.media.length > 1 && autoPlay[service.id]) {
        intervals[service.id] = setInterval(() => {
          setCurrentMediaIndex(prev => ({
            ...prev,
            [service.id]: ((prev[service.id] || 0) + 1) % service.media.length
          }))
        }, 3000)
      }
    })

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval))
    }
  }, [autoPlay, services])

  const nextMedia = (serviceId: string, total: number) => {
    setCurrentMediaIndex(prev => {
      const current = prev[serviceId] ?? 0
      const next = (current + 1) % total
      return { ...prev, [serviceId]: next }
    })
  }

  const prevMedia = (serviceId: string, total: number) => {
    setCurrentMediaIndex(prev => {
      const current = prev[serviceId] ?? 0
      const next = current === 0 ? total - 1 : current - 1
      return { ...prev, [serviceId]: next }
    })
  }

  const toggleAutoPlay = (serviceId: string) => {
    setAutoPlay(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }))
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Our <span className="text-[#C9A46A]">Core Ventures</span>
          </h2>
          <div className="text-lg text-gray-600 max-w-4xl mx-auto space-y-4">
            <p>
              {brand.name} brings together a diversified portfolio of ventures spanning distribution, paper products, hospitality, real estate, mining, agriculture, and export growth.
            </p>
            <p>
              Each venture is shaped by founder-led market understanding, practical execution, and a long-term approach to partnership and value creation.
            </p>
          </div>
        </motion.div>

        {/* Services List */}
        <div className="space-y-20">
          {services.map((service, index) => {
            const currentIdx = currentMediaIndex[service.id] || 0
            const currentMedia = service.media[currentIdx]

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}
              >
                {/* Content Side */}
                <div className={index % 2 === 0 ? '' : 'lg:col-start-2'}>
                  <div className="space-y-6">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 ${service.color} rounded-sm flex items-center justify-center`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* What We Provide - Main Focus */}
                    <div className="bg-gradient-to-r from-[#C9A46A]/5 to-[#C9A46A]/5 p-6 rounded-sm border border-[#C9A46A]/10">
                      <h4 className="text-xl font-bold text-[#C9A46A] mb-4 flex items-center gap-2">
                        <service.icon className="w-5 h-5" />
                        What We Provide:
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#C9A46A] rounded-sm flex-shrink-0" />
                            <span className="text-gray-800 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits:</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className={index % 2 === 0 ? '' : 'lg:col-start-1'}>
                  <div className="relative group">
                    {/* Main Image Container */}
                    <div className="relative aspect-video bg-gray-100 rounded-sm overflow-hidden shadow-2xl">
                      <AnimatePresence mode='wait'>
                        <motion.div
                          key={`image-${currentIdx}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={currentMedia.src}
                            alt={currentMedia.alt || service.title}
                            fill
                            className="object-cover"
                            unoptimized
                            onError={(e) => {
                              console.log('Failed to load image:', currentMedia.src)
                            }}
                          />
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Multiple Images Controls */}
                      {service.media.length > 1 && (
                        <>
                          {/* Navigation Arrows */}
                          <div className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={() => prevMedia(service.id, service.media.length)}
                              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-sm flex items-center justify-center transition-colors z-30"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => nextMedia(service.id, service.media.length)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-sm flex items-center justify-center transition-colors z-30"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Image Counter & Controls */}
                          <div className="absolute bottom-4 left-4 flex items-center gap-3 z-30">
                            <div className="bg-black/70 text-white text-sm px-3 py-1 rounded-sm">
                              {currentIdx + 1} / {service.media.length}
                            </div>
                            
                            <button
                              onClick={() => toggleAutoPlay(service.id)}
                              className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-sm flex items-center justify-center transition-colors"
                            >
                              {autoPlay[service.id] ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                            </button>
                          </div>

                          {/* Dot Indicators */}
                          <div className="absolute bottom-4 right-4 flex gap-1.5 z-30">
                            {service.media.map((_, imgIdx) => (
                              <button
                                key={imgIdx}
                                onClick={() => setCurrentMediaIndex(prev => ({ ...prev, [service.id]: imgIdx }))}
                                className={`rounded-sm transition-all ${
                                  currentIdx === imgIdx
                                    ? 'bg-white w-2 h-2 md:w-3 md:h-3'
                                    : 'bg-white/50 w-1.5 h-1.5 md:w-2 md:h-2'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Media Description */}
                    <div className="mt-4 text-center min-h-[24px]">
                      <p className="text-sm text-gray-500">
                        {currentMedia.alt}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-white rounded-sm p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Work With {brand.shortName}
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us to discuss venture opportunities, partnerships, and growth collaboration across the group.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-3 bg-[#C9A46A] text-white rounded-sm font-semibold hover:bg-[#C9A46A] transition-colors"
                onClick={() => window.open(brand.phoneHref)}
              >
                Call: {brand.phone}
              </button>
              <button 
                className="px-8 py-3 border border-[#C9A46A] text-[#C9A46A] rounded-sm font-semibold hover:bg-[#C9A46A]/10 transition-colors"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Request Information
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
