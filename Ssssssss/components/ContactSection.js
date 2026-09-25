'use client'

import { ArrowUpRight, MapPin } from 'lucide-react'
import { whatsappLink, phoneNumberIntl, mapsLink } from '@/lib/data'
import { useLang } from '@/lib/i18n'

// Channels: WhatsApp, phone and the Marrakech location only.
export default function ContactSection() {
  const { t } = useLang()

  const channels = [
    { name: t('whatsapp'), value: phoneNumberIntl, href: whatsappLink, external: true, ltr: true },
    {
      name: t('phone'),
      value: phoneNumberIntl,
      href: `tel:${phoneNumberIntl.replace(/\s/g, '')}`,
      ltr: true,
    },
    { name: t('location'), value: null, href: mapsLink, external: true, icon: MapPin },
  ]

  const rowClass =
    'group flex min-h-[48px] items-center justify-between gap-4 sm:gap-6 py-6 sm:py-8'

  return (
    <section className="relative bg-night pt-32 sm:pt-44 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12">
      <h1 className="font-display text-5xl sm:text-8xl uppercase leading-none text-offwhite break-words">
        {t('contactTitle')}
      </h1>
      <p className="mt-6 max-w-md text-offwhite/60 font-light leading-relaxed">
        {t('contactSub')}
      </p>

      <ul className="mt-12 sm:mt-20 max-w-4xl border-t border-night-line">
        {channels.map((c) => (
          <li key={c.name} className="border-b border-night-line">
            {c.href ? (
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`${rowClass} focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-offwhite`}
              >
                <span className="flex items-center gap-4 font-display text-3xl sm:text-5xl uppercase text-offwhite group-hover:text-terracotta transition-colors duration-300">
                  {c.icon && <c.icon size={26} className="shrink-0 text-terracotta" />}
                  {c.name}
                </span>
                <span className="flex items-center gap-3 text-offwhite/60 group-hover:text-offwhite text-sm sm:text-base transition-colors duration-300">
                  <span dir={c.ltr ? 'ltr' : undefined}>{c.value}</span>
                  <ArrowUpRight size={18} className="shrink-0 rtl:-scale-x-100" />
                </span>
              </a>
            ) : (
              <div className={rowClass}>
                <span className="flex items-center gap-4 font-display text-3xl sm:text-5xl uppercase text-offwhite">
                  <MapPin size={26} className="shrink-0 text-terracotta" />
                  {c.name}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
