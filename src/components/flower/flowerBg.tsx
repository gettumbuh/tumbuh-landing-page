'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState, useRef } from 'react'
import Bubble, { BubbleProps } from './bubble'
import BadgesContainer from '../badges/badgesContainer'

const MAX_SIZE = 6
const BUBBLE_LIFETIME = 60000 // 60 seconds in milliseconds

const MAIN_ADJECTIVES = ['Coordinating', 'Fighting back', 'One']
const SECONDARY_ADJECTIVES = [
  'relentless',
  'unyielding',
  'resolute',
  'mighty',
  'unbreakable',
  'tenacious',
  'invincible',
  'unstoppable',
  'undaunted',
  'vigilant',
  'relentless',
  'unyielding',
  'resolute',
  'mighty',
  'unbreakable',
  'tenacious',
  'invincible',
  'unstoppable',
  'undaunted',
  'vigilant',
]

// Timing constants (in milliseconds)
const MAIN_ADJECTIVE_DURATION = 4000 // 4 seconds
const SECONDARY_ADJECTIVE_DURATION = 80 // 1 second

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
  const [currentAdjective, setCurrentAdjective] = useState(MAIN_ADJECTIVES[0])
  const [showMainAdjective, setShowMainAdjective] = useState(true)
  const nextIdRef = useRef(0)
  const frameIdRef = useRef<number | null>(null)
  const isPoppingRef = useRef(false)
  const mainAdjectiveIndexRef = useRef(0)
  const secondaryAdjectiveIndexRef = useRef(0)
  const adjectiveTimerRef = useRef<NodeJS.Timeout | null>(null)

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

  // Handle cycling through adjectives
  useEffect(() => {
    const cycleAdjectives = () => {
      if (showMainAdjective) {
        // Pop all bubbles when secondary cycle starts
        // popAllBubbles()

        setTimeout(() => {
          // We're currently showing a main adjective, cycle to secondary adjectives
          setShowMainAdjective(false)
          secondaryAdjectiveIndexRef.current = 0
          setCurrentAdjective(SECONDARY_ADJECTIVES[0])

          // Schedule next change to first secondary adjective
          adjectiveTimerRef.current = setTimeout(() => {
            advanceSecondaryAdjective()
          }, SECONDARY_ADJECTIVE_DURATION)
        }, 300)
      } else {
        // Move to next main adjective
        setShowMainAdjective(true)
        mainAdjectiveIndexRef.current =
          (mainAdjectiveIndexRef.current + 1) % MAIN_ADJECTIVES.length
        setCurrentAdjective(MAIN_ADJECTIVES[mainAdjectiveIndexRef.current])

        // Schedule next cycle after MAIN_ADJECTIVE_DURATION
        adjectiveTimerRef.current = setTimeout(
          cycleAdjectives,
          MAIN_ADJECTIVE_DURATION
        )
      }
    }

    const advanceSecondaryAdjective = () => {
      // Move to next secondary adjective
      secondaryAdjectiveIndexRef.current++

      if (secondaryAdjectiveIndexRef.current < SECONDARY_ADJECTIVES.length) {
        // Still more secondary adjectives to show
        setCurrentAdjective(
          SECONDARY_ADJECTIVES[secondaryAdjectiveIndexRef.current]
        )

        // Schedule next secondary adjective
        adjectiveTimerRef.current = setTimeout(
          advanceSecondaryAdjective,
          SECONDARY_ADJECTIVE_DURATION
        )
      } else {
        // Done with all secondary adjectives, go back to main adjectives
        setShowMainAdjective(true)
        mainAdjectiveIndexRef.current =
          (mainAdjectiveIndexRef.current + 1) % MAIN_ADJECTIVES.length
        setCurrentAdjective(MAIN_ADJECTIVES[mainAdjectiveIndexRef.current])

        // Schedule next cycle after MAIN_ADJECTIVE_DURATION
        adjectiveTimerRef.current = setTimeout(
          cycleAdjectives,
          MAIN_ADJECTIVE_DURATION
        )
      }
    }

    // Start with first main adjective
    setCurrentAdjective(MAIN_ADJECTIVES[mainAdjectiveIndexRef.current])

    // Schedule first transition after MAIN_ADJECTIVE_DURATION
    adjectiveTimerRef.current = setTimeout(
      cycleAdjectives,
      MAIN_ADJECTIVE_DURATION
    )

    // Cleanup
    return () => {
      if (adjectiveTimerRef.current) {
        clearTimeout(adjectiveTimerRef.current)
      }
    }
  }, [])

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
    <div className="flex flex-col items-end justify-center w-full h-dvh bg-black relative overflow-hidden">
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

      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col items-start z-10 gap-2 p-2 sm:p-4">
        <BadgesContainer size="small" />

        <p className="mt-auto bg-gradient-to-tl from-pink-800 to-white bg-clip-text text-transparent font-bold text-5xl md:text-7xl">
          Tumbuh
        </p>

        <p className="text-white/90 text-6xl md:text-9xl font-bold">
          Nature <span className="hidden md:inline">is</span>
        </p>
        <p className="text-white/90 text-6xl md:text-9xl font-bold block md:hidden">
          is
        </p>
        <p className="text-white/90 text-6xl md:text-9xl font-bold capitalize">
          {currentAdjective}.
        </p>
      </div>
    </div>
  )
}
