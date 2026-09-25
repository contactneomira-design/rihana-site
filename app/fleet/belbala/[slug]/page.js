import { notFound } from 'next/navigation'
import { cars, brandFull } from '@/lib/data'
import BelbalaCarDetail from '@/components/BelbalaCarDetail'
import Footer from '@/components/Footer'

// BELBALA is a fixed 3-car collection — only these slugs are valid here.
const ALLOWED_SLUGS = ['porsche-macan', 'vw-golf-r', 'peugeot-208']

export function generateStaticParams() {
  return ALLOWED_SLUGS.map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const car = cars.find((c) => c.slug === params.slug && ALLOWED_SLUGS.includes(c.slug))
  if (!car) return { title: `Belbala Collection | ${brandFull}` }
  return {
    title: `${car.name} — Belbala | ${brandFull}`,
    description: car.blurb,
  }
}

export default function BelbalaCarPage({ params }) {
  const car = cars.find(
    (c) => c.slug === params.slug && c.category === 'belbala' && ALLOWED_SLUGS.includes(c.slug)
  )
  if (!car) notFound()

  return (
    <main className="relative">
      <BelbalaCarDetail car={car} />
      <Footer />
    </main>
  )
}
