'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  Globe,
  Building2,
  Briefcase
} from 'lucide-react'
import { brand, leadershipGroups, brandMedia } from '@/lib/brand'

interface TeamMember {
  name: string
  role: string
  image?: string
  bio: string
}

interface TeamGroup {
  title: string
  icon: any
  members: TeamMember[]
}

const Team = () => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>('Executive Leadership')
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  const founder: TeamMember = {
    name: brand.founderName,
    role: brand.founderTitle,
    image: brandMedia.founder.portrait,
    bio: 'Our founder built Ker & Co. Business Group from a humble 1997 import business into a diversified Ethiopian portfolio spanning distribution, paper products, hospitality, wellness, real estate, mining, agriculture, and export ventures.'
  }

  const teamGroups: TeamGroup[] = leadershipGroups.map((group, index) => ({
    title: group.title,
    icon: [Award, Briefcase, Building2, Globe][index],
    members: group.members.map((member) => ({
      name: member.name,
      role: member.role,
      bio: member.bio,
    })),
  }))

  const stats = [
    { icon: Users, value: '1997', label: 'Founder Start' },
    { icon: Globe, value: '4', label: 'Ker Fitness Sites' },
    { icon: Building2, value: '4', label: 'Luxury Towers' },
    { icon: Award, value: '3', label: 'Hotel Awards' },
  ]

  return (
    <section id="team" className="py-10 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold font-heading mb-3 md:mb-6">
            Our <span className="text-gradient">Leadership</span>
          </h2>
          <p className="text-xs md:text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the founder-led leadership structure guiding Ker & Co. Business Group across its diversified ventures and long-term growth strategy.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-8 md:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-2.5 md:p-6 bg-white rounded-[7px] md:rounded-[7px] border border-gray-100 shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-[7px] md:rounded-[7px] bg-medical-blue/10 mb-1.5 md:mb-3">
                <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-medical-blue" />
              </div>
              <div className="text-base md:text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="bg-white rounded-[7px] md:rounded-[8px] border border-gray-100 shadow-md overflow-hidden">
            <div className="p-3 md:p-8 flex flex-row items-center gap-3 md:gap-10">
              <div className="relative w-20 h-28 md:w-48 md:h-64 rounded-[7px] md:rounded-[7px] overflow-hidden shadow-xl flex-shrink-0">
                <Image
                  src={founder.image!}
                  alt={founder.name}
                  fill
                  className="object-contain bg-white p-3"
                  unoptimized
                />
              </div>
              <div className="text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 md:px-3 md:py-1 rounded-[7px] bg-medical-blue/10 text-medical-red text-[9px] md:text-xs font-semibold mb-1 md:mb-3">
                  <Award className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  Founder
                </div>
                <h3 className="text-sm md:text-3xl font-bold text-gray-900 mb-0.5 md:mb-1">{founder.name}</h3>
                <p className="text-[10px] md:text-base text-medical-blue font-semibold mb-1 md:mb-4">{founder.role}</p>
                <p className="text-[9px] md:text-base text-gray-600 leading-snug md:leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none">{founder.bio}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Groups */}
        <div className="space-y-4 md:space-y-8">
          {teamGroups.map((group) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[7px] md:rounded-[8px] border border-gray-100 shadow-md overflow-hidden"
            >
              <button
                onClick={() => setExpandedGroup(expandedGroup === group.title ? null : group.title)}
                className="w-full flex items-center justify-between p-3 md:p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-medical-blue rounded-[7px] md:rounded-[7px] flex items-center justify-center">
                    <group.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm md:text-xl font-bold text-gray-900">{group.title}</h3>
                    <p className="text-[10px] md:text-sm text-gray-500">{group.members.length} members</p>
                  </div>
                </div>
                {expandedGroup === group.title ? (
                  <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {expandedGroup === group.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2.5 md:p-6 pt-0 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
                      {group.members.map((member) => (
                        <motion.div
                          key={member.name + member.role}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="group"
                        >
                          <div
                            className="cursor-pointer"
                            onClick={() => setExpandedMember(expandedMember === member.name + member.role ? null : member.name + member.role)}
                          >
                            <div className="relative aspect-[3/4] rounded-[7px] md:rounded-[7px] overflow-hidden mb-2 md:mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                              {member.image ? (
                                <Image
                                  src={member.image}
                                  alt={member.name}
                                  fill
                                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                  unoptimized
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-medical-blue to-medical-red flex items-center justify-center">
                                  <Users className="w-10 h-10 text-white/60" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h4 className="text-[9px] md:text-sm font-bold text-gray-900 leading-tight">{member.name}</h4>
                            <p className="text-[8px] md:text-xs text-medical-blue font-medium mt-0.5">{member.role}</p>
                            <AnimatePresence>
                              {expandedMember === member.name + member.role && (
                                <motion.p
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="text-[10px] md:text-xs text-gray-600 mt-1 md:mt-2 leading-relaxed overflow-hidden"
                                >
                                  {member.bio}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
