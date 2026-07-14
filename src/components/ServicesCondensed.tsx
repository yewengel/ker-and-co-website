'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Stethoscope,
  Coffee,
  Truck,
  Scissors,
  Factory,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react'
import { brand, departments } from '@/lib/brand'

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

const ServicesCondensed = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState<{[key: string]: number}>({})
  const [autoPlay, setAutoPlay] = useState<{[key: string]: boolean}>({})

  const featuredIds = ['distribution', 'paper', 'hospitality', 'real-estate', 'coal-mining']
  const featuredDepartments = featuredIds
    .map((id) => departments.find((d) => d.id === id))
    .filter((d): d is (typeof departments)[number] => Boolean(d))

  const keyServices: Service[] = featuredDepartments.map((department, index) => ({
    id: department.id,
    title: department.title,
    description: department.description,
    benefits: [...department.benefits],
    features: [...department.features],
    icon: [Stethoscope, Coffee, Truck, Scissors, Factory][index],
    color: ['bg-[#C9A46A]', 'bg-[#C9A46A]', 'bg-[#C9A46A]', 'bg-[#C9A46A]', 'bg-[#C9A46A]'][index],
    media: ([
      { type: 'image' as const, src: department.image, alt: `${department.title} primary view` },
      { type: 'image' as const, src: department.image2, alt: `${department.title} operations` },
      ...(((department as { gallery?: readonly string[] }).gallery ?? []).map((src, i) => ({
        type: 'image' as const,
        src,
        alt: `${department.title} gallery ${i + 1}`,
      }))),
    ]).filter((item, idx, arr) => arr.findIndex((m) => m.src === item.src) === idx)
  }))

  useEffect(() => {
    const intervals: {[key: string]: NodeJS.Timeout} = {}
    
    keyServices.forEach(service => {
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
  }, [autoPlay, keyServices])

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
    <section id="services" className="py-10 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold font-heading mb-3 md:mb-6 text-black">
            Our <span className="text-black">Departments</span>
          </h2>
          <div className="text-xs md:text-lg text-gray-600 max-w-4xl mx-auto space-y-4">
            <p>
              {brand.name} is built on a diversified operating model. These featured departments reflect the entrepreneurial journey that grew from everyday trade into multiple ventures with long-term value.
            </p>
          </div>
        </motion.div>

        {/* Mobile Compact Grid */}
        <div className="grid grid-cols-2 gap-2.5 md:hidden">
          {keyServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (idx % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-sm shadow-md overflow-hidden border border-gray-100"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={service.media[0].src}
                  alt={service.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-1.5 left-1.5">
                  <div className={`w-6 h-6 ${service.color} rounded-sm flex items-center justify-center`}>
                    <service.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-2.5">
                <h3 className="text-[11px] font-bold text-gray-900 leading-tight mb-1">{service.title}</h3>
                <p className="text-[9px] text-gray-600 leading-snug line-clamp-3">{service.description}</p>
                <div className="mt-1.5 space-y-0.5">
                  {service.features.slice(0, 2).map((f, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-[#C9A46A] rounded-sm flex-shrink-0" />
                      <span className="text-[8px] text-gray-700 truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Key Services List */}
        <div className="hidden md:block space-y-8 md:space-y-12 lg:space-y-16 xl:space-y-20">
          {keyServices.map((service, index) => {
            const currentIdx = currentMediaIndex[service.id] || 0
            const currentMedia = service.media[currentIdx]

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.88, y: 70 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-12 items-start ${
                  index % 2 === 0 ? '' : 'md:grid-flow-col-dense'
                }`}
              >
                {/* Image Side */}
                <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1 md:col-start-1'}`}>
                  <div className="relative group">
                    <div className="relative aspect-video bg-gray-100 rounded-sm md:rounded-sm lg:rounded-sm overflow-hidden shadow-lg md:shadow-xl lg:shadow-2xl">
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
                          />
                        </motion.div>
                      </AnimatePresence>
                      
                      {service.media.length > 1 && (
                        <>
                          <div className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={() => prevMedia(service.id, service.media.length)}
                              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/50 hover:bg-black/70 text-white rounded-sm flex items-center justify-center transition-colors z-30"
                            >
                              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                            <button
                              onClick={() => nextMedia(service.id, service.media.length)}
                              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/50 hover:bg-black/70 text-white rounded-sm flex items-center justify-center transition-colors z-30"
                            >
                              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                          </div>

                          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex items-center gap-2 md:gap-3 z-30">
                            <div className="bg-black/70 text-white text-xs md:text-sm px-2 py-0.5 md:px-3 md:py-1 rounded-sm">
                              {currentIdx + 1} / {service.media.length}
                            </div>
                            
                            <button
                              onClick={() => toggleAutoPlay(service.id)}
                              className="w-6 h-6 md:w-8 md:h-8 bg-black/50 hover:bg-black/70 text-white rounded-sm flex items-center justify-center transition-colors"
                            >
                              {autoPlay[service.id] ? <Pause className="w-3 h-3 md:w-4 md:h-4" /> : <Play className="w-3 h-3 md:w-4 md:h-4 ml-0.5" />}
                            </button>
                          </div>

                          <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 flex gap-1.5 md:gap-2 z-30">
                            {service.media.map((_, imgIdx) => (
                              <button
                                key={imgIdx}
                                onClick={() => setCurrentMediaIndex(prev => ({ ...prev, [service.id]: imgIdx }))}
                                className={`rounded-sm transition-all ${
                                  currentIdx === imgIdx
                                    ? 'bg-white w-2 h-2 md:w-3 md:h-3'
                                    : 'bg-white/50 w-1 h-1 md:w-2 md:h-2'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-2 md:mt-3 lg:mt-4 text-center hidden md:block min-h-[24px]">
                      <p className="text-xs md:text-sm text-gray-500">
                        {currentMedia.alt}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2 md:col-start-2'}`}>
                  <div className="space-y-3 md:space-y-4 lg:space-y-6">
                    <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 ${service.color} rounded-sm md:rounded-sm lg:rounded-sm flex items-center justify-center flex-shrink-0`}>
                        <service.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-white" />
                      </div>
                      <h3 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="bg-white p-3 md:p-4 lg:p-5 xl:p-6 rounded-sm md:rounded-sm border border-gray-100 shadow-sm">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold text-[#C9A46A] mb-2 md:mb-3 lg:mb-4 flex items-center gap-2">
                            <service.icon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                            What We Provide:
                          </h4>
                          <div className="grid grid-cols-1 gap-1.5 md:gap-2 lg:gap-3">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 bg-[#C9A46A] rounded-sm flex-shrink-0" />
                                <span className="text-[10px] md:text-xs lg:text-sm xl:text-base text-gray-800 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4 flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#C9A46A]" />
                            Key Benefits:
                          </h4>
                          <div className="grid grid-cols-1 gap-1.5 md:gap-2 lg:gap-3">
                            {service.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 bg-[#C9A46A] rounded-sm flex-shrink-0" />
                                <span className="text-[10px] md:text-xs lg:text-sm xl:text-base text-gray-700">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
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
          className="text-center mt-8 md:mt-20"
        >
          <div className="bg-white border border-gray-100 rounded-sm md:rounded-sm p-4 md:p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-base md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">
              Partner With {brand.name}
            </h3>
            <p className="text-xs md:text-base text-gray-600 mb-3 md:mb-6">
              Whether you are exploring distribution, hospitality, agriculture, industrial ventures, or export growth, we are ready to discuss meaningful collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-3 bg-[#C9A46A] text-white rounded-sm font-semibold hover:bg-[#b08e56] transition-all duration-300 shadow-sm"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </button>
              <button 
                className="px-8 py-3 bg-[#C9A46A] text-white rounded-sm font-semibold hover:bg-[#b08e56] transition-all duration-300 shadow-sm"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesCondensed
