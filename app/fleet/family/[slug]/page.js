import { notFound } from 'next/navigation'
import { cars, brandFull } from '@/lib/data'
import FamilyCarDetail from '@/components/FamilyCarDetail'
import Footer from '@/components/Footer'

// FAMILY is a fixed 4-car collection — only these slugs are valid here.
const ALLOWED_SLUGS = ['dacia-jogger', 'dacia-logan-green', 'dacia-logan-blanc', 'renault-talian']

export function generateStaticParams() {
  return ALLOWED_SLUGS.map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const car = cars.find((c) => c.slug === params.slug && ALLOWED_SLUGS.includes(c.slug))
  if (!car) return { title: `Family Collection | ${brandFull}` }
  return {
    title: `${car.name} — Family | ${brandFull}`,
    description: car.blurb,
  }
}

export default function FamilyCarPage({ params }) {
  const car = cars.find(
    (c) => c.slug === params.slug && c.category === 'family' && ALLOWED_SLUGS.includes(c.slug)
  )
  if (!car) notFound()

  return (
    <main className="relative">
      <FamilyCarDetail car={car} />
      <Footer />
    </main>
  )
}
