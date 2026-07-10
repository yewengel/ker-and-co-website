'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Gem, Mountain } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

type ProjectCard = {
  title: string
  subtitle: string
  description: string
  href: string
  image: string
  icon: React.ElementType
}

export default function ProjectsPage() {
  const projects: ProjectCard[] = [
    {
      title: 'Okote Gold Exploration Project',
      subtitle: 'Exploration Program',
      description:
        'Systematic field exploration focused on trenching, sampling, and access development to support disciplined evaluation.',
      href: '/projects/okote/',
      image:
        '/Photoes and Videoes for Documentary/OKOTE Photoe and Video for Documenetary/PHOTOES/EXPLORATION_FIELD/Sunrise at Hallo from OKOTE_Ebicha.jpeg',
      icon: Gem,
    },
    {
      title: 'Aleltu Quarry & Aggregate Production',
      subtitle: 'Quarry & Crushing',
      description:
        'End-to-end quarry development and aggregate production—from drilling and blasting to crushing, stockpiling, and dispatch.',
      href: '/projects/aleltu/',
      image:
        '/Photoes and Videoes for Documentary/ALELTU Photes and Videoes for Documentary/PHOTOES/Crushed aggregate products.jpeg',
      icon: Mountain,
    },
  ]

  return (
    <main className="relative min-h-screen bg-gray-50">
      <Navigation />

      <section className="pt-navbar pb-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5 font-heading">
              Our <span className="text-teal-600">Projects</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Explore our flagship projects and the work we deliver across exploration, quarry development, and responsible operations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-[8px] overflow-hidden bg-white shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                <img
                  src={encodeURI(p.image)}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[7px] bg-white/15 text-white text-sm font-semibold backdrop-blur">
                    <p.icon className="w-4 h-4 text-teal-600" />
                    {p.subtitle}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mt-3">{p.title}</h2>
                </div>
              </div>

              <div className="p-7">
                <p className="text-gray-600 leading-relaxed">{p.description}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button variant="medical" onClick={() => (window.location.href = p.href)}>
                    View details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" onClick={() => (window.location.href = '/gallery/')}
                  >
                    View gallery
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
