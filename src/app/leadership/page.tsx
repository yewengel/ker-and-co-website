'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users, Shield, User, Heart, Briefcase, Building2, BarChart3 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { brand, leadershipGroups, brandMedia } from '@/lib/brand'

type TeamMember = {
  name: string
  title: string
  image?: string
  bio?: string
}

type Division = {
  id: string
  title: string
  icon: React.ElementType
  color: string
  members: TeamMember[]
}

const divisions: Division[] = leadershipGroups.map((group, index) => ({
  id: group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title: group.title,
  icon: [Shield, Briefcase, Building2, BarChart3][index],
  color: ['blue', 'amber', 'red', 'charcoal'][index],
  members: group.members.map((member) => ({
    name: member.name,
    title: member.role,
    bio: member.bio,
  })),
}))

const colorMap: Record<string, { bg: string; text: string; badge: string; gradient: string }> = {
  blue: { bg: 'bg-[#C9A46A]/8', text: 'text-[#C9A46A]', badge: 'bg-[#C9A46A]/14', gradient: 'from-[#C9A46A] to-[#C9A46A]' },
  amber: { bg: 'bg-[#C9A46A]/8', text: 'text-[#C9A46A]', badge: 'bg-[#C9A46A]/14', gradient: 'from-[#C9A46A] to-[#C9A46A]' },
  red: { bg: 'bg-[#C9A46A]/8', text: 'text-[#C9A46A]', badge: 'bg-[#C9A46A]/14', gradient: 'from-[#C9A46A] to-[#C9A46A]' },
  charcoal: { bg: 'bg-gray-100', text: 'text-gray-900', badge: 'bg-gray-200', gradient: 'from-gray-800 to-black' },
}

export default function LeadershipPage() {
  const [activeDiv, setActiveDiv] = useState(divisions[0]?.id ?? '')

  const totalMembers = divisions.reduce((sum, d) => sum + d.members.length, 0)

  return (
    <main className="relative min-h-screen bg-[#F8F4EF]">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-navbar pb-10 md:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src={brandMedia.ventures.distribution}
            alt="Ker & Co. business group"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/10 backdrop-blur-sm text-medical-blue text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              Leadership & Stewardship
            </div>
            <h1 className="text-2xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-6 font-heading">
              The People Guiding <span className="text-medical-blue">{brand.shortName}</span>
            </h1>
            <p className="text-xs md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Meet the founder-led leadership structure behind Ker & Co. Business Group—guiding diversified ventures with discipline, growth focus, and long-term vision.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mt-6 md:mt-12 grid grid-cols-3 gap-2 md:gap-4 max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-sm md:rounded-sm border border-white/10 p-2.5 md:p-5">
              <div className="text-xl md:text-3xl font-bold text-medical-blue">{divisions.length}</div>
              <div className="text-[10px] md:text-sm text-gray-400">Leadership Groups</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-sm md:rounded-sm border border-white/10 p-2.5 md:p-5">
              <div className="text-xl md:text-3xl font-bold text-medical-blue">{totalMembers}</div>
              <div className="text-[10px] md:text-sm text-gray-400">Leadership Roles</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-sm md:rounded-sm border border-white/10 p-2.5 md:p-5">
              <div className="text-xl md:text-3xl font-bold text-medical-blue">1997</div>
              <div className="text-[10px] md:text-sm text-gray-400">Founder Start</div>
            </div>
          </div>
        </div>
      </section>

      {/* Division Tabs */}
      <section className="sticky top-16 lg:top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-3 hide-scrollbar">
            {divisions.map((div) => {
              const colors = colorMap[div.color]
              const isActive = activeDiv === div.id
              return (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => {
                    setActiveDiv(div.id)
                    const el = document.getElementById(`div-${div.id}`)
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-semibold transition-all ${
                    isActive
                      ? `${colors.badge} ${colors.text} shadow-sm`
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{div.title}</span>
                  <span className="sm:hidden">{div.title.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-6 md:py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-50 to-white rounded-sm md:rounded-sm border border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="p-4 md:p-10 flex flex-row items-center gap-4 md:gap-12">
              <div className="relative w-28 h-64 md:w-52 md:h-68 rounded-sm md:rounded-sm overflow-hidden shadow-xl flex-shrink-0">
                <Image
                  src={brandMedia.founder.portrait}
                  alt={brand.founderName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 md:px-3 md:py-1 rounded-sm bg-[#C9A46A]/14 text-[#C9A46A] text-[9px] md:text-xs font-semibold mb-1.5 md:mb-3">
                  <Shield className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  Founder
                </div>
                <h2 className="text-sm md:text-4xl font-bold text-gray-900 mb-0.5 md:mb-1">{brand.founderName}</h2>
                <p className="text-[10px] md:text-lg text-[#C9A46A] font-semibold mb-1.5 md:mb-4">{brand.founderTitle}</p>
                <p className="text-[9px] md:text-base text-gray-600 leading-snug md:leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none">
                  Keria Ahmed built Ker & Co. Business Group from a humble 1997 import business into a diversified Ethiopian portfolio spanning distribution, paper products, hospitality, wellness, real estate, mining, agriculture, and export ventures.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Sections */}
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          {divisions.map((div) => {
            const colors = colorMap[div.color]
            return (
              <div key={div.id} id={`div-${div.id}`} className="scroll-mt-40">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-sm ${colors.badge} flex items-center justify-center`}>
                      <div.icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <span className={`text-sm font-semibold ${colors.text} uppercase tracking-wider`}>{div.members.length} Members</span>
                  </div>
                  <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-4 md:mb-8">{div.title}</h2>

                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
                    {div.members.map((member) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="group bg-white rounded-sm md:rounded-sm border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                      >
                        <div className="relative w-full aspect-[3/4] md:aspect-square bg-gray-100">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              unoptimized
                            />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}>
                              <User className="w-12 h-12 text-white/60" />
                            </div>
                          )}
                        </div>
                        <div className="p-1.5 md:p-3">
                          <h3 className="font-semibold text-gray-900 text-[9px] md:text-sm leading-tight">{member.name}</h3>
                          <p className={`text-[8px] md:text-xs ${colors.text} mt-0.5 md:mt-1 leading-tight`}>{member.title}</p>
                          {member.bio && (
                            <p className="text-[8px] md:text-xs text-gray-500 mt-1 leading-relaxed line-clamp-3">{member.bio}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-6 h-6 md:w-10 md:h-10 mx-auto mb-3 md:mb-6 text-white/80" />
            <blockquote className="text-xs md:text-2xl font-medium leading-relaxed text-white/90 italic">
              &ldquo;{brand.signatureLine}&rdquo;
            </blockquote>
            <p className="mt-6 text-white/80 text-sm">
              The group’s leadership model is built around stewardship, operational discipline, and ventures designed to grow with clarity and purpose.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
