export default function Badge({
  title,
  color,
  textColor,
  status,
}: {
  title: string
  color: string
  textColor: string
  status: string
}) {
  return (
    <div className="w-fit flex items-center border border-white/25 rounded-sm overflow-hidden cursor-pointer hover:border-white/40 transition-all duration-300">
      <div
        className={`text-${textColor} text-sm px-1 font-bold h-full flex items-center justify-center`}
        style={{ backgroundColor: color }}
      >
        {title}
      </div>
      <div className="text-white text-xs font-semibold px-1 bg-white/20 h-full flex items-center justify-center">
        {status}
      </div>
    </div>
  )
}
