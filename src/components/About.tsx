'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  Award, 
  Users, 
  Heart,
  Shield,
  Eye,
  Globe,
  Stethoscope,
  Scale,
  MapPin,
  Building2,
  ShieldCheck,
  ShoppingBag,
  Scroll,
  Dumbbell,
  Hotel,
  Home,
  Factory,
  Sprout,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { brand, brandMedia } from '@/lib/brand'
const ventures = [
  {
    image: brandMedia.ventures.distribution,
    alt: "Import, export and rural Ethiopia",
    title: "Import, Export & Rural Distribution",
    description: "Foundational trading and market reach",
  },
  {
    image: "/Ker & Co. Business Group/mamco distribution.jpg",
    alt: "MAMCO distribution",
    title: "Paper & Sanitary Products",
    description: "Legacy distribution leadership in Ethiopia",
  },
  {
    image: brandMedia.ventures.fitness,
    alt: "Ker Fitness",
    title: "Ker Fitness",
    description: "Wellness and lifestyle expansion",
  },
  {
    image: brandMedia.ventures.hotel,
    alt: "Grand Palace Suites Hotel",
    title: "Grand Palace Suites Hotel",
    description: "Award-winning hospitality and service",
  },
];
const About = () => {
  const visionMission = {
    vision: {
      icon: Eye,
      title: 'Our Vision',
      description: 'To build an enduring Ethiopian business group known for resilience, service quality, and transformational growth across multiple sectors.'
    },
    mission: {
      icon: Target,
      title: 'Our Mission',
      description: 'To grow trusted ventures that solve real market needs, create long-term value, and open new opportunities for communities, partners, and investors.'
    }
  }

  const coreValues = [
    {
      icon: Heart,
      title: 'Resilience',
      description: 'We grow through discipline, persistence, and courage in changing markets.'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Our reputation is built through reliability, integrity, and lasting relationships.'
    },
    {
      icon: Award,
      title: 'Service Excellence',
      description: 'We aim for quality experiences, dependable delivery, and meaningful customer value.'
    },
    {
      icon: Scale,
      title: 'Long-Term Investment',
      description: 'We build ventures designed for durability, growth, and intergenerational value.'
    },
    {
      icon: Stethoscope,
      title: 'People-Centered Growth',
      description: 'We grow by understanding everyday needs and turning them into practical businesses.'
    },
    {
      icon: Globe,
      title: 'Diversification',
      description: 'We expand thoughtfully across sectors while preserving strategic focus.'
    },
    {
      icon: Building2,
      title: 'Global Ambition',
      description: 'We create ventures that begin in Ethiopia and grow toward international markets.'
    }
  ]

  const stats = [
    { icon: Award, value: 'Since 1997', label: 'Founder Journey', color: 'text-[#C9A46A]' },
    { icon: Globe, value: '4', label: 'Ker Fitness Locations', color: 'text-[#C9A46A]' },
    { icon: MapPin, value: '3', label: 'Hotel Awards', color: 'text-[#C9A46A]' },
    { icon: Users, value: '4', label: 'Luxury Towers', color: 'text-[#C9A46A]' }
  ]

  const milestones = [
    {
      year: '1997',
      title: 'Entrepreneurial Journey',
      description: 'Started with importing hair accessories, laying the foundation for future growth.',
      icon: ShoppingBag
    },
    {
      year: '',
      title: 'Consumer Goods',
      description: 'Expanded into nationwide import, export, and rural distribution across Ethiopia.',
      icon: Scroll
    },
    {
      year: '',
      title: 'Paper Products',
      description: 'Became Ethiopia\'s leading distributor of paper and sanitary products.',
      icon: Building2
    },
    {
      year: '',
      title: 'Ker Fitness',
      description: 'Launched a premium fitness and wellness brand with multiple locations.',
      icon: Dumbbell
    },
    {
      year: '2023',
      title: 'Grand Palace Suites',
      description: 'Opened an award-winning luxury hotel recognized internationally.',
      icon: Hotel
    },
    {
      year: '',
      title: 'Real Estate',
      description: 'Developed luxury residential properties in Addis Ababa.',
      icon: Home
    },
    {
      year: '',
      title: 'Mining',
      description: 'Expanded into coal mining through Minch Mining PLC.',
      icon: Factory
    },
    {
      year: '',
      title: 'Agriculture',
      description: 'Established Green Farm PLC for sustainable farming and exports.',
      icon: Sprout
    },
    {
      year: '',
      title: 'Global Expansion',
      description: 'Growing international coffee and meat export partnerships.',
      icon: TrendingUp
    }
  ]

  return (
    <section id="about" className="py-10 md:py-20 bg-[#F8F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold font-heading mb-3 md:mb-6 text-black">
            About <span className="text-black">{brand.name}</span>
          </h2>
          <p className="text-xs md:text-xl text-gray-600 max-w-3xl mx-auto">
            {brand.name} tells the story of our founder’s rise from a small 1997 import business into a diversified Ethiopian group spanning distribution, paper products, hospitality, wellness, real estate, mining, agriculture, and export ventures.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-sm bg-[#C9A46A] mb-2 md:mb-4 shadow-sm">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Founder Story */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 60 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-center">
            <div className="relative overflow-hidden rounded-sm md:rounded-sm shadow-xl">
              <img
                src={brandMedia.founder.beginnings}
                alt="Our founder's beginnings"
                className="w-full h-40 md:h-80 object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">The Story of Our Founder</h3>
              <p className="text-xs md:text-base text-gray-600 mb-2 md:mb-4 leading-relaxed">
                Our founder began with a modest import venture in 1997, bringing hair bands to market and steadily turning opportunity into a disciplined commercial journey. That early start laid the foundation for everything that followed.
              </p>
              <p className="text-xs md:text-base text-gray-600 mb-2 md:mb-4 leading-relaxed">
                She expanded into rural distribution with products such as plastic slippers, lanterns, woven polypropylene bags, cooking oil, and paper products—building trust by serving practical needs across Ethiopia.
              </p>
              <p className="text-xs md:text-base text-gray-600 leading-relaxed">
                Over time, that momentum evolved into a diversified portfolio that now includes paper and sanitary products leadership, Ker Fitness, Grand Palace Suites Hotel, premium real estate, mining, agriculture, and export ventures.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-2 gap-3 md:gap-8 mb-10 md:mb-20">
          {Object.values(visionMission).map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full border border-transparent shadow-sm hover-lift bg-white">
                <CardContent className="p-3 md:p-8 text-center">
                  <div className="w-10 h-10 md:w-20 md:h-20 mx-auto rounded-sm bg-[#C9A46A] flex items-center justify-center mb-2 md:mb-6 shadow-sm">
                    <item.icon className="w-5 h-5 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-sm md:text-2xl font-bold text-[#111111] mb-1 md:mb-4">{item.title}</h3>
                  <p className="text-[10px] md:text-lg text-[#333333] leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tagline Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-20"
        >
          <div className="bg-white rounded-sm md:rounded-sm p-4 md:p-12 text-center shadow-xl">
            <p className="text-[10px] md:text-sm uppercase tracking-widest text-[#C9A46A] mb-2 md:mb-3">Our Promise</p>
            <h3 className="text-base md:text-4xl lg:text-5xl font-bold text-[#111111] italic">
              &ldquo;{brand.tagline}&rdquo;
            </h3>
            <p className="text-[10px] md:text-base text-[#333333] mt-2 md:mt-4 max-w-2xl mx-auto">
              A founder-led business journey built on practical trade, bold expansion, and ventures designed for long-term value.
            </p>
          </div>
        </motion.div>

        {/* Core Values */}
        <div className="mb-10 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-12"
          >
            <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Our Core Values</h3>
            <p className="text-xs md:text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at {brand.name}.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5">
            {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="h-full border border-transparent shadow-sm hover-lift bg-white">
                <CardContent className="p-4 md:p-5 lg:p-6 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mx-auto rounded-sm bg-[#C9A46A] flex items-center justify-center mb-3 md:mb-4 shadow-sm">
                    <value.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <h3 className="text-xs md:text-sm lg:text-base font-bold text-[#111111] mb-2 md:mb-3 line-clamp-2">{value.title}</h3>
                  <p className="text-[10px] md:text-xs lg:text-sm text-[#333333] leading-relaxed line-clamp-3">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          </div>
        </div>

        {/* Facility Showcase */}
        <div className="mb-10 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-12"
          >
            <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Our Ventures in Focus</h3>
            <p className="text-xs md:text-lg text-gray-600 max-w-2xl mx-auto">
              Signature ventures and brands that define the Ker &amp; Co. Business Group portfolio.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
  {ventures.map((venture, index) => (
    <motion.div
      key={venture.title}
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -30 : 30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
      }}
      className="relative overflow-hidden rounded-sm shadow-xl group"
    >
      <img
        src={venture.image}
        alt={venture.alt}
        className="
          w-full 
          h-40 
          sm:h-52 
          md:h-60 
          lg:h-64 
          object-cover 
          group-hover:scale-105 
          transition-transform 
          duration-500
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="
        absolute 
        bottom-3 
        left-3 
        md:bottom-5 
        md:left-5 
        text-white
      ">
        <h4 className="
          text-sm 
          text-white
          md:text-lg 
          lg:text-xl 
          font-bold 
          mb-1
        ">
          {venture.title}
        </h4>

        <p className="
          text-xs 
          md:text-sm 
          text-white
        ">
          {venture.description}
        </p>
      </div>
    </motion.div>
  ))}
</div>
          
        </div>

        {/* Our Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-20"
        >
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-xl md:text-3xl font-bold text-black mb-3 md:mb-4">
              Our Commitment
            </h3>
            <p className="text-xs md:text-lg text-gray-600 max-w-3xl mx-auto">
              Building trusted businesses that create lasting value across hospitality, wellness, real estate, agriculture, mining, and international trade.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-6 lg:gap-10">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ 
                  y: -6,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className="group relative w-full p-3 md:p-6 lg:p-8 rounded-sm transition-all duration-300 ease-in-out"
              >
                <div className="absolute inset-0 rounded-sm border border-transparent group-hover:border-[#C9A46A] transition-all duration-300 ease-in-out" />
                <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 shadow-lg transition-all duration-300 ease-in-out" />
                
                {milestone.year && (
                  <div className="text-[#C9A46A] font-bold text-[10px] md:text-sm lg:text-base mb-1 md:mb-3 lg:mb-4">
                    {milestone.year}
                  </div>
                )}
                {!milestone.year && (
                  <div className="h-3 mb-1 md:mb-3 lg:mb-4" />
                )}
                
                <div className="flex items-center mb-2 md:mb-4 lg:mb-5">
                  <div className="w-7 h-7 md:w-10 lg:w-12 md:h-10 lg:h-12 rounded-sm bg-[#C9A46A]/10 flex items-center justify-center group-hover:bg-[#C9A46A]/20 transition-all duration-300 ease-in-out">
                    <milestone.icon className="w-3.5 h-3.5 md:w-5 lg:w-6 md:h-5 lg:h-6 text-[#C9A46A]" />
                  </div>
                </div>
                
                <h4 className="font-bold text-[11px] md:text-base lg:text-lg text-gray-900 mb-1 md:mb-2 lg:mb-3">
                  {milestone.title}
                </h4>
                <p className="text-[9px] md:text-xs lg:text-sm text-gray-600 leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
