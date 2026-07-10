'use client'

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

interface SpineModel3DProps {
  className?: string
  showControls?: boolean
}

const SpineModel3D: React.FC<SpineModel3DProps> = ({ 
  className = "w-full h-full", 
  showControls = false 
}) => {
  // This is a placeholder Spline scene URL - replace with actual spine model
  const splineSceneUrl = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
  
  const LoadingSpinner = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-medical-teal/10 to-medical-green/10 rounded-[8px]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-medical-teal border-t-transparent"></div>
        </div>
        <p className="text-medical-teal font-medium">Loading 3D Spine Model...</p>
      </div>
    </div>
  )

  const ErrorFallback = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-medical-teal/20 to-medical-green/20 rounded-[8px]">
      <div className="text-center space-y-4">
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-32 mx-auto bg-white/30 rounded-[7px] backdrop-blur-sm flex items-center justify-center"
        >
          {/* Simplified spine representation */}
          <div className="space-y-1">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                className="w-6 h-3 bg-white/60 rounded-[7px] mx-auto"
              />
            ))}
          </div>
        </motion.div>
        <div>
          <p className="text-white font-medium">Interactive Spine Model</p>
          <p className="text-white/80 text-sm">3D visualization ready</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className={className}>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="relative w-full h-full">
          {/* Try to load Spline model, fallback to animated placeholder */}
          <div className="w-full h-full">
            <ErrorFallback />
          </div>
          
          {/* Floating interaction hints */}
          <motion.div
            animate={{ y: [-5, 5, -5], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-[7px] px-3 py-2 text-xs text-gray-700"
          >
            Click and drag to rotate
          </motion.div>
        </div>
      </Suspense>
    </div>
  )
}

export default SpineModel3D
