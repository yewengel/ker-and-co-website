'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { brand } from '@/lib/brand'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  FileText,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: [brand.phone],
      action: () => window.open(brand.phoneHref)
    },
    {
      icon: Mail,
      title: 'Email',
      details: [brand.emailLabel],
      action: null
    },
    {
      icon: MapPin,
      title: 'Head Office',
      details: [
        brand.location,
        brand.name
      ],
      action: () => window.open('https://www.google.com/maps?q=Addis+Ababa,+Ethiopia&output=embed')
    },
    {
      icon: Clock,
      title: 'Hours',
      details: [brand.hours],
      action: null
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          phone: '',
          interest: 'General Inquiry',
          status: 'new'
        })

      if (error) throw error

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    } catch (error) {
      console.error(error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-12 md:py-24 bg-[#F8F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 md:mb-18"
        >
          <h2 className="text-2xl md:text-5xl font-bold font-heading mb-3 md:mb-6 text-black">
            Contact <span className="text-black">Us</span>
          </h2>
          <p className="text-xs md:text-xl text-gray-600 max-w-3xl mx-auto">
            Reach out to discuss distribution, hospitality, agriculture, real estate, mining, export ventures, or partnership opportunities with Ker & Co. Business Group.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-14">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-8"
          >
            <div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-6">Get In Touch</h3>
              <p className="text-xs md:text-base text-gray-600 mb-4 md:mb-8">
                Contact us for project inquiries, commercial opportunities, investor conversations, or strategic partnerships. Our team will respond as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className={`hover-lift luxury-card ${info.action ? 'cursor-pointer' : ''}`}
                    onClick={info.action || undefined}
                  >
                    <CardContent className="p-3 md:p-6">
                      <div className="flex items-start space-x-2 md:space-x-4">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-[#C9A46A] rounded-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                          <info.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-[10px] md:text-base font-semibold text-gray-900 mb-0.5 md:mb-2">{info.title}</h4>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-[9px] md:text-sm text-gray-600">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-48 md:h-80 bg-white rounded-sm overflow-hidden shadow-lg border border-[#E7DED2]"
            >
              <iframe
                src="https://www.google.com/maps?q=Addis+Ababa,+Ethiopia&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${brand.name} Location`}
              />
            </motion.div>
          </motion.div>

          {/* Appointment Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border border-[#E7DED2] shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-base md:text-2xl font-bold text-gray-900 flex items-center">
                  <FileText className="w-4 h-4 md:w-6 md:h-6 mr-2 md:mr-3 text-[#C9A46A]" />
                  Contact Us
                </CardTitle>
                <p className="text-[11px] md:text-sm text-gray-500 mt-1 md:mt-2">
                  Fill in your details and we&rsquo;ll get back to you once our team has processed your message.
                </p>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="luxury-input text-xs md:text-base px-3 py-2 md:px-4 md:py-3"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Email address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="luxury-input text-xs md:text-base px-3 py-2 md:px-4 md:py-3"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="luxury-input text-xs md:text-base px-3 py-2 md:px-4 md:py-3 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-sm h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-green-800">Thank you! We&rsquo;ll get back to you once our team has processed your message.</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-sm">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-red-800">There was an error submitting your request. Please try again.</span>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
