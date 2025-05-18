'use client'

import { useEffect, useRef, useState } from 'react'
import BadgesContainer from '../badges/badgesContainer'

// Timing constants (in milliseconds)
const MAIN_ADJECTIVE_DURATION = 4000 // 4 seconds
const SECONDARY_ADJECTIVE_DURATION = 80 // 1 second

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

export default function Hero() {
  const [currentAdjective, setCurrentAdjective] = useState(MAIN_ADJECTIVES[0])
  const [showMainAdjective, setShowMainAdjective] = useState(true)

  const mainAdjectiveIndexRef = useRef(0)
  const secondaryAdjectiveIndexRef = useRef(0)
  const adjectiveTimerRef = useRef<NodeJS.Timeout | null>(null)

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

  return (
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
  )
}
