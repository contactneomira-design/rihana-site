import CollectionPage from '@/components/CollectionPage'
import Footer from '@/components/Footer'
import { brandFull } from '@/lib/data'

export const metadata = {
  title: `Atlas Collection | ${brandFull}`,
  description: 'The Atlas collection — Range Rover Evoque, Volkswagen Tiguan, Hyundai Tucson, Dacia Sandero Stepway.',
}

// ATLAS is a curated collection — only these slugs belong to it.
const ALLOWED_SLUGS = ['range-rover-evoque', 'vw-tiguan', 'hyundai-tucson', 'dacia-sandero-stepway']

export default function AtlasPage() {
  return (
    <main className="relative">
      <CollectionPage category="atlas" slugs={ALLOWED_SLUGS} />
      <Footer />
    </main>
  )
}
