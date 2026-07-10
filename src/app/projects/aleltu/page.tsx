'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mountain, Factory, Truck, ShieldCheck } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function AleltuProjectPage() {
  const heroImage =
    '/Photoes and Videoes for Documentary/ALELTU Photes and Videoes for Documentary/PHOTOES/Crushed aggregate products.jpeg'

  const sections = [
    {
      title: 'Project Overview',
      icon: Mountain,
      description:
        'Aleltu is a quarry and crushing operation focused on producing consistent aggregate products to support construction and infrastructure demand. The project demonstrates strong operational capability across extraction, processing, and logistics.',
      image:
        '/Photoes and Videoes for Documentary/ALELTU Photes and Videoes for Documentary/PHOTOES/Dam trucks que for loading the crushed aggregate_Feb 21-2025.jpeg',
    },
    {
      title: 'Drilling & Blasting',
      icon: ShieldCheck,
      description:
        'Controlled drilling and blasting operations are executed to prepare rock for downstream processing while maintaining operational safety and efficiency.',
      image:
        '/Photoes and Videoes for Documentary/ALELTU Photes and Videoes for Documentary/PHOTOES/Drilling for explosives_June 19-2024.jpeg',
    },
    {
      title: 'Crushing & Production',
      icon: Factory,
      description:
        'Crushing and screening operations generate graded aggregate products, supported by disciplined workflow and equipment utilization.',
      image:
        '/Photoes and Videoes for Documentary/ALELTU Photes and Videoes for Documentary/PHOTOES/00mm crush aggregae product. FINO.jpeg',
    },
    {
      title: 'Logistics & Dispatch',
      icon: Truck,
      description:
        'Stockpiling and loading support reliable supply readiness for time-sensitive construction and infrastructure projects.',
      image:
        '/Photoes and Videoes for Documentary/ALELTU Photes and Videoes for Documentary/PHOTOES/Dam trucks que for loading the crushed aggregate_Feb 21-2025.jpeg',
    },
  ]

  const highlights = [
    {
      title: 'End-to-End Workflow',
      icon: Factory,
      description: 'From extraction and blasting to crushing, stockpiling, and dispatch.',
    },
    {
      title: 'Production Readiness',
      icon: Truck,
      description: 'Operational capability supported by equipment and disciplined execution.',
    },
    {
      title: 'Infrastructure Works',
      icon: Mountain,
      description: 'Site improvements and structural works that support reliability and performance.',
    },
  ]

  return (
    <main className="relative min-h-screen bg-gray-50">
      <Navigation />

      <section className="pt-navbar pb-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[7px] bg-teal-600/10 text-teal-600 text-sm font-semibold">
                <Mountain className="w-4 h-4" />
                Quarry & Crushing
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-4 mb-5 font-heading">
                Aleltu <span className="text-teal-600">Quarry & Aggregate Production</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                End-to-end quarry development and aggregate production—from drilling and blasting to crushing, stockpiling, and dispatch.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button variant="medical" onClick={() => (window.location.href = '/gallery/')}
                >
                  View media
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = '/projects/')}
                >
                  Projects overview
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
                  alt="Aleltu project"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
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
                <div className="inline-flex w-12 h-12 rounded-[8px] bg-teal-600/10 items-center justify-center">
                  <h.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">{h.title}</h2>
                <p className="text-gray-600 mt-2 leading-relaxed">{h.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 space-y-8">
            {sections.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="grid lg:grid-cols-2 gap-8 items-center rounded-[8px] bg-white border border-gray-100 shadow-lg p-7 md:p-10"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[7px] bg-gray-50 border border-gray-100 text-gray-700 text-sm font-semibold">
                    <s.icon className="w-4 h-4 text-teal-600" />
                    Section
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">{s.title}</h3>
                  <p className="text-gray-600 mt-3 leading-relaxed">{s.description}</p>
                </div>

                <div className="relative overflow-hidden rounded-[8px] bg-gray-200 shadow">
                  <div className="relative aspect-[16/10]">
                    <img
                      src={encodeURI(s.image)}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 rounded-[8px] bg-gray-900 text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[7px] bg-white/10 text-white text-sm font-semibold">
                <Factory className="w-4 h-4" />
                Media
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mt-4">Explore Aleltu production photos and videos</h3>
              <p className="text-white/80 mt-2 leading-relaxed max-w-2xl">
                View drilling, blasting, production, stockpiles, loading, and site milestones.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = '/gallery/')}
              className="bg-white text-gray-900 border-white hover:bg-gray-100"
            >
              Open gallery
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
