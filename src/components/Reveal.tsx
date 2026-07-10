'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale'

interface RevealProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  className?: string
  amount?: number
}

const DISTANCE = 60

const variantsMap: Record<Direction, Variants> = {
  up: { hidden: { opacity: 0, y: DISTANCE }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -DISTANCE }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -DISTANCE }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: DISTANCE }, show: { opacity: 1, x: 0 } },
  // "Comes from the back": scales up from a smaller depth while rising.
  scale: { hidden: { opacity: 0, scale: 0.82, y: 40 }, show: { opacity: 1, scale: 1, y: 0 } },
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  amount = 0.2,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variantsMap[direction]}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
