'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Syringe, 
  Activity, 
  Camera,
  FlaskConical,
  Zap,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react'

interface ServiceImage {
  src: string
  alt: string
}

interface Service {
  id: string
  title: string
  description: string
  benefits: string[]
  features: string[]
  icon: any
  color: string
  images: ServiceImage[]
}

const Services = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({})
  const [autoPlay, setAutoPlay] = useState<{[key: string]: boolean}>({})

  const services: Service[] = [
    {
      id: 'hemiarthroplasty',
      title: 'Hemiarthroplasty',
      description: 'Partial hip replacement surgery with precision and expert care. Our experienced surgeons use advanced techniques to restore mobility and reduce pain.',
      benefits: ['Reduced hip pain', 'Improved mobility', 'Faster recovery', 'Expert surgical care'],
      features: ['Advanced surgical techniques', 'Experienced orthopedic surgeons', 'Post-operative care', 'Rehabilitation support'],
      icon: Heart,
      color: 'bg-medical-blue',
      images: [{ src: '/images/Hemiarthroplasty.jpg', alt: 'Hemiarthroplasty procedure' }]
    },
    {
      id: 'total-hip-replacement',
      title: 'Total Hip Replacement',
      description: 'Complete hip joint replacement surgery for patients with severe arthritis or hip damage. Restore full function and eliminate pain.',
      benefits: ['Complete pain relief', 'Full mobility restoration', 'Long-lasting results', 'Improved quality of life'],
      features: ['Modern implants', 'Minimally invasive techniques', 'Comprehensive rehabilitation', '24/7 post-op monitoring'],
      icon: Heart,
      color: 'bg-teal-600',
      images: [{ src: '/images/Total hip replacement.jpg', alt: 'Total hip replacement surgery' }]
    },
    {
      id: 'prp-injection',
      title: 'PRP Injection Therapy',
      description: 'Platelet Rich Plasma therapy using your own blood to accelerate healing. Natural treatment for joint pain, tendon injuries, and tissue repair.',
      benefits: ['Natural healing', 'Reduced inflammation', 'Faster recovery', 'Minimal side effects'],
      features: ['Your own blood used', 'Outpatient procedure', 'Quick treatment', 'Proven results'],
      icon: Syringe,
      color: 'bg-medical-teal',
      images: [
        { src: '/images/PRP injection .jpg', alt: 'PRP injection setup' },
        { src: '/images/PRP injection 1.jpg', alt: 'Blood collection for PRP' },
        { src: '/images/PRP injection 2.jpg', alt: 'PRP preparation process' },
        { src: '/images/PRP injection 3.jpg', alt: 'PRP injection procedure' },
        { src: '/images/PRP injection 4.jpg', alt: 'Post-injection care' }
      ]
    },
    {
      id: 'anesthesia-care',
      title: 'Anesthesia & Post-Operative Care',
      description: 'Comprehensive anesthesia management and continuous patient monitoring. Our anesthesiologists ensure your safety and comfort throughout your procedure.',
      benefits: ['Safe anesthesia delivery', 'Continuous monitoring', 'Pain management', 'Smooth recovery'],
      features: ['Experienced anesthesiologists', 'Modern monitoring equipment', 'Personalized care plans', '24/7 recovery monitoring'],
      icon: Activity,
      color: 'bg-medical-green',
      images: [
        { src: '/images/Anesthesia follow up and care.jpg', alt: 'Anesthesia administration' },
        { src: '/images/Anesthesia follow up and care1.jpg', alt: 'Patient monitoring during procedure' },
        { src: '/images/Anesthesia follow up and care2.jpg', alt: 'Post-anesthesia recovery care' }
      ]
    },
    {
      id: 'digital-xray',
      title: 'Digital X-ray Imaging',
      description: 'State-of-the-art digital X-ray technology for precise diagnosis. Immediate results with enhanced image quality for accurate treatment planning.',
      benefits: ['Instant results', 'High image quality', 'Lower radiation', 'Precise diagnosis'],
      features: ['Latest digital technology', 'Immediate image processing', 'Enhanced diagnostic accuracy', 'Comfortable positioning'],
      icon: Zap,
      color: 'bg-medical-blue',
      images: [
        { src: '/images/Digital Xray.jpg', alt: 'Digital X-ray equipment setup' },
        { src: '/images/Digital Xray2.jpg', alt: 'Patient positioning for X-ray' },
        { src: '/images/Digital Xray3.jpg', alt: 'X-ray image acquisition' },
        { src: '/images/Digital Xray4.jpg', alt: 'Digital image processing' },
        { src: '/images/Digital Xray5.jpg', alt: 'X-ray analysis and diagnosis' }
      ]
    },
    {
      id: 'c-arm-xray',
      title: 'C-arm X-ray System',
      description: 'Advanced C-arm imaging system for real-time visualization during surgical procedures. Ensures precision and safety in complex operations.',
      benefits: ['Real-time imaging', 'Surgical precision', 'Enhanced safety', 'Better outcomes'],
      features: ['Live surgical guidance', 'High-resolution imaging', 'Flexible positioning', 'Immediate feedback'],
      icon: Camera,
      color: 'bg-teal-700',
      images: [{ src: '/images/C-arm Xray.jpg', alt: 'C-arm X-ray system in operation' }]
    },
    {
      id: 'laboratory',
      title: 'Medical Laboratory Services',
      description: 'Comprehensive laboratory testing with 10+ specialized tests. From blood work to specialized orthopedic markers for complete health assessment.',
      benefits: ['Comprehensive testing', 'Quick results', 'Accurate diagnosis', 'Treatment monitoring'],
      features: ['CBC, ESR, CRP testing', 'Vitamin D analysis', 'Liver & kidney function', 'Coagulation studies'],
      icon: FlaskConical,
      color: 'bg-medical-green',
      images: [
        { src: '/images/Laboratory1.jpg', alt: 'Sample collection and handling' },
        { src: '/images/Laboratory2.jpg', alt: 'Laboratory analysis in progress' },
        { src: '/images/Laboratory3.jpg', alt: 'Results processing and reporting' }
      ]
    }
  ]

  // Auto-play functionality for multiple images
  useEffect(() => {
    const intervals: {[key: string]: NodeJS.Timeout} = {}
    
    services.forEach(service => {
      if (service.images.length > 1 && autoPlay[service.id]) {
        intervals[service.id] = setInterval(() => {
          setCurrentImageIndex(prev => ({
            ...prev,
            [service.id]: ((prev[service.id] || 0) + 1) % service.images.length
          }))
        }, 3000) // Change image every 3 seconds
      }
    })

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval))
    }
  }, [autoPlay, services])

  const nextImage = (serviceId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [serviceId]: ((prev[serviceId] || 0) + 1) % totalImages
    }))
  }

  const prevImage = (serviceId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] === 0 ? totalImages - 1 : (prev[serviceId] || 0) - 1
    }))
  }

  const toggleAutoPlay = (serviceId: string) => {
    setAutoPlay(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }))
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Our <span className="text-gradient">Medical Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced orthopedic care with visual transparency. See exactly what we offer and how we deliver exceptional medical services.
          </p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
              }`}
            >
              {/* Content Side */}
              <div className={index % 2 === 0 ? '' : 'lg:col-start-2'}>
                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 ${service.color} rounded-[8px] flex items-center justify-center`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">What We Provide:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-[7px]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className={index % 2 === 0 ? '' : 'lg:col-start-1'}>
                <div className="relative">
                  {/* Main Image Container */}
                  <div className="relative aspect-video bg-gray-100 rounded-[8px] overflow-hidden shadow-2xl">
                    <Image
                      src={service.images[currentImageIndex[service.id] || 0]?.src}
                      alt={service.images[currentImageIndex[service.id] || 0]?.alt}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        console.log('Image failed to load:', service.images[currentImageIndex[service.id] || 0]?.src)
                        // Fallback to a placeholder or another image
                        e.currentTarget.src = '/images/saron_building.jpg'
                      }}
                    />
                    
                    {/* Multiple Images Controls */}
                    {service.images.length > 1 && (
                      <>
                        {/* Navigation Arrows */}
                        <button
                          onClick={() => prevImage(service.id, service.images.length)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-[7px] flex items-center justify-center transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => nextImage(service.id, service.images.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-[7px] flex items-center justify-center transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Image Counter & Auto-play */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-3">
                          <div className="bg-black/70 text-white text-sm px-3 py-1 rounded-[7px]">
                            {(currentImageIndex[service.id] || 0) + 1} / {service.images.length}
                          </div>
                          <button
                            onClick={() => toggleAutoPlay(service.id)}
                            className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-[7px] flex items-center justify-center transition-colors"
                          >
                            {autoPlay[service.id] ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                          </button>
                        </div>

                        {/* Dot Indicators */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          {service.images.map((_, imgIdx) => (
                            <button
                              key={imgIdx}
                              onClick={() => setCurrentImageIndex(prev => ({ ...prev, [service.id]: imgIdx }))}
                              className={`w-2 h-2 rounded-[7px] transition-colors ${
                                (currentImageIndex[service.id] || 0) === imgIdx ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Image Description */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      {service.images[currentImageIndex[service.id] || 0]?.alt}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-white rounded-[8px] p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience Our Expert Care?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us today to schedule a consultation and see how our advanced medical services can help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-3 bg-medical-blue text-white rounded-[7px] font-semibold hover:bg-medical-blue/90 transition-colors"
                onClick={() => window.open('tel:+251911249528')}
              >
                Call: +251 911 249 528
              </button>
              <button 
                className="px-8 py-3 border border-medical-blue text-medical-blue rounded-[7px] font-semibold hover:bg-medical-blue/10 transition-colors"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
