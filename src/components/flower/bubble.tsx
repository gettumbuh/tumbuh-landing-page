'use client'

import { motion, useAnimate } from 'motion/react'
import { useEffect } from 'react'

export interface BubbleProps {
  id: number
  initialX: number
  initialY: number
  maxSize: number
  timestamp: number

  isPopRequested: boolean
}

export default function Bubble({
  id,
  initialX,
  initialY,
  maxSize,
  isPopRequested,
}: BubbleProps) {
  const [scope, animate] = useAnimate()

  const pop = async () => {
    // wait for a random amount of time (500 to 1000 ms)
    const waitTime = Math.random() * 1200 + 700
    await new Promise(resolve => setTimeout(resolve, waitTime))
    
    await animate(scope.current, {
      scale: 0,
      opacity: 0,
    }, {
        duration: 0.2,
        ease: [0.68, -0.55, 0.27, 1.55],
      }
    )
  }

  const growAndRise = async () => {
    await animate(scope.current, {
      scale: 1,
      opacity: 1,
    }, {
      duration: 3,
      ease: 'linear',
    })

    await animate(scope.current, {
      y: -1000,
    }, {
      duration: 60,
      ease: 'linear',
    })
  }

  useEffect(() => {
    growAndRise()
  }, [])

  useEffect(() => {
    if (isPopRequested) {
      pop()
    }
  }, [isPopRequested])

  return (
    <motion.div
      key={id}
      className="absolute rounded-full bg-white"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        width: `${maxSize}px`,
        height: `${maxSize}px`,
      }}
      ref={scope}
      initial={{ scale: 0, opacity: 0 }}
    ></motion.div>
  )
}
