import { contact, projectMeta } from '~/data/portfolio'
import {
  DEFAULT_OG_IMAGE,
  GITHUB_URL,
  normalizeSiteUrl,
  SITE_NAME,
  toAbsoluteUrl,
} from '~/utils/site'

/**
 * Full-page SEO: meta, Open Graph, Twitter, hreflang, JSON-LD.
 */
export function useSiteSeo() {
  const { t, locale } = useI18n()
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  const siteUrl = computed(() =>
    normalizeSiteUrl(runtimeConfig.public.siteUrl as string | undefined),
  )
  const pageUrl = computed(() =>
    toAbsoluteUrl(siteUrl.value, route.path === '' ? '/' : route.path),
  )
  const ogImage = computed(() => toAbsoluteUrl(siteUrl.value, DEFAULT_OG_IMAGE))
  const htmlDir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))
  const ogLocale = computed(() => (locale.value === 'ar' ? 'ar_EG' : 'en_US'))

  const title = computed(() => t('meta.title'))
  const description = computed(() => t('meta.description'))
  const keywords = computed(() => t('meta.keywords'))

  const i18nHead = useLocaleHead({
    dir: true,
    lang: true,
    seo: true,
  })

  useSeoMeta({
    title: () => title.value,
    description: () => description.value,
    keywords: () => keywords.value,
    author: SITE_NAME,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    googlebot: 'index, follow',
    creator: SITE_NAME,
    ogType: 'website',
    ogSiteName: SITE_NAME,
    ogTitle: () => title.value,
    ogDescription: () => description.value,
    ogUrl: () => pageUrl.value,
    ogImage: () => ogImage.value,
    ogImageSecureUrl: () => ogImage.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: () => t('meta.ogImageAlt'),
    ogLocale: () => ogLocale.value,
    twitterCard: 'summary_large_image',
    twitterTitle: () => title.value,
    twitterDescription: () => description.value,
    twitterImage: () => ogImage.value,
    twitterImageAlt: () => t('meta.ogImageAlt'),
  })

  useHead(() => {
    const localeLinks = (i18nHead.value.link || []).filter(
      (link) => link.rel === 'alternate' || link.rel === 'canonical',
    )

    const projectNames = projectMeta.map((project) =>
      t(`projectItems.${project.id}.title`),
    )

    return {
      title: title.value,
      titleTemplate: '%s',
      htmlAttrs: {
        lang: i18nHead.value.htmlAttrs?.lang || locale.value,
        dir: htmlDir.value,
      },
      link: [
        { rel: 'canonical', href: pageUrl.value },
        ...localeLinks,
        { rel: 'image_src', href: ogImage.value },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'application-name', content: SITE_NAME },
        { name: 'apple-mobile-web-app-title', content: SITE_NAME },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#2a6b6f' },
        { name: 'geo.region', content: 'EG' },
        { name: 'geo.placename', content: '10th of Ramadan City' },
        {
          property: 'og:locale:alternate',
          content: locale.value === 'ar' ? 'en_US' : 'ar_EG',
        },
      ],
      script: [
        {
          key: 'ld-json-portfolio',
          type: 'application/ld+json',
          innerHTML: JSON.stringify(
            buildJsonLd({
              locale: locale.value,
              title: title.value,
              description: description.value,
              pageUrl: pageUrl.value,
              siteUrl: siteUrl.value,
              ogImage: ogImage.value,
              jobTitle: t('personal.title'),
              projectNames,
            }),
          ),
        },
      ],
    }
  })
}

function buildJsonLd(input: {
  locale: string
  title: string
  description: string
  pageUrl: string
  siteUrl: string
  ogImage: string
  jobTitle: string
  projectNames: string[]
}) {
  const projects = projectMeta.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: input.projectNames[index] || project.id,
    url:
      project.liveUrl
      || ('githubUrl' in project ? project.githubUrl : undefined)
      || `${input.pageUrl}#project-${project.id}`,
  }))

  const personId = `${input.siteUrl}/#person`
  const websiteId = `${input.siteUrl}/#website`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: input.siteUrl,
        name: SITE_NAME,
        description: input.description,
        inLanguage: ['en', 'ar'],
        publisher: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE_NAME,
        alternateName: 'إبراهيم مروان غيبور',
        url: input.siteUrl,
        image: input.ogImage,
        jobTitle: input.jobTitle,
        email: `mailto:${contact.email}`,
        telephone: contact.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: '10th of Ramadan City',
          addressCountry: 'EG',
        },
        knowsLanguage: ['ar', 'en'],
        knowsAbout: [
          'Vue.js',
          'Nuxt.js',
          'TypeScript',
          'Tailwind CSS',
          'Front-End Development',
          'Web Performance',
          'SEO',
        ],
        sameAs: [GITHUB_URL],
        description: input.description,
      },
      {
        '@type': 'ProfilePage',
        '@id': `${input.pageUrl}#profile`,
        url: input.pageUrl,
        name: input.title,
        description: input.description,
        inLanguage: input.locale === 'ar' ? 'ar' : 'en',
        mainEntity: { '@id': personId },
        isPartOf: { '@id': websiteId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: input.ogImage,
          width: 1200,
          height: 630,
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${input.siteUrl}/#projects`,
        name: 'Selected projects',
        numberOfItems: projects.length,
        itemListElement: projects,
      },
    ],
  }
}
