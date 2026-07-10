'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, FileSearch, AlertTriangle, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function CompliancePage() {
  const areas = [
    {
      title: 'Ethics & Integrity',
      description:
        'We seek to operate with transparency and accountability and expect ethical behavior across our engagements.',
      icon: ShieldCheck,
    },
    {
      title: 'Regulatory Compliance',
      description:
        'We aim to follow applicable laws and regulations relevant to our operations, partnerships, and services.',
      icon: FileSearch,
    },
    {
      title: 'Risk Awareness',
      description:
        'We prioritize risk awareness, disciplined execution, and responsible decision-making across operations.',
      icon: AlertTriangle,
    },
  ]

  return (
    <main className="relative min-h-screen bg-gray-50">
      <Navigation />

      <section className="pt-navbar pb-8 md:pb-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-5 font-heading">
              Compliance
            </h1>
            <p className="text-xs md:text-xl text-gray-600 max-w-4xl mx-auto">
              Our compliance focus supports safe operations, ethical conduct, and trusted partnerships.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-10 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2 md:gap-6">
          {areas.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-sm md:rounded-sm border border-gray-100 shadow-sm p-3 md:p-8"
            >
              <div className="inline-flex w-8 h-8 md:w-12 md:h-12 rounded-sm md:rounded-sm bg-teal-600/10 items-center justify-center">
                <item.icon className="w-4 h-4 md:w-6 md:h-6 text-teal-600" />
              </div>
              <h2 className="text-[11px] md:text-xl font-bold text-gray-900 mt-2 md:mt-4">{item.title}</h2>
              <p className="text-[9px] md:text-base text-gray-600 mt-1 md:mt-2 leading-snug md:leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-4 md:mt-10 bg-white rounded-sm md:rounded-sm border border-gray-100 shadow-lg p-4 md:p-8">
          <h2 className="text-base md:text-2xl font-bold text-gray-900">Reporting & Inquiries</h2>
          <p className="text-[10px] md:text-base text-gray-600 mt-1 md:mt-2">
            For compliance-related questions or reporting, please contact our team.
          </p>
          <div className="mt-6">
            <Button className="group" onClick={() => (window.location.href = '/#contact')}
            >
              Contact Compliance
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
