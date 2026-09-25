import CollectionPage from '@/components/CollectionPage'
import Footer from '@/components/Footer'
import { brandFull } from '@/lib/data'

export const metadata = {
  title: `Belbala Collection | ${brandFull}`,
  description: 'The Belbala collection — Porsche Macan, Volkswagen Golf R, Peugeot 208.',
}

// BELBALA is a curated collection — only these slugs belong to it.
const ALLOWED_SLUGS = ['porsche-macan', 'vw-golf-r', 'peugeot-208']

export default function BelbalaPage() {
  return (
    <main className="relative">
      <CollectionPage category="belbala" slugs={ALLOWED_SLUGS} />
      <Footer />
    </main>
  )
}
