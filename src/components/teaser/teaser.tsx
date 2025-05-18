'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface OnceFunction {
  (
    el: Element,
    event: string,
    fn: (e: Event) => void,
    opts?: AddEventListenerOptions
  ): void
}

const videoSrc = {
  firefox: './videos/firefox.mp4',
  other: './videos/plant.mp4',
  // 'other': 'ios_compatible.mp4'
}

const VideoScroll: React.FC<{
  onComplete: () => void
}> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [src, setSrc] = useState<string | null>(null)
  const [displayProgress, setDisplayProgress] = useState(0)

  const [isVideoLoading, setIsVideoLoading] = useState(true)

  useEffect(() => {
    const browser = navigator.userAgent
    const isFirefox = browser.includes('Firefox')
    const src = isFirefox ? videoSrc.firefox : videoSrc.other

    setSrc(src)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const src = video.currentSrc || video.src
    let frameNumber = 0

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: '+=600%',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          frameNumber = (self.progress / 10) * 150 - 1
          video.currentTime = frameNumber

          setDisplayProgress(() => {
            const screenProgress = self.progress * 100
            if (screenProgress < 75) {
              return 0
            }
            localStorage.setItem('isTeaserCompleted', 'true')
            return ((screenProgress - 75) * 2) / 25
          })
        },
      },
    })

    const once: OnceFunction = (el, event, fn, opts) => {
      const onceFn = function (e: Event) {
        el.removeEventListener(event, onceFn)
        fn.call(el, e)
      }
      el.addEventListener(event, onceFn, opts)
    }

    // Activate video on iOS
    once(
      document.documentElement,
      'load',
      () => {
        setIsVideoLoading(false)

        video.play()
        video.pause()
      },
      { once: true }
    )

    // Wait for video metadata to load
    once(
      video,
      'loadedmetadata',
      () => {
        setIsVideoLoading(false)
        timeline.fromTo(
          video,
          { currentTime: 0 },
          { currentTime: video.duration - 0.1 }
        )
        video.pause()
      },
      { once: true }
    )

    // Fetch and blob the video
    setTimeout(() => {
      fetch(src)
        .then((res) => res.blob())
        .then((blob) => {
          const blobURL = URL.createObjectURL(blob)
          const t = video.currentTime

          once(
            document.documentElement,
            'touchstart',
            () => {
              video.setAttribute('src', blobURL)
              video.currentTime = t + 0.01
            },
            { once: true }
          )
        })
    }, 0)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    video.pause()
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
    setIsVideoLoading(false)
  }, [])

  return (
    <div>
      <div
        className={`text-white w-screen h-screen bg-black z-50 absolute top-0 left-0 flex items-center justify-center ${
          !isVideoLoading ? 'opacity-0 fade-out' : 'opacity-100'
        }`}
      >
        <Loader2 className="w-6 h-6 animate-spin opacity-80" />
      </div>

      <div
        ref={containerRef}
        className="video-container w-full min-h-screen h-full overflow-hidden relative overscroll-none flex bg-black"
      >
        <div className="w-0 h-0 opacity-0">{src}</div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-[960px] mr-4 md:mr-64 min-w-[600px]">
            <video
              ref={videoRef}
              className="video-scroll w-full object-cover relative left-0"
              playsInline
              preload="auto"
              muted
              autoPlay
              src={src ?? videoSrc.other}
              onLoadedData={() => {
                console.log('loaded')
                setIsVideoLoading(false)
              }}
            >
              {/* {src && <source src={src} type="video/mp4" />} */}
            </video>
          </div>
        </div>
      </div>
      <div className="absolute top-0 w-screen h-full flex items-center justify-center z-10">
        <div className="relative w-full max-w-screen md:max-w-[960px] ml-4 md:ml-64 h-full">
          <div className="text-right min-h-full flex flex-col justify-center">
            <p className="text-white md:text-9xl text-7xl font-bold mix-blend-difference px-4">
              This plant <br /> earns more <br /> than you.
            </p>
          </div>
          <div className="text-right min-h-full flex flex-col justify-center">
            <p className="text-white md:text-[7rem] md:leading-[7rem] text-[4rem] leading-[4rem] font-bold mix-blend-difference px-4">
              We gave it <br className="hidden md:block" /> a wallet,{' '}
              <br className="hidden md:block" /> and it has{' '}
              <br className="hidden md:block" /> not stopped growing.
            </p>
          </div>
          {[
            {
              text: 'Autonomy lets you stop competing <br /> with others.',
              size: '7',
              mobileSize: '4',
            },
            {
              text: 'With a wallet, <br /> you can create <br /> the right incentives.',
              size: '7',
              mobileSize: '4',
            },
            {
              text: 'To grow. <br /> Unbound. <br /> Forever.',
              size: '7',
              mobileSize: '4',
            },
          ].map(({ text, size, mobileSize }, index) => (
            <div
              key={index}
              className="text-right min-h-full flex flex-col justify-center text-shadow-black/15 text-shadow-md"
            >
              <p
                className={`text-white md:text-[${size}rem] md:leading-[${size}rem] text-[${mobileSize}rem] leading-[${mobileSize}rem] font-bold mix-blend-difference px-4`}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
          ))}
        </div>

        <div
          className="fixed top-0 w-full h-full flex flex-col items-center justify-start z-40 bg-black text-white"
          style={{
            opacity: displayProgress,
            pointerEvents: displayProgress < 1 ? 'none' : 'auto',
          }}
        >
          <p className="mt-auto bg-gradient-to-tl from-pink-800 to-white bg-clip-text text-transparent font-bold text-5xl md:text-7xl">
            Tumbuh
          </p>
          <p className="text-white/80 text-base">
            The world&apos;s first autonomous garden
          </p>

          <p className="text-white text-2xl max-w-[720px] text-center my-12">
            Become a part of humanity&apos;s final epic of survival and growth,
            <br />
            Earn rewards and grow your wealth along with the network.
          </p>

          <div className="flex items-center gap-2 flex-col px-4">
            <p className="text-white">Do not miss out on our first Airdrop.</p>
            <a
              href={'https://x.com/gettumbuh'}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-fit flex items-center border border-black/25 rounded-md overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-300`}
            >
              <div
                className={`font-bold flex items-center justify-center text-lg px-4 py-3 h-full`}
                style={{ backgroundColor: '#14171A', color: 'white' }}
              >
                <Image src="./twitter.svg" alt="icon" width={20} height={20} />
              </div>
              <div
                className={`text-white font-semibold bg-white/20 h-full flex items-center justify-center text-lg px-4 py-2`}
              >
                Follow For Updates
              </div>
            </a>
          </div>

          <p
            onClick={onComplete}
            className="mt-auto text-white mb-4 underline opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer"
          >
            Go to Main Site
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoScroll
