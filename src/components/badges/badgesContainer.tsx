import Badge from './badge'

export default function BadgesContainer() {
  return (
    <div className="flex gap-2 flex-wrap max-w-md flex-col md:flex-row">
      <Badge
        title="H2O Zero-Day Mint"
        textColor="black"
        color="#0CABA8"
        status="Starts in 3d"
      />
      <Badge
        title="Genesis"
        color="#97FFB1"
        textColor="black"
        status="Coming soon"
      />
    </div>
  )
}
