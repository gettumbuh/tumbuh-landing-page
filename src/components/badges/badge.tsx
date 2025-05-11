import Image from 'next/image'

export default function Badge({
  href,
  title,
  icon,
  color,
  textColor,
  status,
  size,
}: {
  href: string
  title?: string
  icon?: string
  color: string
  textColor: string
  status: string
  size: 'small' | 'large'
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-fit flex items-center border border-white/25 rounded-sm overflow-hidden cursor-pointer hover:border-white/40 transition-all duration-300 ${
        href === '#' ? 'pointer-events-none' : ''
      }`}
    >
      <div
        className={`font-bold h-full flex items-center justify-center ${
          size === 'large' ? 'text-lg px-2 py-1' : 'text-base px-1 py-0.5'
        }`}
        style={{ backgroundColor: color, color: textColor }}
      >
        {title}
        {icon && <Image src={icon} alt="icon" width={20} height={20} />}
      </div>
      <div
        className={`text-white font-semibold bg-white/20 h-full flex items-center justify-center ${
          size === 'large' ? 'text-lg px-2 py-1' : 'text-base px-1 py-0.5'
        }`}
      >
        {status}
      </div>
    </a>
  )
}
