'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function DisclaimerPage() {
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
            <div className="inline-flex w-10 h-10 md:w-14 md:h-14 rounded-sm md:rounded-sm bg-teal-600/10 items-center justify-center mx-auto mb-3 md:mb-5">
              <AlertTriangle className="w-5 h-5 md:w-7 md:h-7 text-teal-600" />
            </div>
            <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4 font-heading">Disclaimer</h1>
            <p className="text-xs md:text-base text-gray-600">Important information about the use of website content.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-10 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-sm md:rounded-sm border border-gray-100 shadow-lg p-4 md:p-8 space-y-2 md:space-y-4 text-[10px] md:text-base text-gray-700">
          <p className="leading-relaxed">
            The information on this website is provided for general informational purposes only and does not constitute legal,
            financial, or investment advice.
          </p>
          <p className="leading-relaxed">
            While we strive to keep information up to date, we make no warranties about completeness, accuracy, or suitability.
          </p>
          <p className="leading-relaxed">
            Any reliance you place on information from this website is strictly at your own risk.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
