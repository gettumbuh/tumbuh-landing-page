export default function ReplayTeaser({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="fixed top-0 right-4  md:right-20 px-2 py-1 bg-white rounded-b-lg z-[1000] cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      <span className="text-black font-bold text-sm">
        An Autonomous Garden?
      </span>
      <div className="z-[1000] bg-gradient-to-tl from-pink-800 to-white w-full h-full absolute top-0 left-0 opacity-100 group-hover:opacity-0 transition-opacity duration-600 flex items-center justify-center cursor-pointer">
        <span className="text-white font-bold text-sm">
          An Autonomous Garden?
        </span>
      </div>
    </div>
  )
}
