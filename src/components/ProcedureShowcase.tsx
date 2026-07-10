'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Syringe,
  Activity,
  Camera,
  FlaskConical,
  Eye,
  Zap
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProcedureStep {
  image: string
  title: string
  description: string
}

interface Procedure {
  id: string
  title: string
  description: string
  icon: any
  color: string
  category: 'surgical' | 'diagnostic' | 'therapeutic'
  steps: ProcedureStep[]
}

const ProcedureShowcase = () => {
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const procedures: Procedure[] = [
    {
      id: 'hemiarthroplasty',
      title: 'Hemiarthroplasty',
      description: 'Partial hip replacement surgery with precision and care',
      icon: Heart,
      color: 'bg-medical-blue',
      category: 'surgical',
      steps: [
        {
          image: '/images/Hemiarthroplasty.jpg',
          title: 'Hemiarthroplasty Procedure',
          description: 'Expert surgical technique for partial hip replacement'
        }
      ]
    },
    {
      id: 'total-hip-replacement',
      title: 'Total Hip Replacement',
      description: 'Complete hip joint replacement for restored mobility',
      icon: Heart,
      color: 'bg-teal-600',
      category: 'surgical',
      steps: [
        {
          image: '/images/Total hip replacement.jpg',
          title: 'Total Hip Replacement',
          description: 'Advanced surgical techniques for complete hip joint replacement'
        }
      ]
    },
    {
      id: 'prp-injection',
      title: 'PRP Injection Therapy',
      description: 'Platelet Rich Plasma therapy for natural healing',
      icon: Syringe,
      color: 'bg-medical-teal',
      category: 'therapeutic',
      steps: [
        {
          image: '/images/PRP injection .jpg',
          title: 'Initial Setup',
          description: 'Preparation for PRP injection therapy'
        },
        {
          image: '/images/PRP injection 1.jpg',
          title: 'Blood Collection',
          description: 'Patient blood sample collection for processing'
        },
        {
          image: '/images/PRP injection 2.jpg',
          title: 'Plasma Preparation',
          description: 'Centrifugation and platelet concentration'
        },
        {
          image: '/images/PRP injection 3.jpg',
          title: 'Injection Process',
          description: 'Precise injection into affected area'
        },
        {
          image: '/images/PRP injection 4.jpg',
          title: 'Post-Injection Care',
          description: 'Patient monitoring and post-procedure care'
        }
      ]
    },
    {
      id: 'anesthesia-care',
      title: 'Anesthesia & Follow-up Care',
      description: 'Comprehensive anesthesia management and patient monitoring',
      icon: Activity,
      color: 'bg-medical-green',
      category: 'therapeutic',
      steps: [
        {
          image: '/images/Anesthesia follow up and care.jpg',
          title: 'Anesthesia Administration',
          description: 'Safe and monitored anesthesia delivery'
        },
        {
          image: '/images/Anesthesia follow up and care1.jpg',
          title: 'Patient Monitoring',
          description: 'Continuous vital signs monitoring during procedure'
        },
        {
          image: '/images/Anesthesia follow up and care2.jpg',
          title: 'Post-anesthesia Recovery',
          description: 'Recovery monitoring and follow-up care'
        }
      ]
    },
    {
      id: 'digital-xray',
      title: 'Digital X-ray Imaging',
      description: 'Advanced digital radiography for precise diagnosis',
      icon: Zap,
      color: 'bg-medical-blue',
      category: 'diagnostic',
      steps: [
        {
          image: '/images/Digital Xray.jpg',
          title: 'Digital X-ray Setup',
          description: 'Advanced digital X-ray equipment preparation'
        },
        {
          image: '/images/Digital Xray2.jpg',
          title: 'Patient Positioning',
          description: 'Proper patient positioning for optimal imaging'
        },
        {
          image: '/images/Digital Xray3.jpg',
          title: 'Image Acquisition',
          description: 'High-quality digital X-ray capture'
        },
        {
          image: '/images/Digital Xray4.jpg',
          title: 'Image Processing',
          description: 'Digital image enhancement and processing'
        },
        {
          image: '/images/Digital Xray5.jpg',
          title: 'Diagnostic Analysis',
          description: 'Professional image analysis and diagnosis'
        }
      ]
    },
    {
      id: 'c-arm-xray',
      title: 'C-arm X-ray System',
      description: 'Real-time imaging during surgical procedures',
      icon: Camera,
      color: 'bg-teal-700',
      category: 'diagnostic',
      steps: [
        {
          image: '/images/C-arm Xray.jpg',
          title: 'C-arm X-ray System',
          description: 'Advanced C-arm imaging for real-time surgical guidance'
        }
      ]
    },
    {
      id: 'laboratory',
      title: 'Medical Laboratory Testing',
      description: 'Comprehensive laboratory analysis and diagnostics',
      icon: FlaskConical,
      color: 'bg-medical-green',
      category: 'diagnostic',
      steps: [
        {
          image: '/images/Laboratory1.jpg',
          title: 'Sample Collection',
          description: 'Professional sample collection and handling'
        },
        {
          image: '/images/Laboratory2.jpg',
          title: 'Laboratory Analysis',
          description: 'Advanced testing and analysis procedures'
        },
        {
          image: '/images/Laboratory3.jpg',
          title: 'Results & Reporting',
          description: 'Accurate results and comprehensive reporting'
        }
      ]
    }
  ]

  const openProcedure = (procedure: Procedure) => {
    setSelectedProcedure(procedure)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (selectedProcedure) {
      setCurrentStep((prev) => 
        prev === selectedProcedure.steps.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevStep = () => {
    if (selectedProcedure) {
      setCurrentStep((prev) => 
        prev === 0 ? selectedProcedure.steps.length - 1 : prev - 1
      )
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Procedures in <span className="text-gradient">Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See our medical expertise through step-by-step procedure documentation
          </p>
        </motion.div>

        {/* Procedure Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {procedures.map((procedure, index) => (
            <motion.div
              key={procedure.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="group cursor-pointer hover-lift border-0 shadow-lg overflow-hidden h-full"
                onClick={() => openProcedure(procedure)}
              >
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={procedure.steps[0].image}
                    alt={procedure.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon */}
                  <div className={`absolute top-4 left-4 w-12 h-12 ${procedure.color} rounded-[7px] flex items-center justify-center`}>
                    <procedure.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Steps Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-[7px]">
                    {procedure.steps.length} steps
                  </div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-[7px] flex items-center justify-center">
                      <Play className="w-8 h-8 text-gray-900 ml-1" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-medical-blue transition-colors">
                    {procedure.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {procedure.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-3 py-1 rounded-[7px] ${
                      procedure.category === 'surgical' ? 'bg-red-100 text-red-700' :
                      procedure.category === 'diagnostic' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {procedure.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      View Steps →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Selected Procedure Display */}
        {selectedProcedure && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-gray-50 to-white rounded-[8px] p-8 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-16 h-16 ${selectedProcedure.color} rounded-[8px] flex items-center justify-center`}>
                <selectedProcedure.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedProcedure.title}</h3>
                <p className="text-gray-600">{selectedProcedure.description}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Image Display */}
              <div className="relative">
                <div className="relative aspect-video bg-gray-100 rounded-[7px] overflow-hidden">
                  <Image
                    src={selectedProcedure.steps[currentStep].image}
                    alt={selectedProcedure.steps[currentStep].title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Navigation */}
                {selectedProcedure.steps.length > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevStep}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    
                    <div className="flex gap-2">
                      {selectedProcedure.steps.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-[7px] transition-colors ${
                            index === currentStep ? 'bg-medical-blue' : 'bg-gray-300'
                          }`}
                          onClick={() => setCurrentStep(index)}
                        />
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextStep}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Step Information */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-medical-blue">
                      Step {currentStep + 1} of {selectedProcedure.steps.length}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {selectedProcedure.steps[currentStep].title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProcedure.steps[currentStep].description}
                  </p>
                </div>

                {/* All Steps Overview */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-900">Procedure Overview:</h5>
                  {selectedProcedure.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-[7px] cursor-pointer transition-colors ${
                        index === currentStep ? 'bg-medical-blue/10 border border-medical-blue/20' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div className={`w-8 h-8 rounded-[7px] flex items-center justify-center text-sm font-medium ${
                        index === currentStep ? 'bg-medical-blue text-white' : 'bg-gray-300 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`text-sm ${
                        index === currentStep ? 'text-medical-blue font-medium' : 'text-gray-700'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProcedureShowcase
