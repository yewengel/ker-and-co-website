'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { brand } from '@/lib/brand'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  quickReplies?: string[]
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [hasShownWelcomePopup, setHasShownWelcomePopup] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: `Hello! I'm the ${brand.shortName} assistant. I can help you with information about Our Founder, our business story, departments, partnerships, and contact details. How can I assist you today?`,
        isBot: true,
        timestamp: new Date(),
        quickReplies: [
          "Our Services",
          "Our Founder",
          "Hospitality & Wellness",
          "Partnerships",
          "Location & Contact"
        ]
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  useEffect(() => {
    if (hasShownWelcomePopup || isOpen) return

    const timer = setTimeout(() => {
      setShowWelcomePopup(true)
      setHasShownWelcomePopup(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [hasShownWelcomePopup, isOpen])

  useEffect(() => {
    if (!showWelcomePopup) return

    const dismissTimer = setTimeout(() => {
      setShowWelcomePopup(false)
    }, 8000)

    return () => clearTimeout(dismissTimer)
  }, [showWelcomePopup])

  const handleOpenChat = () => {
    setShowWelcomePopup(false)
    setIsOpen(true)
  }

  const companyInfo = {
    hours: `We are available ${brand.hours}.`,
    services: 'Ker & Co. Business Group operates across FMCG and rural distribution, paper and sanitary products, hospitality and wellness, real estate development, mining, agriculture, and coffee and meat export ventures.',
    founder: 'Our Founder began her entrepreneurial journey in 1997 by importing hair bands, then expanded into FMCG, rural essentials, paper products, hospitality, wellness, real estate, mining, agriculture, and export ventures.',
    hospitality: 'Through Ker Fitness and Grand Palace Suites Hotel, the group has built a premium hospitality and wellness presence focused on customer experience, service quality, and brand growth.',
    agriculture: "Green Farm PLC reflects the group's agricultural vision through cultivation in Arba Minch, farmer partnerships, and export-ready sourcing of high-quality crops.",
    mining: 'Minch Mining PLC focuses on local coal mining and industrial supply, supporting cement factories and other industries that depend on reliable energy resources.',
    exports: "Ker & Co. is expanding global trade through premium Ethiopian coffee and meat export ventures, building partnerships that strengthen Ethiopia's international market presence.",
    partnerships: 'We welcome strategic partnerships across distribution, hospitality, real estate, mining, agriculture, and export—especially relationships built for long-term value and sustainable growth.',
    location: `${brand.name} is based in ${brand.location}.`,
    contact: `Phone: ${brand.phone} | Location: ${brand.location} | Best contact method: ${brand.emailLabel}`,
    requestInfo: `To request information or discuss a partnership, please call ${brand.phone} or use the Contact section on the website.`
  }

  const calculateScore = (input: string, keywords: string[]): number => {
    let score = 0
    const lowerInput = input.toLowerCase()
    
    keywords.forEach(keyword => {
      if (lowerInput.includes(keyword)) score += 2
      if (keyword.length > 4) {
        const parts = lowerInput.split(' ')
        parts.forEach(part => {
          if (Math.abs(part.length - keyword.length) <= 1) {
            let matches = 0
            for(let i=0; i<Math.min(part.length, keyword.length); i++) {
              if(part[i] === keyword[i]) matches++
            }
            if (matches >= keyword.length - 1) score += 1
          }
        })
      }
    })
    return score
  }

  type Intent = {
    keywords: string[]
    response: string
    replies: string[]
  }

  const intents: Record<string, Intent> = {
    hours: {
      keywords: ['hour', 'time', 'open', 'close', 'when', 'schedule', 'available', 'morning', 'evening', 'weekend', 'sunday', 'saturday', 'monday', 'friday'],
      response: companyInfo.hours,
      replies: ["Our Services", "Request Information", "Location & Contact"]
    },
    services: {
      keywords: ['service', 'services', 'what do you do', 'what do you offer', 'company', 'business', 'work', 'offerings', 'division', 'department'],
      response: companyInfo.services,
      replies: ["Our Founder", "Hospitality & Wellness", "Agriculture", "Partnerships"]
    },
    hospitality: {
      keywords: ['hotel', 'hospitality', 'wellness', 'spa', 'fitness', 'ker fitness', 'grand palace'],
      response: companyInfo.hospitality,
      replies: ["Our Services", "Our Founder", "Request Information"]
    },
    agriculture: {
      keywords: ['agriculture', 'farm', 'green farm', 'crop', 'farmer', 'produce'],
      response: companyInfo.agriculture,
      replies: ["Coffee & Meat Export", "Partnerships", "Request Information"]
    },
    mining: {
      keywords: ['mining', 'coal', 'minch mining', 'industrial', 'cement'],
      response: companyInfo.mining,
      replies: ["Our Services", "Partnerships", "Request Information"]
    },
    exports: {
      keywords: ['coffee', 'meat', 'export', 'ethiopian coffee', 'global trade', 'international market'],
      response: companyInfo.exports,
      replies: ["Agriculture", "Partnerships", "Request Information"]
    },
    partnerships: {
      keywords: ['partner', 'partnership', 'joint', 'venture', 'collaboration', 'cooperate', 'investor', 'trade', 'investment'],
      response: companyInfo.partnerships,
      replies: ["Our Services", "Request Information", "Location & Contact"]
    },
    founder: {
      keywords: ['founder', 'keria', 'keria ahmed', 'who founded', 'leadership', 'owner', 'chairwoman'],
      response: companyInfo.founder,
      replies: ["Our Services", "Partnerships", "Location & Contact"]
    },
    location: {
      keywords: ['location', 'address', 'where', 'contact', 'map', 'place', 'phone', 'call', 'email', 'number', 'reach'],
      response: companyInfo.contact,
      replies: ["Operating Hours", "Request Information", "Our Services"]
    },
    requestInfo: {
      keywords: ['request', 'information', 'inquiry', 'quote', 'pricing', 'price', 'buy', 'supply', 'order', 'contract'],
      response: companyInfo.requestInfo,
      replies: ["Location & Contact", "Operating Hours", "Our Services"]
    }
  }

  const getResponse = (userMessage: string): { text: string; quickReplies?: string[] } => {
    const message = userMessage.toLowerCase()

    if (message.match(/^(hi|hello|hey|greetings|morning|afternoon|evening)/)) {
       return {
        text: `Hello! Welcome to ${brand.name}. How can I help you today?`,
        quickReplies: ["Our Services", "Our Founder", "Hospitality & Wellness", "Location & Contact"]
      }
    }

    if (message.includes('thank')) {
      return {
        text: "You're welcome! Is there anything else I can help you with?",
        quickReplies: ["Our Services", "Request Information", "Location & Contact"]
      }
    }

    let bestIntent: Intent | null = null
    let maxScore = 0

    for (const data of Object.values(intents)) {
      const score = calculateScore(message, data.keywords)
      if (score > maxScore) {
        maxScore = score
        bestIntent = data
      }
    }

    if (bestIntent !== null && maxScore > 0) {
      return {
        text: bestIntent.response,
        quickReplies: bestIntent.replies
      }
    }

    return {
      text: "I'm not quite sure I understood that properly. Could you please rephrase? You can ask me about:",
      quickReplies: ["Our Services", "Our Founder", "Coffee & Meat Export", "Partnerships", "Location & Contact"]
    }
  }

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getResponse(text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        quickReplies: response.quickReplies
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button with entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.4 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 18,
          delay: 0.6,
        }}
        className="fixed bottom-16 right-4 md:bottom-12 md:right-6 z-50"
      >
        {/* Welcome popup tooltip */}
        <AnimatePresence>
          {showWelcomePopup && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute bottom-full right-0 mb-3 w-[220px] sm:w-[240px]"
            >
              <div className="relative bg-white border border-[#E8E2DA] rounded-[7px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-4 py-3">
                <button
                  type="button"
                  onClick={() => setShowWelcomePopup(false)}
                  className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-[#666666] hover:text-[#222222] transition-colors"
                  aria-label="Dismiss welcome message"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <p className="text-[13px] font-medium text-[#222222] pr-4 leading-snug">
                  Hi! How can I help you?
                </p>
                <button
                  type="button"
                  onClick={handleOpenChat}
                  className="mt-2 text-[12px] font-semibold text-[#A67C52] hover:text-[#8E6844] transition-colors"
                >
                  Start a conversation →
                </button>
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-[#E8E2DA] rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <span
            className="chatbot-trigger-ring absolute -inset-1 rounded-[7px] bg-[#A67C52]/30 pointer-events-none"
            aria-hidden="true"
          />
          <Button
            onClick={() => (isOpen ? setIsOpen(false) : handleOpenChat())}
            className={cn(
              'chatbot-trigger relative w-14 h-14 sm:w-16 sm:h-16 rounded-[7px] bg-[#A67C52] hover:bg-[#8E6844] text-white shadow-lg hover:shadow-xl transition-colors duration-300',
              !isOpen && 'chatbot-trigger'
            )}
            size="icon"
            aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
          >
            {isOpen ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </Button>
        </div>
      </motion.div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="chatbot-window fixed bottom-32 right-2 left-2 md:bottom-28 md:right-6 md:left-auto w-auto md:w-96 lg:w-[400px] max-w-[calc(100vw-1rem)] md:max-w-[calc(100vw-3rem)] h-[70vh] md:h-[500px] lg:h-[550px] max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-9rem)] bg-white rounded-[8px] shadow-2xl border border-[#E8E2DA] z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#A67C52] text-white p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-[7px] flex items-center justify-center">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">{brand.shortName} Assistant</h3>
                  <p className="text-xs text-white/80">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden w-8 h-8 rounded-[6px] bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-[#FAFAF8]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-[7px] ${
                        message.isBot
                          ? 'bg-white text-[#222222] border border-[#E8E2DA]'
                          : 'bg-[#A67C52] text-white'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    
                    {message.isBot && message.quickReplies && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => handleSendMessage(reply)}
                            className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs bg-[#F8F4EF] text-[#A67C52] border border-[#E8E2DA] rounded-[6px] hover:bg-[#A67C52]/10 transition-colors"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? 'order-1 mr-1 sm:mr-2 bg-[#F8F4EF] border border-[#E8E2DA]' : 'order-2 ml-1 sm:ml-2 bg-[#A67C52]/10'
                  }`}>
                    {message.isBot ? (
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-[#A67C52]" />
                    ) : (
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#8E6844]" />
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-[6px] bg-[#F8F4EF] border border-[#E8E2DA] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-[#A67C52]" />
                    </div>
                    <div className="bg-white border border-[#E8E2DA] px-4 py-2.5 rounded-[7px]">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#A67C52]/50 rounded-[2px] animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#A67C52]/50 rounded-[2px] animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[#A67C52]/50 rounded-[2px] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-[#E8E2DA] bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 text-sm border border-[#E8E2DA] rounded-[7px] focus:outline-none focus:ring-2 focus:ring-[#A67C52]/30 focus:border-[#A67C52]"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-[7px] bg-[#A67C52] hover:bg-[#8E6844] flex-shrink-0"
                  size="icon"
                >
                  <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
