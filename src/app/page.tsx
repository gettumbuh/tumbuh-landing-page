import FlowerBg from '../components/flower/flowerBg'
import VideoSection from '../components/video/videoSection'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-black">
      <FlowerBg />
      <VideoSection />
    </div>
  )
}
