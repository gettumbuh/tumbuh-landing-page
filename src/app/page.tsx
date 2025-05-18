'use client'

import Hero from '@/components/hero/hero'
import FlowerBg from '../components/flower/flowerBg'
import VideoSection from '../components/video/videoSection'
import { useEffect, useState } from 'react'
import ReplayTeaser from '@/components/floatingButton/replayTeaser'
import Teaser from '@/components/teaser/teaser'
export default function Home() {
  const [loading, setLoading] = useState(true)
  const [isTeaserCompleted, setIsTeaserCompleted] = useState(true)

  useEffect(() => {
    const isTeaserCompleted = localStorage.getItem('isTeaserCompleted')
    if (!isTeaserCompleted) {
      setIsTeaserCompleted(false)
    }
    setTimeout(() => {
      window.scrollTo(0, 0)
      setLoading(false)
    }, 200)
  }, [])

  if (!isTeaserCompleted) {
    return (
      <Teaser
        onComplete={() => {
          localStorage.setItem('isTeaserCompleted', 'true')
          setTimeout(() => {
            window.scrollTo(0, 0)
            setIsTeaserCompleted(true)
          }, 200)
        }}
      />
    )
  }

  return (
    <>
      <div
        className={`text-white w-screen h-screen bg-black z-[5000] absolute top-0 left-0 flex items-center justify-center ${
          !loading ? 'opacity-0 fade-out pointer-events-none' : 'opacity-100'
        }`}
      />

      <ReplayTeaser
        onClick={() => {
          setIsTeaserCompleted(false)
          localStorage.removeItem('isTeaserCompleted')
        }}
      />

      <div className="flex flex-col items-center justify-center min-h-dvh bg-black">
        <div className="flex flex-col items-end justify-center w-full h-dvh bg-black relative overflow-hidden">
          <FlowerBg />
          <Hero />
        </div>

        <VideoSection />
      </div>
    </>
  )
}
