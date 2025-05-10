'use client'
import { useScroll, useTransform, motion } from 'motion/react'
import { useEffect, useState } from 'react'

export default function VideoSection() {
  const { scrollYProgress } = useScroll()

  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
    }
  }, [])

  // Transform height from 300px to 150px based on scroll progress
  const height = useTransform(scrollYProgress, [0, 1], [600, 300])
  const mobileHeight = useTransform(scrollYProgress, [0, 1], [300, 150])

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

      <div className="w-full max-w-3xl space-y-8 text-white px-4 mt-12">
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
          felis eget urna ultricies aliquet.
        </p>
        <p className="text-lg">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Sed at magna euismod, fermentum nisi et,
          aliquam eros.
        </p>
        <p className="text-lg">
          Donec vitae justo vel nisl varius eleifend. Mauris porttitor, nisi vel
          feugiat fringilla, nulla lacus aliquam nisl, vel fringilla nunc nisi
          vel mi.
        </p>
      </div>
    </div>
  )
}
