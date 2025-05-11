export default function Footer() {
  return (
    <div className="mt-20 mb-12 flex items-center justify-center text-white/50 gap-4 md:gap-8">
      <a
        href="https://docs.gettumbuh.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/50 hover:text-white transition-all duration-300"
      >
        Docs
      </a>
      <div className="h-4 w-px bg-white/30"></div>
      <a
        href="https://gettumbuh.com/terms-of-service"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/50 hover:text-white transition-all duration-300"
      >
        Terms
      </a>
      <div className="h-4 w-px bg-white/30"></div>
      <a
        className="text-white/50 hover:text-white transition-all duration-300 cursor-pointer"
        onClick={() => {
          // create a new a tag for the credits video
          const video = document.createElement('a')
          video.href = 'https://www.vecteezy.com/free-videos/rain-forest-loop'
          video.target = '_blank'
          video.rel = 'noopener noreferrer'
          video.click()

          //create a new tag for image
          const image = document.createElement('a')
          image.href =
            'https://unsplash.com/photos/pink-and-white-flowers-in-black-background-1Bk9ufEkS2A?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash'
          image.target = '_blank'
          image.rel = 'noopener noreferrer'
          image.click()
        }}
      >
        Credits
      </a>
    </div>
  )
}
