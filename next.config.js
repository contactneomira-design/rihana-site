/** @type {import('next').NextConfig} */
const ARTICLE = '/blog/pourquoi-choisir-rihana-car'

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/blog', destination: ARTICLE, permanent: false },
      { source: '/why-rihana', destination: ARTICLE, permanent: false },
      { source: '/blog/visiter-marrakech-en-voiture', destination: ARTICLE, permanent: false },
      { source: '/blog/traversee-atlas-en-voiture', destination: ARTICLE, permanent: false },
      { source: '/blog/marrakech-nuit-et-loisirs-en-voiture', destination: ARTICLE, permanent: false },
      { source: '/why-rahana', destination: ARTICLE, permanent: true },
    ]
  },
}

module.exports = nextConfig
