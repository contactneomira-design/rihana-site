import { notFound } from 'next/navigation'
import { cars, brandFull } from '@/lib/data'
import CarDetail from '@/components/CarDetail'
import Footer from '@/components/Footer'

// Pre-render a static page for every car at build time.
export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }))
}

export function generateMetadata({ params }) {
  const car = cars.find((c) => c.slug === params.slug)
  if (!car) return { title: `Fleet | ${brandFull}` }
  return {
    title: `${car.name} | ${brandFull}`,
    description: car.blurb,
  }
}

export default function CarDetailPage({ params }) {
  const car = cars.find((c) => c.slug === params.slug)
  if (!car) notFound()

  return (
    <main className="relative">
      <CarDetail car={car} />
      <Footer />
    </main>
  )
}
