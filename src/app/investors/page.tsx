'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, FileText, ShieldCheck, Users, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { brand, investorHighlights } from '@/lib/brand'

export default function InvestorsPage() {
  const highlights = investorHighlights.map((item, index) => ({
    ...item,
    icon: [BarChart3, ShieldCheck, Users][index],
  }))

  const downloads = [
    {
      title: 'Investor Overview (Sample)',
      description: 'High-level snapshot of strategy, operations, and focus areas.',
      tag: 'PDF',
    },
    {
      title: 'Company Profile (Sample)',
      description: 'Summary of the business model and key capabilities.',
      tag: 'PDF',
    },
    {
      title: 'Governance Snapshot (Sample)',
      description: 'High-level overview of governance and leadership.',
      tag: 'PDF',
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
              Investor <span className="text-gradient">Relations</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              A dedicated resource for stakeholders seeking a clear view of strategy, stewardship, and long-term value creation across {brand.name}.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-[8px] border border-gray-100 shadow-sm p-8"
            >
              <div className="inline-flex w-12 h-12 rounded-[8px] bg-medical-blue/10 items-center justify-center">
                <item.icon className="w-6 h-6 text-medical-blue" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-4">{item.title}</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-10 bg-white rounded-[8px] border border-gray-100 shadow-lg p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Downloads</h2>
              <p className="text-gray-600 mt-2">
                Sample materials are provided as placeholders and can be replaced with official investor documents when ready.
              </p>
            </div>
            <Button className="group" onClick={() => (window.location.href = '/#contact')}
            >
              Investor Contact
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-8">
            {downloads.map((d) => (
              <div key={d.title} className="rounded-[8px] bg-gray-50 border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900">{d.title}</div>
                  <div className="text-xs font-semibold px-2 py-1 rounded-[7px] bg-white border border-gray-200 text-gray-600">
                    {d.tag}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-2 leading-relaxed">{d.description}</div>
                <div className="mt-5">
                  <Button variant="outline" size="sm" onClick={() => window.alert('Sample download placeholder. Replace with real PDF when available.')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
