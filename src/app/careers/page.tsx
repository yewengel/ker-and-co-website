'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Users, GraduationCap, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { brand } from '@/lib/brand'

export default function CareersPage() {
  const values = [
    {
      title: 'Performance & Ownership',
      description: 'A culture focused on disciplined execution, accountability, and long-term value creation.',
      icon: Briefcase,
    },
    {
      title: 'Teamwork',
      description: 'We value collaboration across ventures, operating teams, and strategic partner relationships.',
      icon: Users,
    },
    {
      title: 'Learning & Growth',
      description: 'We support skills development through practical execution, new venture building, and market exposure.',
      icon: GraduationCap,
    },
  ]

  const openings = [
    { title: 'Business Development Manager – Export Ventures', location: 'Addis Ababa', type: 'Full-time' },
    { title: 'Hospitality Operations Supervisor', location: 'Addis Ababa', type: 'Full-time' },
    { title: 'Supply Chain & Distribution Coordinator', location: 'Ethiopia', type: 'Full-time' },
    { title: 'Real Estate Project Support Officer', location: 'Addis Ababa', type: 'Full-time' },
    { title: 'Agribusiness Sourcing Associate', location: 'Arba Minch / Addis Ababa', type: 'Full-time' },
    { title: 'Finance & Administration Officer', location: 'Addis Ababa', type: 'Full-time' },
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
            <h1 className="text-2xl md:text-6xl font-bold text-black mb-3 md:mb-5 font-heading">
              Careers at {brand.shortName}
            </h1>
            <p className="text-xs md:text-xl text-gray-600 max-w-4xl mx-auto">
              Join a founder-led business group building ventures across distribution, hospitality, real estate, industrial operations, agriculture, and export.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-10 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2 md:gap-6">
          {values.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-sm md:rounded-sm border border-gray-100 shadow-sm p-3 md:p-8"
            >
              <div className="inline-flex w-8 h-8 md:w-12 md:h-12 rounded-sm md:rounded-sm bg-[#C9A46A]/10 items-center justify-center">
                <item.icon className="w-4 h-4 md:w-6 md:h-6 text-[#C9A46A]" />
              </div>
              <h2 className="text-[11px] md:text-xl font-bold text-gray-900 mt-2 md:mt-4">{item.title}</h2>
              <p className="text-[9px] md:text-base text-gray-600 mt-1 md:mt-2 leading-snug md:leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-4 md:mt-10 bg-white rounded-sm md:rounded-sm border border-gray-100 shadow-lg p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
            <div>
              <h2 className="text-base md:text-2xl font-bold text-gray-900">Open Roles</h2>
              <p className="text-[10px] md:text-base text-gray-600 mt-1 md:mt-2">
                These sample openings reflect the kinds of roles that support growth across the Ker & Co. portfolio.
              </p>
            </div>
            <Button className="group" onClick={() => (window.location.href = '/#contact')}
            >
              Apply / Send CV
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="mt-4 md:mt-8 grid grid-cols-2 gap-2 md:gap-5">
            {openings.map((job) => (
              <div key={job.title} className="rounded-sm md:rounded-sm bg-gray-50 border border-gray-100 p-3 md:p-6">
                <div className="text-[10px] md:text-base font-semibold text-gray-900">{job.title}</div>
                <div className="text-[9px] md:text-sm text-gray-600 mt-1 md:mt-2">{job.location} · {job.type}</div>
                <div className="mt-5">
                  <Button variant="outline" size="sm" onClick={() => (window.location.href = '/#contact')}
                  >
                    Apply
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
