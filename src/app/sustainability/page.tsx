'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Leaf, Users, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function SustainabilityPage() {
  const pillars = [
    {
      title: 'Environmental Stewardship',
      description:
        'We work to manage environmental impacts responsibly by improving operational discipline, resource efficiency, and site stewardship.',
      icon: Leaf,
    },
    {
      title: 'People & Communities',
      description:
        'We aim to create shared value through safety, local engagement, training, and meaningful community support programs.',
      icon: Users,
    },
    {
      title: 'Governance & Ethics',
      description:
        'We prioritize integrity, transparency, and compliance to support long-term trust with stakeholders and partners.',
      icon: ShieldCheck,
    },
  ]

  const contributions = [
    {
      title: 'Community Support',
      description:
        'Supporting local communities through targeted programs aligned with local needs and long-term impact.',
    },
    {
      title: 'Safety & Training',
      description:
        'Strengthening safety culture, training, and operational readiness across teams and partner engagements.',
    },
    {
      title: 'Local Employment & Skills',
      description:
        'Building capability through local hiring and skills development where operations and projects take place.',
    },
    {
      title: 'Responsible Operations',
      description:
        'Applying disciplined procedures to reduce risks and improve performance, quality, and sustainability.',
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
              Sustainability <span className="text-teal-600">(ESG)</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Our ESG approach focuses on responsible operations, long-term value creation, and meaningful contributions to
              people and communities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[8px] shadow-xl bg-white"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/contributions/social_conterubition_main.jpg"
                alt="Community contributions"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[7px] bg-teal-600/10 text-teal-600 text-sm font-semibold">
                <HeartHandshake className="w-4 h-4" />
                Contributions
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mt-4">A responsible approach to growth</h2>
              <p className="text-gray-600 mt-3 leading-relaxed">
                We aim to strengthen stakeholder trust by integrating responsible practices into planning, operations, and
                partnerships.
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = '/#contact')}
                  className="group"
                >
                  Discuss ESG & Partnerships
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <div className="grid sm:grid-cols-3 gap-4">
              {pillars.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white rounded-[8px] border border-gray-100 shadow-sm p-6"
                >
                  <div className="inline-flex w-12 h-12 rounded-[8px] bg-teal-600/10 items-center justify-center">
                    <item.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mt-4">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[8px] border border-gray-100 shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Our contributions</h2>
              <p className="text-gray-600 mb-6">
                A snapshot of the areas we support as part of our ESG commitments.
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {contributions.map((c) => (
                  <div key={c.title} className="rounded-[8px] bg-gray-50 border border-gray-100 p-5">
                    <div className="font-semibold text-gray-900">{c.title}</div>
                    <div className="text-sm text-gray-600 mt-2 leading-relaxed">{c.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
