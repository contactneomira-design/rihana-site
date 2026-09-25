import { notFound } from 'next/navigation'
import { cars, brandFull } from '@/lib/data'
import AtlasCarDetail from '@/components/AtlasCarDetail'
import Footer from '@/components/Footer'

// ATLAS is a fixed 4-car collection — only these slugs are valid here.
const ALLOWED_SLUGS = ['range-rover-evoque', 'vw-tiguan', 'hyundai-tucson', 'dacia-sandero-stepway']

export function generateStaticParams() {
  return ALLOWED_SLUGS.map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const car = cars.find((c) => c.slug === params.slug && ALLOWED_SLUGS.includes(c.slug))
  if (!car) return { title: `Atlas Collection | ${brandFull}` }
  return {
    title: `${car.name} — Atlas | ${brandFull}`,
    description: car.blurb,
  }
}

export default function AtlasCarPage({ params }) {
  const car = cars.find(
    (c) => c.slug === params.slug && c.category === 'atlas' && ALLOWED_SLUGS.includes(c.slug)
  )
  if (!car) notFound()

  return (
    <main className="relative">
      <AtlasCarDetail car={car} />
      <Footer />
    </main>
  )
}
