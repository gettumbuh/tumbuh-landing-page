import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-black">
      <div className="flex flex-col items-end justify-center w-full h-dvh bg-black relative overflow-hidden">
        <div className="relative h-full w-full max-w-[500px]">
          <Image
            src="/images/flower.jpg"
            alt="logo"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col items-start z-10 gap-2 p-2 sm:p-4">
        <p className="mt-auto bg-gradient-to-tl from-pink-800 to-white bg-clip-text text-transparent font-bold text-5xl md:text-7xl">
          Tumbuh
        </p>

        <p className="mb-auto text-white font-bold text-5xl md:text-7xl">
          This page doesn&apos;t exist yet.
        </p>
      </div>
    </div>
  )
}
