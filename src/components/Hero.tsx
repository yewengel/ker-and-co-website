'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { brand, heroSlides } from '@/lib/brand'

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  const rotatingTexts = [...brand.heroRotatingTexts]
  const slides = [...heroSlides]

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(slideInterval)
  }, [slides.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative mt-navbar min-h-[calc(100svh-var(--navbar-offset))] flex items-center overflow-hidden bg-black">
      {/* Background image slideshow (replaces the old hero video) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.eyebrow}
              className={`w-full h-full object-cover ${index === currentSlide ? 'animate-kenburns' : ''}`}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-[1]"></div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-5 md:space-y-8"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-px w-10 md:w-16 bg-medical-blue" />
              <span className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-white/70">
                Ethiopian Business Group &middot; Since 1997
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-[1.05]">
              <span className="block text-white">Ker &amp; Co.</span>
              <span className="block text-gradient-gold">Business Group</span>
            </h1>

            <div className="h-9 sm:h-10 md:h-12 relative overflow-hidden max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.5 }}
                  className="text-base sm:text-lg md:text-2xl text-white/85 font-light absolute inset-0"
                >
                  {rotatingTexts[currentTextIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-7 py-3.5 md:px-9 md:py-4 bg-medical-blue text-white rounded-[7px] font-semibold text-sm md:text-base flex items-center gap-2 shadow-xl shadow-medical-blue/30 hover:bg-white hover:text-black transition-all duration-300"
              >
                Our Story
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3.5 md:px-9 md:py-4 border border-white/40 text-white rounded-[7px] font-semibold text-sm md:text-base hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Per-slide caption */}
      <div className="absolute bottom-24 md:bottom-28 left-4 sm:left-6 lg:left-8 z-10 max-w-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-3"
          >
            <span className="mt-1 h-10 md:h-12 w-1 bg-medical-blue rounded-[7px] shrink-0" />
            <div>
              <p className="text-medical-blue text-[10px] md:text-xs uppercase tracking-[0.2em] mb-1">
                {slides[currentSlide].eyebrow}
              </p>
              <p className="text-white font-heading text-lg md:text-2xl leading-tight">
                {slides[currentSlide].headline}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators + counter */}
      <div className="absolute bottom-8 right-4 sm:right-8 z-10 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1 rounded-[7px] transition-all duration-300 ${
                index === currentSlide ? 'w-7 bg-medical-blue' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        <span className="text-white/70 text-xs md:text-sm font-medium tabular-nums">
          {String(currentSlide + 1).padStart(2, '0')}
          <span className="text-white/40"> / {String(slides.length).padStart(2, '0')}</span>
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs uppercase tracking-wider">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-[7px] flex justify-center backdrop-blur-sm"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-[7px] mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
