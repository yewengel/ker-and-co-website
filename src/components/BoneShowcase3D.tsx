'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const BoneShowcase3D = () => {
  const [activeModel, setActiveModel] = useState(0)
  
  const models = [
    {
      type: 'spine' as const,
      title: 'Human Spine',
      description: 'Complete spinal column with vertebrae, showing natural curvature and anatomical structure.',
      details: ['Cervical vertebrae (C1-C7)', 'Thoracic vertebrae (T1-T12)', 'Lumbar vertebrae (L1-L5)', 'Sacrum and coccyx'],
      videoFile: 'spine.mp4'
    },
    {
      type: 'femur' as const,
      title: 'Femur Bone',
      description: 'The longest and strongest bone in the human body, connecting hip to knee.',
      details: ['Femoral head and neck', 'Greater and lesser trochanter', 'Shaft (diaphysis)', 'Distal condyles'],
      videoFile: 'Femur.mp4'
    },
    {
      type: 'knee' as const,
      title: 'Knee Joint',
      description: 'Complex hinge joint connecting femur, tibia, and patella with cartilage and ligaments.',
      details: ['Femoral condyles', 'Tibial plateau', 'Meniscus cartilage', 'Cruciate ligaments'],
      videoFile: 'KneeJoint.mp4'
    },
    {
      type: 'hip' as const,
      title: 'Hip Joint',
      description: 'Ball-and-socket joint providing stability and mobility for lower body movement.',
      details: ['Acetabulum (socket)', 'Femoral head (ball)', 'Hip capsule', 'Supporting ligaments'],
      videoFile: 'HipJoint.mp4'
    },
    {
      type: 'shoulder' as const,
      title: 'Shoulder Complex',
      description: 'Most mobile joint in the body, consisting of multiple bones and articulations.',
      details: ['Scapula (shoulder blade)', 'Humerus head', 'Clavicle (collarbone)', 'Rotator cuff muscles'],
      videoFile: 'shoulder.mp4'
    }
  ]

  const nextModel = () => {
    setActiveModel((prev) => (prev + 1) % models.length)
  }

  const prevModel = () => {
    setActiveModel((prev) => (prev - 1 + models.length) % models.length)
  }

  const currentModel = models[activeModel]

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-medical-teal/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-72 h-72 bg-medical-teal/10 rounded-[7px] blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-medical-green/10 rounded-[7px] blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Orthopedic <span className="text-gradient">Anatomy</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore detailed models of bones and joints
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Model Display */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[8px] overflow-hidden shadow-2xl border border-gray-700">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModel}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                      key={currentModel.type}
                    >
                      <source src={`/asset/${currentModel.videoFile}`} type="video/mp4" />
                    </video>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Controls */}
              <div className="absolute top-6 left-6 right-6 flex justify-between z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevModel}
                  className="w-12 h-12 rounded-[7px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </motion.button>
                
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[7px] px-4 py-2">
                  <span className="text-sm font-medium text-white">
                    {activeModel + 1} / {models.length}
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextModel}
                  className="w-12 h-12 rounded-[7px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Model Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModel}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {currentModel.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {currentModel.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Info className="w-5 h-5 text-medical-teal" />
                    <h4 className="text-lg font-semibold text-gray-900">Key Features:</h4>
                  </div>
                  <ul className="space-y-2">
                    {currentModel.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-medical-teal rounded-[7px] mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Button
                    variant="gradient"
                    size="lg"
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Learn About Our Treatments
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Model Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {models.map((model, index) => (
              <motion.button
                key={model.type}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveModel(index)}
                className={`
                  px-6 py-3 rounded-[7px] font-medium transition-all duration-300 shadow-lg
                  ${activeModel === index 
                    ? 'bg-gradient-to-r from-medical-teal to-medical-green text-white shadow-medical-teal/50' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-medical-teal/50'
                  }
                `}
              >
                {model.title}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BoneShowcase3D
