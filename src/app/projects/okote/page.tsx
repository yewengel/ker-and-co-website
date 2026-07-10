'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Gem, MapPin, ShieldCheck, Users } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function OkoteProjectPage() {
  const heroImage =
    '/Photoes and Videoes for Documentary/OKOTE Photoe and Video for Documenetary/PHOTOES/EXPLORATION_FIELD/Sunrise at Hallo from OKOTE_Ebicha.jpeg'

  const sections = [
    {
      title: 'Project Overview',
      icon: Gem,
      description:
        'Okote is an active exploration program designed to generate high-quality geological data through field mapping, trench excavation, sampling, and structured documentation. The project emphasizes safe field operations, transparent methodology, and responsible engagement with local communities.',
      image:
        '/Photoes and Videoes for Documentary/OKOTE Photoe and Video for Documenetary/PHOTOES/EXPLORATION_FIELD/Team of geologists_Trench channel 0bservation-description-.jpeg',
    },
    {
      title: 'Access & Site Establishment',
      icon: MapPin,
      description:
        'Access development supports safe logistics, efficient field movement, and reliable project execution.',
      image:
        '/Photoes and Videoes for Documentary/OKOTE Photoe and Video for Documenetary/PHOTOES/EXPLORATION_FIELD/Access road road construction from to the OKOTE concession area.jpeg',
    },
    {
      title: 'Exploration Activities',
      icon: ShieldCheck,
      description:
        'Fieldwork includes trench excavation, channel observation, geological description, and sample collection prepared for analysis.',
      image:
        '/Photoes and Videoes for Documentary/OKOTE Photoe and Video for Documenetary/PHOTOES/EXPLORATION_FIELD/Trench excavation by excavetor.jpeg',
    },
    {
      title: 'Community Engagement',
      icon: Users,
      description:
        'We prioritize respectful engagement with communities in and around the project area, promoting positive local relationships and shared benefits where possible.',
      image:
        '/Photoes and Videoes for Documentary/OKOTE Photoe and Video for Documenetary/PHOTOES/EXPLORATION_FIELD/Local youngsters hand picking gold from pyrite.jpeg',
    },
  ]

  const highlights = [
    {
      title: 'Trenching & Observation',
      icon: ShieldCheck,
      description: 'Structured trench excavation, observation, and documentation to support interpretation.',
    },
    {
      title: 'Sampling & Preparation',
      icon: Gem,
      description: 'Samples prepared for shipment and analysis to generate reliable datasets.',
    },
    {
      title: 'Access Development',
      icon: MapPin,
      description: 'Improved access enables safe and efficient logistics and field operations.',
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#C9A46A]/10 text-[#C9A46A] text-sm font-semibold">
                <Gem className="w-4 h-4" />
                Exploration Program
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-4 mb-5 font-heading">
                Okote <span className="text-[#C9A46A]">Gold Exploration</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Systematic field exploration focused on trenching, sampling, and access development to support disciplined evaluation.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button onClick={() => (window.location.href = '/gallery/')}
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
              className="relative overflow-hidden rounded-sm shadow-xl bg-gray-200"
            >
              <div className="relative aspect-[16/11]">
                <img
                  src={encodeURI(heroImage)}
                  alt="Okote project"
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
                className="rounded-sm bg-white border border-gray-100 shadow-sm p-7"
              >
                <div className="inline-flex w-12 h-12 rounded-sm bg-[#C9A46A]/10 items-center justify-center">
                  <h.icon className="w-6 h-6 text-[#C9A46A]" />
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
                className="grid lg:grid-cols-2 gap-8 items-center rounded-sm bg-white border border-gray-100 shadow-lg p-7 md:p-10"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-gray-50 border border-gray-100 text-gray-700 text-sm font-semibold">
                    <s.icon className="w-4 h-4 text-[#C9A46A]" />
                    Section
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">{s.title}</h3>
                  <p className="text-gray-600 mt-3 leading-relaxed">{s.description}</p>
                </div>

                <div className="relative overflow-hidden rounded-sm bg-gray-200 shadow">
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

          <div className="mt-12 rounded-sm bg-gradient-to-r from-[#C9A46A] to-[#C9A46A] text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/10 text-white text-sm font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Media
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mt-4">Explore Okote field photos and videos</h3>
              <p className="text-white/80 mt-2 leading-relaxed max-w-2xl">
                View access development, trench excavation, sampling activities, and field highlights.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = '/gallery/')}
              className="bg-white text-[#C9A46A] border-white hover:bg-gray-100"
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
