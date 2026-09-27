import tailwindcss from '@tailwindcss/vite'

const siteUrl =
  process.env.NUXT_PUBLIC_SITE_URL || 'https://portfolio-ibrahim-chi.vercel.app'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    'shadcn-nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

  site: {
    url: siteUrl,
    name: 'Ibrahim Marwan Ghaybour',
    description:
      'Front-End Web Developer specializing in Vue.js, Nuxt.js, and Tailwind CSS.',
    defaultLocale: 'en',
    trailingSlash: false,
  },

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'portfolio-theme-v2',
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'ar', language: 'ar-EG', name: 'العربية', dir: 'rtl', file: 'ar.json' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales',
    /** Locale URLs (/ and /ar) enable proper hreflang + sitemap for bilingual SEO */
    strategy: 'prefix_except_default',
    baseUrl: siteUrl,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'portfolio_lang',
      fallbackLocale: 'en',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },

  sitemap: {
    autoLastmod: true,
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Hreflangs', select: 'count(xhtml:link)', width: '25%' },
    ],
  },

  robots: {
    allow: ['/'],
    sitemap: `${siteUrl.replace(/\/$/, '')}/sitemap.xml`,
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#2a6b6f' },
        { name: 'color-scheme', content: 'dark light' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap',
        },
      ],
    },
  },

  image: {
    quality: 80,
    format: ['webp'],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/ar'],
    },
  },
})
