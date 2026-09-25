import Fleet from '@/components/Fleet'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'The Fleet | RIHANA DREAMS CARS',
  description: 'Eleven cars, three journeys — Family, Belbala & Atlas. Check availability and book your RIHANA DREAMS CARS vehicle.',
}

export default function FleetPage() {
  return (
    <main className="relative">
      <Fleet />
      <Footer />
    </main>
  )
}
