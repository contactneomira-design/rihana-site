import Hero from '@/components/Hero'
import BrandsMarquee from '@/components/BrandsMarquee'
import Footer from '@/components/Footer'

// Homepage stays intentionally minimal: full-screen video hero with the
// 3 trip categories only. Everything else is reachable through the header's
// main navigation (/fleet, /experience, "Pourquoi nous" and /contact) — this
// keeps the first page light and cinematic instead of a long scroll.
export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <BrandsMarquee />
      <Footer />
    </main>
  )
}
