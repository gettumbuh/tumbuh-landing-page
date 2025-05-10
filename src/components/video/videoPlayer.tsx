'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export default function VideoPlayer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  // Transform height from 300px to 150px based on scroll progress
  const height = useTransform(scrollYProgress, [0.5, 0.7], ["800px", "80px"])

  return (
    <motion.div 
      ref={ref}
      className="w-full flex items-center justify-center"
      style={{ height }}
    >
      <video src="/videos/cropped.mp4" autoPlay muted loop className="w-full h-full object-cover" />
    </motion.div>
  )
}