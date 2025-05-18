'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState, useRef } from 'react'
import Bubble, { BubbleProps } from './bubble'

const MAX_SIZE = 6
const BUBBLE_LIFETIME = 60000 // 60 seconds in milliseconds

const generateRandomBubbles = (
  count: number,
  startId: number
): BubbleProps[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    initialX: Math.random() * 70 + 30,
    initialY: Math.random() * 100,
    maxSize: Math.random() * MAX_SIZE + 1,
    timestamp: Date.now(), // Add timestamp for tracking lifetime
    isPopRequested: false,
  }))
}

export default function FlowerBg() {
  const [bubbles, setBubbles] = useState<BubbleProps[]>([])
  const nextIdRef = useRef(0)
  const frameIdRef = useRef<number | null>(null)
  const isPoppingRef = useRef(false)

  const addBubbles = useCallback(() => {
    if (isPoppingRef.current) return
    const shouldAddBubbles = Math.random() < 0.75
    if (!shouldAddBubbles) return
    const newBubbles = generateRandomBubbles(2, nextIdRef.current)
    nextIdRef.current += newBubbles.length
    setBubbles((prevBubbles) => [...prevBubbles, ...newBubbles])
  }, [])

  const updateBubbles = useCallback(() => {
    const now = Date.now()

    // Remove bubbles older than BUBBLE_LIFETIME
    setBubbles((prevBubbles) =>
      prevBubbles.filter((bubble) => now - bubble.timestamp < BUBBLE_LIFETIME)
    )

    // Add new bubbles periodically (roughly every second)
    if (now % 1000 < 16.67) {
      // 16.67ms is roughly one frame at 60fps
      addBubbles()
    }

    // Continue the animation loop
    frameIdRef.current = requestAnimationFrame(updateBubbles)
  }, [addBubbles])

  useEffect(() => {
    // Start the animation loop
    frameIdRef.current = requestAnimationFrame(updateBubbles)

    // Cleanup
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current)
      }
    }
  }, [updateBubbles])

  // const popAllBubbles = async () => {
  //   isPoppingRef.current = true
  //   setBubbles((prevBubbles) =>
  //     prevBubbles.map((bubble) => ({ ...bubble, isPopRequested: true }))
  //   )
  //   await new Promise((resolve) => setTimeout(resolve, 1200))

  //   const initialBubbles = generateRandomBubbles(50, 0)
  //   nextIdRef.current = initialBubbles.length
  //   setBubbles(initialBubbles)

  //   isPoppingRef.current = false
  // }

  return (
    <div className="relative h-full w-full max-w-[500px]">
      <Image
        src="/images/flower.jpg"
        alt="logo"
        fill
        className="object-cover object-center"
        onLoad={() => {
          // Initialize with some bubbles
          const initialBubbles = generateRandomBubbles(25, 0)
          nextIdRef.current = initialBubbles.length
          setBubbles(initialBubbles)
        }}
      />
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} {...bubble} />
      ))}
    </div>
  )
}
