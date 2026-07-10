'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, FileText } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      items: [
        'Contact details you submit (name, phone, email).',
        'Inquiry details you provide (area of interest, message).',
        'Basic technical data required to operate the site (e.g., browser and device information).',
      ],
    },
    {
      title: 'How We Use Information',
      items: [
        'To respond to inquiries and provide requested information.',
        'To improve our services and website experience.',
        'To maintain security and prevent misuse.',
      ],
    },
    {
      title: 'Data Storage & Sharing',
      items: [
        'Inquiry submissions are stored in our systems to support follow-up and service delivery.',
        'We do not sell personal information.',
        'We may share information only when required for service delivery or legal compliance.',
      ],
    },
    {
      title: 'Your Choices',
      items: [
        'You may request access, correction, or deletion of your submitted information.',
        'You may contact us for privacy-related questions at any time.',
      ],
    },
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
            <div className="inline-flex w-10 h-10 md:w-14 md:h-14 rounded-sm md:rounded-sm bg-teal-600/10 items-center justify-center mx-auto mb-3 md:mb-5">
              <Shield className="w-5 h-5 md:w-7 md:h-7 text-teal-600" />
            </div>
            <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4 font-heading">Privacy Policy</h1>
            <p className="text-xs md:text-base text-gray-600">
              This page explains how we handle information collected through this website.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-10 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-sm md:rounded-sm border border-gray-100 shadow-lg p-4 md:p-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <FileText className="w-4 h-4" />
            Last updated: 2025
          </div>

          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-sm md:text-xl font-bold text-gray-900">{s.title}</h2>
                <ul className="mt-1.5 md:mt-3 space-y-1 md:space-y-2 text-[10px] md:text-base text-gray-700">
                  {s.items.map((i) => (
                    <li key={i} className="leading-relaxed">{i}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="text-sm md:text-xl font-bold text-gray-900">Contact</h2>
              <p className="text-[10px] md:text-base text-gray-700 mt-1.5 md:mt-3 leading-relaxed">
                To request privacy-related support, please contact us using the contact form on the website.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
