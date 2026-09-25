import CollectionPage from '@/components/CollectionPage'
import Footer from '@/components/Footer'
import { brandFull } from '@/lib/data'

export const metadata = {
  title: `Family Collection | ${brandFull}`,
  description: 'The Family collection — Dacia Jogger, Dacia Logan Green, Dacia Logan Blanc, Renault Taliant.',
}

// FAMILY is a curated collection — only these slugs belong to it.
const ALLOWED_SLUGS = ['dacia-jogger', 'dacia-logan-green', 'dacia-logan-blanc', 'renault-talian']

export default function FamilyPage() {
  return (
    <main className="relative">
      <CollectionPage category="family" slugs={ALLOWED_SLUGS} />
      <Footer />
    </main>
  )
}
