'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Camera,
  Zap,
  Heart,
  Activity,
  Syringe,
  FlaskConical,
  Eye,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ImageSequence {
  id: string
  title: string
  description: string
  icon: any
  color: string
  images: string[]
  category: 'procedure' | 'equipment' | 'facility'
}

const MedicalGallery = () => {
  const [selectedSequence, setSelectedSequence] = useState<ImageSequence | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'procedure' | 'equipment' | 'facility'>('all')

  // Define your image sequences here
  const imageSequences: ImageSequence[] = [
    {
      id: 'hemiarthroplasty',
      title: 'Hemiarthroplasty',
      description: 'Partial hip replacement surgery procedure',
      icon: Heart,
      color: 'bg-medical-blue',
      category: 'procedure',
      images: ['/images/Hemiarthroplasty.jpg']
    },
    {
      id: 'total-hip-replacement',
      title: 'Total Hip Replacement',
      description: 'Complete hip joint replacement surgery',
      icon: Heart,
      color: 'bg-teal-600',
      category: 'procedure',
      images: ['/images/Total hip replacement.jpg']
    },
    {
      id: 'prp-injection',
      title: 'PRP Injection',
      description: 'Platelet Rich Plasma injection therapy',
      icon: Syringe,
      color: 'bg-medical-teal',
      category: 'procedure',
      images: [
        '/images/PRP injection .jpg',
        '/images/PRP injection 1.jpg',
        '/images/PRP injection 2.jpg',
        '/images/PRP injection 3.jpg',
        '/images/PRP injection 4.jpg'
      ]
    },
    {
      id: 'anesthesia-care',
      title: 'Anesthesia Follow-up and Care',
      description: 'Post-anesthesia patient monitoring and care',
      icon: Activity,
      color: 'bg-medical-green',
      category: 'procedure',
      images: [
        '/images/ward rooms/Anesthesia follow up and care.jpg',
        '/images/ward rooms/Anesthesia follow up and care1.jpg'
      ]
    },
    {
      id: 'c-arm-xray',
      title: 'C-arm X-ray',
      description: 'Advanced C-arm X-ray imaging system',
      icon: Camera,
      color: 'bg-teal-700',
      category: 'equipment',
      images: ['/images/C-arm Xray.jpg']
    },
    {
      id: 'digital-xray',
      title: 'Digital X-ray',
      description: 'State-of-the-art digital X-ray imaging',
      icon: Zap,
      color: 'bg-medical-blue',
      category: 'equipment',
      images: [
        '/images/Digital Xray.jpg',
        '/images/Digital Xray2.jpg',
        '/images/Digital Xray3.jpg',
        '/images/Digital Xray4.jpg',
        '/images/Digital Xray5.jpg'
      ]
    },
    {
      id: 'laboratory',
      title: 'Medical Laboratory',
      description: 'Comprehensive laboratory testing facility',
      icon: FlaskConical,
      color: 'bg-medical-green',
      category: 'equipment',
      images: [
        '/images/Laboratory1.jpg',
        '/images/Laboratory2.jpg',
        '/images/Laboratory3.jpg'
      ]
    },
    {
      id: 'surgery-procedures',
      title: 'Surgical Procedures',
      description: 'Advanced surgical techniques and procedures',
      icon: Heart,
      color: 'bg-teal-600',
      category: 'procedure',
      images: [
        '/images/saron_image_surgery1.jpg',
        '/images/saron_image_surgery2.jpg',
        '/images/saron_image_surgery3.jpg',
        '/images/saron_image_surgery4.jpg',
        '/images/saron_image_surgery5.jpg',
        '/images/saron_image_surgery6.jpg',
        '/images/saron_image_surgery7.jpg',
        '/images/saron_image_surgery8.jpg',
        '/images/saron_image_surgery9.jpg'
      ]
    },
    {
      id: 'medical-equipment',
      title: 'Medical Equipment',
      description: 'State-of-the-art medical equipment and technology',
      icon: Zap,
      color: 'bg-medical-teal',
      category: 'equipment',
      images: [
        '/images/saron_image_equipement1.jpg',
        '/images/saron_image_equipement2.jpg',
        '/images/saron_image_equipement3.jpg',
        '/images/saron_image_equipement4.jpg',
        '/images/saron_image_equipement5.jpg'
      ]
    },
    {
      id: 'facility-tour',
      title: 'Our Facility',
      description: 'Modern medical facility and patient areas',
      icon: Eye,
      color: 'bg-medical-blue',
      category: 'facility',
      images: [
        '/images/saron_building.jpg',
        '/images/saron_reception.jpg',
        '/images/saron_image_surgery_room.jpg'
      ]
    },
    {
      id: 'inpatient-ward',
      title: 'In-patient (Ward) Care',
      description: 'Comfortable orthopedic in-patient wards with continuous nursing care',
      icon: Heart,
      color: 'bg-medical-green',
      category: 'facility',
      images: [
        '/images/ward rooms/ward_main.jpg',
        '/images/ward rooms/ward_1.jpg',
        '/images/ward rooms/ward_2.jpg',
        '/images/ward rooms/ward_3.jpg',
        '/images/ward rooms/ward_4.jpg',
        '/images/ward rooms/ward_5.jpg'
      ]
    },
    {
      id: 'hospital-rooms',
      title: 'Hospital Rooms',
      description: 'Private and semi-private hospital rooms for in-patient care',
      icon: Camera,
      color: 'bg-medical-teal',
      category: 'facility',
      images: [
        '/images/ward rooms/hospital_room_main.jpg',
        '/images/ward rooms/hospital_room_1.jpg',
        '/images/ward rooms/hospital_room_2.jpg'
      ]
    }
  ]

  const categories = [
    { id: 'all', label: 'All', count: imageSequences.length },
    { id: 'procedure', label: 'Procedures', count: imageSequences.filter(seq => seq.category === 'procedure').length },
    { id: 'equipment', label: 'Equipment', count: imageSequences.filter(seq => seq.category === 'equipment').length },
    { id: 'facility', label: 'Facility', count: imageSequences.filter(seq => seq.category === 'facility').length }
  ]

  const filteredSequences = selectedCategory === 'all' 
    ? imageSequences 
    : imageSequences.filter(seq => seq.category === selectedCategory)

  const openGallery = (sequence: ImageSequence) => {
    setSelectedSequence(sequence)
    setCurrentImageIndex(0)
    setIsPlaying(false)
  }

  const closeGallery = () => {
    setSelectedSequence(null)
    setIsPlaying(false)
  }

  const nextImage = () => {
    if (selectedSequence) {
      setCurrentImageIndex((prev) => 
        prev === selectedSequence.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedSequence) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedSequence.images.length - 1 : prev - 1
      )
    }
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  // Auto-play functionality
  React.useEffect(() => {
    if (isPlaying && selectedSequence && selectedSequence.images.length > 1) {
      const interval = setInterval(nextImage, 2000) // Change image every 2 seconds
      return () => clearInterval(interval)
    }
  }, [isPlaying, selectedSequence])

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Our <span className="text-gradient">Medical Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Witness our advanced procedures and state-of-the-art equipment in action
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "medical" : "outline"}
              onClick={() => setSelectedCategory(category.id as any)}
              className="flex items-center gap-2"
            >
              {category.label}
              <span className="bg-white/20 text-xs px-2 py-1 rounded-[7px]">
                {category.count}
              </span>
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {filteredSequences.map((sequence, index) => (
            <motion.div
              key={sequence.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="group cursor-pointer hover-lift border-0 shadow-lg overflow-hidden"
                onClick={() => openGallery(sequence)}
              >
                <div className="relative aspect-video bg-gray-100">
                  {/* Preview Image */}
                  <Image
                    src={sequence.images[0]}
                    alt={sequence.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon */}
                  <div className={`absolute top-2 left-2 md:top-4 md:left-4 w-8 h-8 md:w-12 md:h-12 ${sequence.color} rounded-[7px] md:rounded-[7px] flex items-center justify-center`}>
                    <sequence.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  
                  {/* Image Count Badge */}
                  {sequence.images.length > 1 && (
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/70 text-white text-[10px] md:text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-[7px]">
                      {sequence.images.length} images
                    </div>
                  )}
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-white/90 rounded-[7px] flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 md:w-8 md:h-8 text-gray-900 ml-0.5 md:ml-1" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-3 md:p-4 lg:p-6">
                  <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-medical-blue transition-colors line-clamp-2">
                    {sequence.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
                    {sequence.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modal Gallery */}
        <AnimatePresence>
          {selectedSequence && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeGallery}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full bg-white rounded-[8px] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${selectedSequence.color} rounded-[7px] flex items-center justify-center`}>
                      <selectedSequence.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedSequence.title}</h3>
                      <p className="text-gray-600">{selectedSequence.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={closeGallery}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Image Display */}
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={selectedSequence.images[currentImageIndex]}
                    alt={`${selectedSequence.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                  
                  {/* Navigation Arrows */}
                  {selectedSequence.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Controls */}
                {selectedSequence.images.length > 1 && (
                  <div className="flex items-center justify-between p-6 border-t">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={togglePlayback}
                        className="flex items-center gap-2"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isPlaying ? 'Pause' : 'Play'}
                      </Button>
                      <span className="text-sm text-gray-600">
                        {currentImageIndex + 1} of {selectedSequence.images.length}
                      </span>
                    </div>
                    
                    {/* Thumbnail Navigation */}
                    <div className="flex gap-2 max-w-md overflow-x-auto">
                      {selectedSequence.images.map((image, index) => (
                        <button
                          key={index}
                          className={`relative w-12 h-12 rounded-[7px] overflow-hidden flex-shrink-0 ${
                            index === currentImageIndex ? 'ring-2 ring-medical-blue' : ''
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default MedicalGallery
