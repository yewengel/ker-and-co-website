'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function TermsPage() {
  const terms = [
    'This website is provided for informational purposes only.',
    'Content may be updated at any time without notice.',
    'You agree not to misuse the website or attempt unauthorized access.',
    'Any inquiries submitted should be accurate and lawful.',
  ]

  return (
    <main className="relative min-h-screen bg-gray-50">
      <Navigation />

      <section className="pt-navbar pb-8 md:pb-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex w-10 h-10 md:w-14 md:h-14 rounded-[7px] md:rounded-[8px] bg-teal-600/10 items-center justify-center mx-auto mb-3 md:mb-5">
              <FileText className="w-5 h-5 md:w-7 md:h-7 text-teal-600" />
            </div>
            <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4 font-heading">Terms of Use</h1>
            <p className="text-xs md:text-base text-gray-600">General terms for using this website.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-10 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-[7px] md:rounded-[8px] border border-gray-100 shadow-lg p-4 md:p-8">
          <ul className="space-y-2 md:space-y-3 text-[10px] md:text-base text-gray-700">
            {terms.map((t) => (
              <li key={t} className="leading-relaxed">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  )
}
