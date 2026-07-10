'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight, Camera } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase, GalleryImage } from '@/lib/supabase'
import { brand, brandMedia } from '@/lib/brand'

interface GalleryGroup {
  id: string
  title: string
  category: string
  mainImage: string
  images: string[] // Full list including main image
}

interface MediaDimensions {
  width: number
  height: number
}

const Gallery = () => {
  const [selectedGroup, setSelectedGroup] = useState<GalleryGroup | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All')
  const [uploadedImages, setUploadedImages] = useState<GalleryImage[]>([])
  const [mediaDimensions, setMediaDimensions] = useState<Record<string, MediaDimensions>>({})

  useEffect(() => {
    const fetchUploaded = async () => {
      const { data } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setUploadedImages(data)
    }
    fetchUploaded()
  }, [])

  const isVideoSrc = (src: string) => {
    const lower = src.toLowerCase()
    return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov')
  }

  const saveImageDimensions = (src: string, width: number, height: number) => {
    if (!width || !height) return

    setMediaDimensions((prev) => {
      if (prev[src]?.width === width && prev[src]?.height === height) {
        return prev
      }

      return {
        ...prev,
        [src]: { width, height },
      }
    })
  }

  const staticGalleryGroups: GalleryGroup[] = [
    {
      id: 'founder-journey',
      title: 'Founder Journey',
      category: 'Company',
      mainImage: brandMedia.founder.beginnings,
      images: [
        brandMedia.founder.beginnings,
        brandMedia.founder.portrait,
      ]
    },
    {
      id: 'distribution-trade',
      title: 'Distribution & Trade',
      category: 'Distribution',
      mainImage: brandMedia.ventures.distribution,
      images: [
        brandMedia.ventures.distribution,
        brandMedia.ventures.paper,
        brandMedia.ventures.partner,
      ]
    },
    {
      id: 'hospitality-wellness',
      title: 'Hospitality & Wellness',
      category: 'Operations',
      mainImage: brandMedia.ventures.hotel,
      images: [
        brandMedia.ventures.hotel,
        brandMedia.ventures.fitness,
      ]
    },
    {
      id: 'real-estate',
      title: 'Real Estate Development',
      category: 'Ventures',
      mainImage: brandMedia.ventures.realEstate,
      images: [
        brandMedia.ventures.realEstate,
      ]
    },
    {
      id: 'agriculture-export',
      title: 'Agriculture & Export Ventures',
      category: 'Ventures',
      mainImage: brandMedia.ventures.agriculture,
      images: [
        brandMedia.ventures.agriculture,
        brandMedia.ventures.export,
      ]
    },
    {
      id: 'industrial-growth',
      title: 'Industrial Growth',
      category: 'Ventures',
      mainImage: brandMedia.ventures.mining,
      images: [
        brandMedia.ventures.mining,
        brandMedia.ventures.realEstate,
      ]
    },
    {
      id: 'hero-media',
      title: 'Hero Media',
      category: 'Company',
      mainImage: brandMedia.hero.poster,
      images: [
        brandMedia.hero.poster,
        brandMedia.hero.desktopVideo,
        brandMedia.hero.mobileVideo,
      ]
    },
    {
      id: 'brand-assets',
      title: 'Ker & Co. Brand Assets',
      category: 'Company',
      mainImage: brand.logoPath,
      images: [
        brand.logoPath,
      ]
    }
  ]

  // Convert admin-uploaded images into gallery groups (grouped by category)
  const uploadedGroups: GalleryGroup[] = useMemo(() => {
    const grouped: Record<string, GalleryImage[]> = {}
    for (const img of uploadedImages) {
      const cat = img.category || 'Other'
      if (!grouped[cat]) grouped[cat] = []
      grouped[cat].push(img)
    }
    return Object.entries(grouped).map(([cat, images]) => ({
      id: `uploaded-${cat.toLowerCase().replace(/\s+/g, '-')}`,
      title: cat,
      category: 'Uploaded',
      mainImage: images[0].image_url,
      images: images.map((img) => img.image_url),
    }))
  }, [uploadedImages])

  const galleryGroups = useMemo(
    () => [...staticGalleryGroups, ...uploadedGroups],
    [uploadedGroups]
  )

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(galleryGroups.map((group) => group.category)))],
    [galleryGroups]
  )

  const filteredGroups =
    activeCategory === 'All'
      ? galleryGroups
      : galleryGroups.filter((g) => g.category === activeCategory)

  const openLightbox = (group: GalleryGroup) => {
    setSelectedGroup(group)
    setCurrentImageIndex(0)
  }

  const closeLightbox = () => {
    setSelectedGroup(null)
    setCurrentImageIndex(0)
  }

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedGroup) {
      setCurrentImageIndex((prev: number) => (prev + 1) % selectedGroup.images.length)
    }
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedGroup) {
      setCurrentImageIndex((prev: number) => 
        prev === 0 ? selectedGroup.images.length - 1 : prev - 1
      )
    }
  }

  const currentSrc = selectedGroup ? selectedGroup.images[currentImageIndex] : ''
  const currentIsVideo = currentSrc ? isVideoSrc(currentSrc) : false

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-navbar pb-8 md:pb-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-6 font-heading">
              Our <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-xs md:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore photos and videos from the ventures, facilities, operations, and brand story of {brand.name}.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setActiveCategory(name)}
                className={`px-2.5 py-1.5 md:px-4 md:py-2 rounded-[7px] text-[10px] md:text-sm font-semibold border transition-colors ${
                  activeCategory === name
                    ? 'bg-medical-blue text-white border-medical-blue'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-medical-blue hover:text-medical-blue'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-12 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-8">
            {filteredGroups.map((group, index) => {
              const photoCount = group.images.filter((src) => !isVideoSrc(src)).length
              const videoCount = group.images.filter((src) => isVideoSrc(src)).length
              const countLabel =
                videoCount > 0
                  ? `${photoCount} Photos • ${videoCount} Videos`
                  : `${photoCount} Photos`
              const mainImageDimensions = mediaDimensions[group.mainImage]
              const cardAspectRatio = mainImageDimensions
                ? `${mainImageDimensions.width} / ${mainImageDimensions.height}`
                : '4 / 3'

              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(group)}
                >
                  <div
                    className="relative overflow-hidden rounded-[7px] md:rounded-[8px] shadow-md group-hover:shadow-xl transition-all duration-300 bg-gray-100"
                    style={{ aspectRatio: cardAspectRatio }}
                  >
                    <img
                      src={encodeURI(group.mainImage)}
                      alt={group.title}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      onLoad={(event) => {
                        saveImageDimensions(
                          group.mainImage,
                          event.currentTarget.naturalWidth,
                          event.currentTarget.naturalHeight
                        )
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-1 md:gap-2 text-medical-blue mb-1 md:mb-2 text-[8px] md:text-sm font-medium uppercase tracking-wider">
                        <Camera className="w-3 h-3 md:w-4 md:h-4" />
                        {countLabel}
                      </div>
                      <h3 className="text-xs md:text-2xl font-bold mb-0.5 md:mb-1 leading-tight">{group.title}</h3>
                      <p className="text-gray-300 text-[9px] md:text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                        Click to view gallery
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Main Image Container */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              {currentIsVideo ? (
                <motion.video
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  src={encodeURI(currentSrc)}
                  controls
                  playsInline
                  className="max-w-full max-h-[85vh] object-contain rounded-[7px] shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  src={encodeURI(currentSrc)}
                  alt={`${selectedGroup.title} - Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-[7px] shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-[7px] hover:bg-medical-blue transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-[7px] hover:bg-medical-blue transition-colors"
              >
                <ArrowRight className="w-6 h-6" />
              </button>

              {/* Footer Info */}
              <div className="absolute bottom-8 left-0 right-0 text-center text-white pointer-events-none">
                <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{selectedGroup.title}</h3>
                <p className="text-sm text-gray-300 drop-shadow-md">
                  Item {currentImageIndex + 1} of {selectedGroup.images.length}
                </p>
              </div>
            </div>

            {/* Thumbnails Strip (Optional, simplified for now) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80vw] p-2 hide-scrollbar">
              {selectedGroup.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation()
                    setCurrentImageIndex(idx)
                  }}
                  className={`relative w-12 h-12 flex-shrink-0 rounded-[7px] overflow-hidden transition-all ${
                    currentImageIndex === idx ? 'ring-2 ring-medical-blue scale-110' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  {isVideoSrc(img) ? (
                    <div className="w-full h-full bg-black/80 flex items-center justify-center text-[10px] font-semibold text-white">
                      VIDEO
                    </div>
                  ) : (
                    <img src={encodeURI(img)} alt="" className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default Gallery
