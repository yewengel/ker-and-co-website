'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { operationSchedules } from '@/lib/scheduleData'
import { Clock, Gem } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProgramPage() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-navbar pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4">
            Operations & Availability
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View our operational availability across mining, aggregates, trade & investment, and partnerships.
            Please note that all times are in <span className="font-semibold text-medical-blue">Ethiopian Local Time</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operationSchedules.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[7px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="bg-medical-blue/5 p-4 border-b border-medical-blue/10 flex items-start space-x-4">
                <div className="bg-medical-blue/10 p-3 rounded-[7px]">
                  <Gem className="w-6 h-6 text-medical-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{item.activity}</h2>
                  <p className="text-medical-blue text-sm font-medium">{item.area}</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    {item.schedule.map((time, index) => (
                      <p key={index} className="text-gray-600 text-sm leading-relaxed">
                        {time}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-[7px] p-6 text-center">
          <h3 className="text-lg font-semibold text-medical-blue mb-2">Need clarification?</h3>
          <p className="text-gray-600 mb-4">
            Our assistant can help you with availability and services. Ask about gold mining, crushed stone supply, or partnerships.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
