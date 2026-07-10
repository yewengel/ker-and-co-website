'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface BoneModel3DProps {
  type: 'femur' | 'spine' | 'knee' | 'shoulder' | 'hip'
  className?: string
  animated?: boolean
}

const BoneModel3D: React.FC<BoneModel3DProps> = ({ 
  type, 
  className = "w-full h-full",
  animated = true 
}) => {
  const getBoneVisualization = () => {
    switch (type) {
      case 'femur':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              animate={animated ? { 
                rotateY: [0, 360],
                rotateX: [0, 15, 0, -15, 0]
              } : {}}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Femur bone structure */}
              <div className="w-8 h-40 bg-gradient-to-b from-gray-100 to-gray-300 rounded-sm relative shadow-lg">
                {/* Femur head */}
                <div className="absolute -top-4 -left-2 w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-400 rounded-sm shadow-md"></div>
                {/* Greater trochanter */}
                <div className="absolute top-4 -right-2 w-6 h-8 bg-gradient-to-br from-gray-200 to-gray-400 rounded-sm shadow-md"></div>
                {/* Condyles */}
                <div className="absolute -bottom-2 -left-3 w-14 h-8 bg-gradient-to-br from-gray-200 to-gray-400 rounded-sm shadow-md"></div>
              </div>
            </motion.div>
          </div>
        )
      
      case 'spine':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              animate={animated ? { 
                rotateY: [0, 360],
                scale: [1, 1.05, 1]
              } : {}}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="space-y-1"
            >
              {/* Vertebrae */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={animated ? { 
                    scale: [1, 1.1, 1],
                    rotateZ: [0, 2, 0, -2, 0]
                  } : {}}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                  className="relative mx-auto"
                  style={{ 
                    width: `${20 + i * 2}px`, 
                    height: '12px',
                    background: `linear-gradient(45deg, #e5e7eb ${i * 8}%, #d1d5db ${100 - i * 5}%)`
                  }}
                >
                  {/* Vertebral body */}
                  <div className="w-full h-full rounded-sm shadow-sm relative">
                    {/* Spinous process */}
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-gray-400 rounded-[6px] shadow-sm"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )
      
      case 'knee':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              animate={animated ? { 
                rotateY: [0, 360],
                rotateX: [0, 20, 0]
              } : {}}
              transition={{ 
                duration: 7, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Femur (upper) */}
              <div className="w-6 h-20 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-full mb-2 shadow-lg">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-gray-300 rounded-sm"></div>
              </div>
              
              {/* Knee joint space */}
              <div className="w-12 h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded-sm shadow-inner mb-2 relative">
                {/* Meniscus */}
                <div className="absolute top-0 left-2 w-8 h-1 bg-blue-400 rounded-sm"></div>
                <div className="absolute bottom-0 left-2 w-8 h-1 bg-blue-400 rounded-sm"></div>
              </div>
              
              {/* Tibia (lower) */}
              <div className="w-6 h-20 bg-gradient-to-b from-gray-300 to-gray-200 rounded-b-full shadow-lg">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-gray-300 rounded-sm"></div>
              </div>
            </motion.div>
          </div>
        )
      
      case 'shoulder':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              animate={animated ? { 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Scapula */}
              <div className="w-16 h-20 bg-gradient-to-br from-gray-200 to-gray-400 rounded-sm shadow-lg relative">
                {/* Glenoid cavity */}
                <div className="absolute right-2 top-8 w-6 h-6 bg-gray-300 rounded-sm shadow-inner"></div>
              </div>
              
              {/* Humerus head */}
              <motion.div
                animate={animated ? { 
                  rotate: [0, -360],
                  x: [0, 5, 0, -5, 0]
                } : {}}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute right-0 top-6 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-300 rounded-sm shadow-lg"
              ></motion.div>
              
              {/* Clavicle */}
              <div className="absolute top-2 left-4 w-12 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-sm shadow-md"></div>
            </motion.div>
          </div>
        )
      
      case 'hip':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              animate={animated ? { 
                rotateY: [0, 360],
                rotateZ: [0, 10, 0, -10, 0]
              } : {}}
              transition={{ 
                duration: 9, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Pelvis */}
              <div className="w-20 h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-sm shadow-lg relative">
                {/* Acetabulum (hip socket) */}
                <div className="absolute left-4 bottom-2 w-8 h-8 bg-gray-300 rounded-sm shadow-inner"></div>
                <div className="absolute right-4 bottom-2 w-8 h-8 bg-gray-300 rounded-sm shadow-inner"></div>
              </div>
              
              {/* Femur heads */}
              <motion.div
                animate={animated ? { 
                  rotate: [0, -360],
                  y: [0, -2, 0, 2, 0]
                } : {}}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute left-6 bottom-0 w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-300 rounded-sm shadow-lg"
              ></motion.div>
              
              <motion.div
                animate={animated ? { 
                  rotate: [0, 360],
                  y: [0, 2, 0, -2, 0]
                } : {}}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute right-6 bottom-0 w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-300 rounded-sm shadow-lg"
              ></motion.div>
            </motion.div>
          </div>
        )
      
      default:
        return <div>Unknown bone type</div>
    }
  }

  return (
    <div className={`${className} relative`}>
      <div className="w-full h-full bg-gradient-to-br from-medical-teal/10 to-medical-green/10 rounded-sm overflow-hidden">
        {getBoneVisualization()}
        
        {/* Bone type label */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-sm px-3 py-1">
          <span className="text-xs font-medium text-gray-700 capitalize">{type}</span>
        </div>
        
        {/* Interactive hint */}
        {animated && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-2 right-2 text-xs text-white/80 bg-medical-teal/20 rounded-sm px-2 py-1"
          >
            3D
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default BoneModel3D
