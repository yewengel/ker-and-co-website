'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, HeartHandshake, Users, MapPin, ShieldCheck } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { brand, brandMedia } from '@/lib/brand'

export default function CSRPage() {
  const heroImage = brandMedia.ventures.agriculture

  const highlights = [
    {
      title: 'Community Engagement',
      description:
        'We prioritize respectful collaboration with communities connected to our ventures and growth activities.',
      icon: Users,
    },
    {
      title: 'Access & Local Development',
      description:
        'Practical investment and local engagement can support mobility, safety, livelihoods, and business participation.',
      icon: MapPin,
    },
    {
      title: 'Responsible Operations',
      description:
        'We aim to integrate safety, stewardship, and disciplined execution into planning, operations, and expansion.',
      icon: ShieldCheck,
    },
  ]

  return (
    <main className="relative min-h-screen bg-gray-50">
      <Navigation />

      <section className="pt-navbar pb-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[7px] bg-medical-blue/10 text-medical-red text-sm font-semibold">
              <HeartHandshake className="w-4 h-4" />
              CSR & Community Impact
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-4 mb-5 font-heading">
              Community <span className="text-gradient">Impact</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {brand.name} is committed to building ventures that create opportunity, strengthen communities, and support sustainable local development.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="medical" onClick={() => (window.location.href = '/gallery/')}
              >
                View CSR media
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = '/#contact')}
              >
                Contact us
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-[8px] shadow-xl bg-gray-200"
          >
            <div className="relative aspect-[16/11]">
              <img
                src={encodeURI(heroImage)}
                alt="CSR"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((h, idx) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-[8px] bg-white border border-gray-100 shadow-sm p-7"
              >
                <div className="inline-flex w-12 h-12 rounded-[8px] bg-medical-blue/10 items-center justify-center">
                  <h.icon className="w-6 h-6 text-medical-blue" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">{h.title}</h2>
                <p className="text-gray-600 mt-2 leading-relaxed">{h.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-[8px] bg-medical-blue/5 border border-medical-blue/20 p-8 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Approach</h2>
            <p className="text-gray-600 mt-3 leading-relaxed max-w-4xl">
              At {brand.shortName}, we believe business growth should create meaningful value beyond commercial results. We seek to grow in ways that strengthen livelihoods, support responsible operations, and contribute to sustainable local development.
            </p>
          </motion.div>

          <div className="mt-12 rounded-[8px] bg-gradient-to-r from-medical-blue to-medical-red text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[7px] bg-white/10 text-white text-sm font-semibold">
                <HeartHandshake className="w-4 h-4" />
                Learn More
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mt-4">Explore Our Impact</h3>
              <p className="text-white/80 mt-2 leading-relaxed max-w-2xl">
                Browse our gallery, learn about our ventures, and see how {brand.shortName} is building impact through growth and stewardship.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = '/gallery')}
              className="bg-white text-medical-red border-white hover:bg-gray-100"
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
