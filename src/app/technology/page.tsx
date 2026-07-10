'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, Shield, BarChart3, Workflow, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function TechnologyPage() {
  const items = [
    {
      title: 'Operational Visibility',
      description: 'Improving transparency through structured reporting, production tracking, and performance monitoring.',
      icon: BarChart3,
    },
    {
      title: 'Process Discipline',
      description: 'Using repeatable procedures and checklists to strengthen quality, safety, and delivery performance.',
      icon: Workflow,
    },
    {
      title: 'Cybersecurity Awareness',
      description: 'A security-first mindset and governance practices designed to protect systems and information.',
      icon: Shield,
    },
    {
      title: 'Innovation Roadmap',
      description: 'A continuous improvement approach that supports growth, efficiency, and operational excellence.',
      icon: Cpu,
    },
  ]

  return (
    <main className="relative min-h-screen bg-gray-50">
      <Navigation />

      <section className="pt-navbar pb-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5 font-heading">
              Technology & <span className="text-teal-600">Innovation</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              We use disciplined systems and continuous improvement to strengthen operational performance, safety, and decision-making.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-sm border border-gray-100 shadow-sm p-8"
            >
              <div className="inline-flex w-12 h-12 rounded-sm bg-teal-600/10 items-center justify-center">
                <item.icon className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-4">{item.title}</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-10 bg-white rounded-sm border border-gray-100 shadow-lg p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Want to collaborate?</h2>
              <p className="text-gray-600 mt-2">
                Contact us to discuss operational technology, partnerships, or performance improvement opportunities.
              </p>
            </div>
            <Button className="group" onClick={() => (window.location.href = '/#contact')}
            >
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
