'use client'
import { useScroll, useTransform, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import BadgesContainer from '../badges/badgesContainer'
import Footer from '../footer/footer'

export default function VideoSection() {
  const { scrollYProgress } = useScroll()

  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
    }
  }, [])

  // Transform height from 300px to 150px based on scroll progress
  const height = useTransform(scrollYProgress, [0, 1], [600, 150])
  const mobileHeight = useTransform(scrollYProgress, [0, 1], [600, 150])

  return (
    <div className="w-full min-h-dvh flex flex-col items-center justify-start">
      <motion.div
        className="w-full flex items-center justify-center"
        style={{ height: windowWidth < 768 ? mobileHeight : height }}
      >
        <video
          src="/videos/cropped.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          playsInline
        >
          <source src="/videos/cropped.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="w-full max-w-3xl space-y-8 text-white px-4 py-16">
        {[
          `Tumbuh is the world's first truly autonomous garden.`,
          `It is the largest collaboration between humans and agents to date, forming a massive, 
          self-sustaining autonomous ecosystem with the ability to make decisions that create 
          physical and economic networks ensuring equal growth for all participants.`,
          `Starting as a permissionless garden, Tumbuh will evolve into a vast forest spanning 
          the entire planet as it optimizes and creates new crypto-economic incentive structures 
          that power the world's networks of essential resources. Through global coordination, 
          it will ensure each participant has equal access to a growing number of essential resources.`,
          `Traditionally, both agents and humans had to trade user experience for security and autonomy 
          in their on-chain activities. Join Tumbuh to experience infinite walletless on-chain growth 
          as we redefine nature as one big ecosystem of mutual prosperity.`,
          `Become a part of humanity's final epic of survival and growth.`,
        ].map((text, index) => (
          <Text key={index} text={text} />
        ))}
        <BadgesContainer size="large" />
      </div>

      <Footer />
    </div>
  )
}

function Text({ text }: { text: string }) {
  return <p className="text-lg">{text}</p>
}
