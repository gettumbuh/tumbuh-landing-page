import Badge from './badge'

export default function BadgesContainer({ size }: { size: 'small' | 'large' }) {
  return (
    <div className={`flex gap-2 flex-wrap ${size === 'large' ? 'max-w-3xl' : 'max-w-md'} flex-col md:flex-row`}>
      <Badge
        title="H2O Zero-Day Mint"
        textColor="black"
        color="#0CABA8"
        status="Starts in 3d"
        size={size}
        href="/zero-day-mint"
      />
      <Badge
        title="Genesis"
        color="#97FFB1"
        textColor="black"
        status="Coming soon"
        size={size}
        href="#"
      />
      <Badge
        icon="/twitter.svg"
        color="#14171A"
        textColor="white"
        status="Follow for updates"
        size={size}
        href="https://x.com/gettumbuh"
      />
    </div>
  )
}
