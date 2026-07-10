'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Bone, 
  Heart, 
  Activity, 
  Stethoscope, 
  Baby, 
  Zap,
  ArrowRight,
  CheckCircle,
  Camera,
  FlaskConical,
  Syringe,
  Wrench,
  Brain,
  Pill,
  Truck,
  Target,
  Shield,
  Users
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import BoneModel3D from '@/components/BoneModel3D'

const Services = () => {
  const diagnosticServices = [
    {
      icon: Camera,
      title: 'Diagnostic Imaging',
      description: 'Advanced imaging services for accurate diagnosis and treatment planning.',
      features: ['Digital X-ray Machine', 'Musculo-skeletal Ultrasound', 'Real-time Imaging'],
      color: 'bg-medical-blue',
      boneModel: 'knee' as const
    },
    {
      icon: FlaskConical,
      title: 'Medical Laboratory',
      description: 'Comprehensive laboratory services with 10+ specialized tests for complete health assessment.',
      features: ['CBC', 'Coagulation Profile', 'FBS/RBS', 'ESR', 'Renal Function Test', 'Urine Analysis', 'CRP', 'Chemistry', 'Vitamin D', 'RF', 'Liver Function Test'],
      color: 'bg-medical-green',
      boneModel: 'femur' as const
    }
  ]

  const treatmentServices = [
    {
      icon: Syringe,
      title: 'PRP Injection',
      description: 'Platelet Rich Plasma injection using your own blood to stimulate healing in damaged tissues.',
      features: ['Tendon Repair', 'Ligament Healing', 'Joint Treatment', 'Pain Reduction', 'Improved Function'],
      color: 'bg-medical-teal',
      boneModel: 'shoulder' as const
    },
    {
      icon: Wrench,
      title: 'Conservative Management',
      description: 'Non-surgical treatment of fractures and dislocations with expert care.',
      features: ['Fracture Management', 'Dislocation Treatment', 'Cast Application', 'Follow-up Care'],
      color: 'bg-teal-600',
      boneModel: 'femur' as const
    }
  ]

  const surgicalServices = [
    {
      icon: Heart,
      title: 'Joint Replacement Surgery',
      description: 'Complete joint replacement services to restore function and movement.',
      features: ['Total Hip Replacement', 'Total Knee Replacement', 'Shoulder Replacement', 'Hemiarthroplasty'],
      color: 'bg-medical-blue',
      boneModel: 'hip' as const
    },
    {
      icon: Bone,
      title: 'Fracture Surgery',
      description: 'Surgical treatment of simple and complicated fractures with advanced techniques.',
      features: ['Simple Fractures', 'Complicated Fractures', 'Internal Fixation', 'External Fixation'],
      color: 'bg-teal-600',
      boneModel: 'femur' as const
    },
    {
      icon: Activity,
      title: 'Hand Surgery',
      description: 'Specialized surgical procedures for hand and wrist conditions.',
      features: ['Hand Trauma', 'Wrist Surgery', 'Tendon Repair', 'Nerve Repair'],
      color: 'bg-medical-green',
      boneModel: 'shoulder' as const
    },
    {
      icon: Brain,
      title: 'Neurosurgery',
      description: 'Advanced neurosurgical procedures for spine and neurological conditions.',
      features: ['Spine Surgery', 'Neurological Disorders', 'Minimally Invasive Procedures'],
      color: 'bg-teal-700',
      boneModel: 'spine' as const
    }
  ]

  const specialtyServices = [
    {
      icon: Baby,
      title: 'Pediatric Orthopedics',
      description: 'Specialized orthopedic care for children and adolescents.',
      features: ['Congenital Conditions', 'Growth Disorders', 'Pediatric Fractures', 'Child-Friendly Care'],
      color: 'bg-medical-blue',
      boneModel: 'femur' as const
    },
    {
      icon: Shield,
      title: 'Bone Health & Osteoporosis',
      description: 'Comprehensive management of bone health and osteoporosis treatment.',
      features: ['Bone Density Testing', 'Osteoporosis Management', 'Prevention Programs', 'Nutritional Counseling'],
      color: 'bg-medical-green',
      boneModel: 'spine' as const
    },
    {
      icon: Stethoscope,
      title: 'Physiotherapy',
      description: 'Comprehensive rehabilitation services to restore function and mobility.',
      features: ['Post-Surgery Rehab', 'Mobility Training', 'Pain Management', 'Recovery Programs'],
      color: 'bg-medical-teal',
      boneModel: 'shoulder' as const
    }
  ]

  const supportServices = [
    {
      icon: Pill,
      title: 'Pharmacy',
      description: 'On-site pharmacy services for convenient medication access.',
      features: ['Prescription Medications', 'Pain Management', 'Post-Surgery Medications', 'Consultation'],
      color: 'bg-teal-600',
      boneModel: 'knee' as const
    },
    {
      icon: Truck,
      title: 'Ambulance Service',
      description: 'Emergency ambulance services for urgent medical transportation.',
      features: ['Emergency Transport', '24/7 Availability', 'Medical Equipment', 'Trained Staff'],
      color: 'bg-teal-700',
      boneModel: 'femur' as const
    }
  ]

  const commonCases = [
    'Arthritis and Osteoarthritis',
    'Back Pain',
    'Hip, Knee and Shoulder Pain',
    'Fractures and Dislocations',
    'Trauma',
    'Congenital and Degenerative Bone Diseases'
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-medical-green/20 rounded-[7px] blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-medical-teal/20 rounded-[7px] blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-medical-blue text-white rounded-[7px] text-sm font-semibold shadow-lg">
              What We Offer
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We specialize in advanced orthopedics and joint replacement services, offering comprehensive care for bone, joint and musculo-skeletal disorders with the most effective surgical and non-surgical treatments.
          </p>
        </motion.div>

        {/* Diagnostic Services */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Diagnostic Services
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-8">
            {diagnosticServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Treatment Services */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Treatment Services
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-8">
            {treatmentServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Surgical Services */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Surgical Services
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {surgicalServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Specialty Services */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Specialty Services
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {specialtyServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Support Services */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Support Services
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-8">
            {supportServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Common Cases We Treat */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[8px] p-8 shadow-lg mb-16"
        >
          <div className="text-center mb-8">
            <Target className="w-12 h-12 text-medical-teal mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Common Cases We Treat
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced team specializes in treating a wide range of orthopedic conditions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonCases.map((condition, index) => (
              <motion.div
                key={condition}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-[7px]"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{condition}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-[8px] p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Immediate Orthopedic Care?
            </h3>
            <p className="text-gray-600 mb-6">
              Our experienced team is ready to provide the care you need. Contact us for emergency care or to schedule a consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="medical"
                onClick={() => window.open('tel:+251911249528')}
              >
                Emergency: +251 911 249 528
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Schedule Appointment
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Service Card Component
const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover-lift group cursor-pointer border-0 shadow-lg overflow-hidden">
        <CardHeader className="text-center pb-4 relative">
          {/* 3D Bone Model Background */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
            <BoneModel3D type={service.boneModel} className="w-full h-full" animated={false} />
          </div>
          
          <div className={`w-16 h-16 mx-auto rounded-[8px] ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
            <service.icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-medical-blue transition-colors">
            {service.title}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2 mb-6">
            {service.features.map((feature: string, idx: number) => (
              <li key={idx} className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-medical-blue group-hover:text-white group-hover:border-medical-blue transition-all duration-300"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Services
