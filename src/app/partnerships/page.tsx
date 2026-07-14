'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Shield, Globe, TrendingUp, Building2, MapPin,
  Users, ArrowRight, Star, Gem, Heart
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { brand, partnershipReasons, departments, brandMedia } from '@/lib/brand'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const partnerCompanies = [
  {
    name: 'MAMCO Distribution',
    image: brandMedia.ventures.paper,
    description: 'A long-standing distribution platform serving Ethiopian households and retailers.',
  },
  {
    name: 'Ker Fitness',
    image: brandMedia.ventures.fitness,
    description: 'Wellness and lifestyle expansion through premium fitness and spa operations.',
  },
  {
    name: 'Grand Palace Suites Hotel',
    image: brandMedia.ventures.hotel,
    description: 'Award-winning hospitality built around service excellence and guest experience.',
  },
  {
    name: 'Real Estate Development',
    image: brandMedia.ventures.realEstate,
    description: 'Premium residential investments with long-term value creation potential.',
  },
  {
    name: 'Minch Mining PLC',
    image: brandMedia.ventures.mining,
    description: 'Industrial resource operations supporting dependable local supply capability.',
  },
  {
    name: 'Green Farm PLC',
    image: brandMedia.ventures.agriculture,
    description: 'Agriculture and sourcing partnerships built for cultivation and export readiness.',
  },
  {
    name: 'Coffee Export Ventures',
    image: brandMedia.ventures.export,
    description: 'Export growth opportunities connecting Ethiopian products with global buyers.',
  },
] as const

const whyReasons = partnershipReasons.map((reason, index) => ({
  icon: [Building2, Globe, TrendingUp, Shield, MapPin, Users][index],
  title: reason.title,
  description: reason.description,
}))

const continents = [
  'Distribution',
  'Hospitality',
  'Real Estate',
  'Mining',
  'Agriculture',
  'Export',
]

export default function PartnershipsPage() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-navbar pb-10 md:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src={brandMedia.ventures.distribution}
            alt="Ker & Co. partnerships"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/10 backdrop-blur-sm text-[#C9A46A] text-sm font-semibold mb-6">
              <Globe className="w-4 h-4" />
              Global Partnerships
            </div>
            <h1 className="text-2xl md:text-6xl lg:text-7xl font-bold text-[#C9A46A] mb-3 md:mb-6 font-heading">
              Strategic Partnerships
            </h1>
            <p className="text-xs md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {brand.name} is open to strategic relationships with investors, operators, suppliers, buyers, and growth partners who align with a founder-led, diversified Ethiopian business group.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Global Partnerships Intro */}
      <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#C9A46A]/10 text-[#C9A46A] text-sm font-semibold mb-4">
              <Globe className="w-4 h-4" />
              Global Network
            </div>
            <h2 className="text-xl md:text-5xl font-bold text-black mb-3 md:mb-6">
              Partnership Priorities
            </h2>
          </motion.div>

          {/* Continent Badges */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
            {continents.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-3 bg-gray-50 rounded-sm border border-gray-200 shadow-sm"
              >
                <Globe className="w-3 h-3 md:w-4 md:h-4 text-[#C9A46A]" />
                <span className="text-xs md:text-sm font-semibold text-gray-800">{c}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-4 text-gray-600 leading-relaxed text-sm md:text-lg">
            <p>
              {brand.shortName} is built for collaborative growth. We welcome relationships that strengthen distribution, hospitality, real estate, industrial activity, agriculture, and export performance through practical execution and shared long-term value.
            </p>
            <p>
              Our partnership model is not limited to one sector. It is designed for a diversified group that continues to expand through local operating strength, entrepreneurial discipline, and new market opportunities.
            </p>
            <p>
              We work with organizations that value reliability, quality, and long-term alignment. Whether the opportunity is operational, financial, supply-side, or market-facing, we seek relationships that can grow with clarity and trust.
            </p>
            <p>
              This network continues to grow as the group expands into new ventures and deeper international connections.
            </p>
            <p className="font-semibold text-gray-800">
              You may explore a selection of partner and network visuals below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Section — All In One image + description */}
      <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-8 md:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#C9A46A]/10 text-[#C9A46A] text-sm font-semibold mb-4">
              <Star className="w-4 h-4" />
              Our Partners
            </div>
            <h2 className="text-xl md:text-5xl font-bold text-black mb-2 md:mb-4">
              Meet Our Partner Network
            </h2>
          </motion.div>

          {/* All-in-one overview image + description */}
          <motion.div
            {...fadeIn}
            className="flex flex-row gap-3 md:gap-12 items-center mb-12 md:mb-20"
          >
            <div className="flex-shrink-0 w-2/5 md:w-1/2 relative rounded-sm md:rounded-sm overflow-hidden shadow-2xl border border-gray-100 bg-white">
              <Image
                src={brandMedia.ventures.distribution}
                alt="Ker & Co. partner network overview"
                width={900}
                height={600}
                className="w-full h-auto object-contain p-2 md:p-6"
                unoptimized
              />
            </div>
            <div className="flex-1 space-y-2 md:space-y-6">
              <h3 className="text-xs md:text-3xl font-bold text-gray-900 leading-tight">
                Diversified Ventures. Shared Growth Potential.
              </h3>
              <p className="hidden md:block text-base text-gray-600 leading-relaxed">
                The Ker & Co. network is built around long-term relationships that support venture growth, operational excellence, and meaningful market opportunity.
              </p>
              <p className="hidden md:block text-base text-gray-600 leading-relaxed">
                Across the group’s portfolio, partnership opportunities include distribution, hospitality, real estate, mining, agriculture, and premium export development.
              </p>
              <p className="text-[10px] md:hidden text-gray-600 leading-relaxed">
                Built for long-term collaboration across multiple ventures, operating markets, and growth opportunities.
              </p>
              <div className="grid grid-cols-2 gap-1.5 md:gap-4 pt-1 md:pt-2">
                {[
                  { label: '1997', desc: 'Founder Start' },
                  { label: `${departments.length}`, desc: 'Core Ventures' },
                  { label: '4', desc: 'Ker Fitness Sites' },
                  { label: '3', desc: 'Hotel Awards' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#C9A46A]/5 rounded-sm md:rounded-sm p-1.5 md:p-4 border border-[#C9A46A]/20 text-center">
                    <div className="text-sm md:text-3xl font-bold text-[#C9A46A]">{stat.label}</div>
                    <div className="text-[8px] md:text-sm text-gray-600 mt-0.5 leading-tight">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Individual Partner Logos — Artistic Layout */}
          <motion.div {...fadeIn}>
            <h3 className="text-base md:text-2xl font-bold text-gray-800 text-center mb-6 md:mb-10">
              Our Partner Companies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center justify-items-center">
              {partnerCompanies.map((company, i) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex flex-col h-full w-full max-w-sm overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out"
                >
                  <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                    <Image
                      src={company.image}
                      alt={company.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      unoptimized
                    />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    <h4 className="text-base md:text-lg font-bold text-gray-900 leading-snug mb-2">{company.name}</h4>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed flex-grow">{company.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commitment to the Future */}
      <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-8 md:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#C9A46A]/10 text-[#C9A46A] text-sm font-semibold mb-4">
              <Heart className="w-4 h-4" />
              Our Purpose
            </div>
            <h2 className="text-xl md:text-5xl font-bold text-black mb-2 md:mb-4">
              Our Commitment to the Future
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <motion.div {...fadeIn} className="space-y-4 md:space-y-5 text-gray-600 leading-relaxed text-sm md:text-lg">
              <p>
                {brand.name} was built to respond to real market needs through disciplined entrepreneurship. From practical trade to diversified ventures, the group continues to grow with a focus on relevance, durability, and value.
              </p>
              <p>
                We take pride in building ventures that create jobs, strengthen service quality, and open new pathways for collaboration across Ethiopia and beyond.
              </p>
              <p>
                Our commitment is rooted in service, stewardship, and long-term thinking. Growth, for us, is measured not only by scale, but by impact and sustainability.
              </p>
              <p>
                As we continue to expand across multiple sectors, our purpose remains clear: to strengthen the markets we enter and contribute to meaningful progress through trusted partnerships.
              </p>
            </motion.div>
            <motion.div
              {...fadeIn}
              className="relative h-64 md:h-[480px] rounded-sm overflow-hidden shadow-xl"
            >
              <Image
                src={brandMedia.ventures.hotel}
                alt="Ker & Co. commitment to the future"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm rounded-sm p-3 md:p-4 border border-white/20">
                <p className="text-white text-xs md:text-sm font-medium leading-snug">
                  &ldquo;Growth, for us, is measured not only by scale, but by impact.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Partner With Vanguard XIE */}
      <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-8 md:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#C9A46A]/10 text-[#C9A46A] text-sm font-semibold mb-4">
              <Gem className="w-4 h-4" />
              Partnership Value
            </div>
            <h2 className="text-xl md:text-5xl font-bold text-black mb-2 md:mb-4">
              Why Partner With {brand.shortName}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {whyReasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`bg-white rounded-sm p-5 md:p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${i === 6 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm bg-[#C9A46A]/10 flex items-center justify-center mb-3 md:mb-4">
                  <reason.icon className="w-5 h-5 md:w-6 md:h-6 text-[#C9A46A]" />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-3">{reason.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <Gem className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-6 text-white/80" />
            <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-4">Become a Partner</h2>
            <p className="text-xs md:text-lg text-white/80 mb-4 md:mb-8 leading-relaxed">
              If you are exploring investment, supply, operating collaboration, or export growth, let&apos;s discuss how we can build a long-term partnership with shared ambition.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => window.location.href = '/#contact'}
                className="px-7 py-3.5 md:px-9 md:py-4 bg-[#C9A46A] text-white rounded-sm font-semibold text-sm md:text-base shadow-xl shadow-[#C9A46A]/30 hover:bg-[#C9A46A] transition-all duration-300 flex items-center gap-2"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10"
                onClick={() => window.location.href = '/about'}
              >
                Learn About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
