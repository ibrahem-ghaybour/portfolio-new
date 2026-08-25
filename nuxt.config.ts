import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['shadcn-nuxt', '@nuxt/image'],

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Ibrahim Marwan Ghaybour — Front-End Web Developer',
      meta: [
        {
          name: 'description',
          content:
            'Front-End Web Developer specializing in Vue.js, Nuxt.js, and Tailwind CSS. Building modern, responsive, and accessible web applications.',
        },
        { name: 'theme-color', content: '#2a6b6f' },
        { property: 'og:title', content: 'Ibrahim Marwan Ghaybour — Front-End Web Developer' },
        {
          property: 'og:description',
          content:
            'Front-End Web Developer specializing in Vue.js, Nuxt.js, and Tailwind CSS.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap',
        },
      ],
    },
  },

  image: {
    quality: 80,
    format: ['webp'],
  },
})
