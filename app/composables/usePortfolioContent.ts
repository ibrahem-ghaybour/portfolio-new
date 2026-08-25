import {
  contact,
  experienceMeta,
  navHrefs,
  projectMeta,
  skillTech,
} from '~/data/portfolio'
import type { ProjectItem, SkillGroup } from '~/types/portfolio'

export function usePortfolioContent() {
  const { t, tm, rt, locale } = useI18n()

  /** Resolve i18n array messages to plain strings (tm returns AST nodes). */
  function list(path: string): string[] {
    const raw = tm(path)
    if (!Array.isArray(raw)) return []
    return raw.map((item, index) => {
      if (typeof item === 'string') return item
      try {
        return rt(item as never)
      } catch {
        return t(`${path}.${index}`)
      }
    })
  }

  const personal = computed(() => ({
    fullName: t('personal.fullName'),
    title: t('personal.title'),
    location: t('personal.location'),
    tagline: t('personal.tagline'),
    summary: t('personal.summary'),
    about: [t('personal.about')],
    availability: t('personal.availability'),
    initials: contact.initials,
    email: contact.email,
    phone: contact.phone,
  }))

  const education = computed(() => ({
    degree: t('education.degree'),
    place: t('education.place'),
    note: t('education.note'),
  }))

  const languages = computed(() => [
    { name: t('languages.arabic'), level: t('languages.native') },
    { name: t('languages.english'), level: t('languages.intermediate') },
  ])

  const navLinks = computed(() =>
    navHrefs.map((item) => ({
      href: item.href,
      label: t(`nav.${item.key}`),
    })),
  )

  const skillGroups = computed<SkillGroup[]>(() => [
    { title: t('skillGroups.frontend'), skills: [...skillTech.frontend] },
    { title: t('skillGroups.backend'), skills: [...skillTech.backend] },
    { title: t('skillGroups.tools'), skills: [...skillTech.tools] },
    {
      title: t('skillGroups.soft'),
      skills: skillTech.softKeys.map((key) => t(`skillGroups.softItems.${key}`)),
    },
  ])

  const experience = computed(() =>
    experienceMeta.map((item) => ({
      company: item.company,
      position: t(`experienceItems.${item.id}.position`),
      duration: t(`experienceItems.${item.id}.duration`),
      description: list(`experienceItems.${item.id}.description`),
      technologies: item.technologies,
    })),
  )

  const projects = computed<ProjectItem[]>(() =>
    projectMeta.map((meta) => {
      const highlights = meta.highlightValues
        ? meta.highlightValues.map((h) => ({
            value: h.value,
            label: t(`projectItems.${meta.id}.highlights.${h.key}`),
          }))
        : undefined

      return {
        id: meta.id,
        number: meta.number,
        title: t(`projectItems.${meta.id}.title`),
        category: t(`projectItems.${meta.id}.category`),
        description: t(`projectItems.${meta.id}.description`),
        technologies: [...meta.technologies],
        image: meta.image,
        imageAlt: t(`projectItems.${meta.id}.imageAlt`),
        mobileImage: 'mobileImage' in meta ? meta.mobileImage : undefined,
        mobileImageAlt:
          'mobileImage' in meta && meta.mobileImage
            ? t(`projectItems.${meta.id}.mobileImageAlt`)
            : undefined,
        liveUrl: 'liveUrl' in meta ? meta.liveUrl : undefined,
        githubUrl: 'githubUrl' in meta ? meta.githubUrl : undefined,
        featured: 'featured' in meta ? meta.featured : undefined,
        layout: meta.layout,
        features: list(`projectItems.${meta.id}.features`),
        highlights,
      }
    }),
  )

  const isRtl = computed(() => locale.value === 'ar')

  return {
    personal,
    education,
    languages,
    navLinks,
    skillGroups,
    experience,
    projects,
    isRtl,
    contact,
  }
}
