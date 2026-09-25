'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { cars as staticCars, categories } from '@/lib/data'
import { useLang } from '@/lib/i18n'
import CarCard from './CarCard'
import BookingModal from './BookingModal'

const slugify = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// Database rows have no slug or blurb: reuse the ones from lib/data when the
// car name matches, so detail links and translated blurbs keep working.
function withSlug(car) {
  const match = staticCars.find((c) => c.name.toLowerCase() === car.name.toLowerCase())
  return { ...car, slug: match?.slug ?? slugify(car.name), blurb: match?.blurb ?? '' }
}

export default function Fleet() {
  const [filter, setFilter] = useState('all')
  const [bookingCar, setBookingCar] = useState(null)
  // Starts with the static list (instant first paint) and is replaced by the
  // API result; if the request fails, the static list stays.
  const [cars, setCars] = useState(staticCars)
  const { t } = useLang()

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/cars', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`GET /api/cars failed (${res.status})`)
        return res.json()
      })
      .then((data) => setCars(data.map(withSlug)))
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err)
      })

    return () => controller.abort()
  }, [])

  const filtered = filter === 'all' ? cars : cars.filter((c) => c.category === filter)

  const filterLabel = (id) => (id === 'all' ? t('all') : t(id))

  return (
    <section id="fleet" className="relative bg-night py-20 sm:py-32 px-5 sm:px-8 lg:px-12">
      {/* Anchor targets for hero category links */}
      <span id="fleet-family" className="absolute -top-20" />
      <span id="fleet-belbala" className="absolute -top-20" />
      <span id="fleet-atlas" className="absolute -top-20" />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <p className="text-terracotta text-xs tracking-widest2 uppercase font-semibold mb-3">
            {t('fleetCount')}
          </p>
          <h2 className="font-display text-[13vw] sm:text-[6vw] lg:text-[5vw] leading-[0.9] uppercase">
            {t('fleetTitle')}
          </h2>
          <p className="text-offwhite/50 text-sm sm:text-base mt-3 max-w-md font-light">
            {t('fleetSub')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2" role="group">
          {['all', ...categories.map((c) => c.id)].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
              className={`min-h-[48px] min-w-[48px] px-4 py-2.5 text-[11px] tracking-widest2 uppercase font-semibold border transition-all duration-300 ${
                filter === id
                  ? 'bg-terracotta text-night border-terracotta'
                  : 'border-offwhite/25 text-offwhite/70 hover:border-offwhite/60 hover:text-offwhite'
              }`}
            >
              {filterLabel(id)}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive grid: 1 column on phones, 2 on tablets, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        <AnimatePresence mode="popLayout">
          {filtered.map((car, i) => (
            <CarCard key={car.slug} car={car} index={i} onBook={setBookingCar} />
          ))}
        </AnimatePresence>
      </div>

      <BookingModal car={bookingCar} onClose={() => setBookingCar(null)} />
    </section>
  )
}
