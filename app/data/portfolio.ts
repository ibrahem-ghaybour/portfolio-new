import type { ProjectLayout } from '~/types/portfolio'

/** Non-translated structural project data (images, links, tech, layout). */
export const projectMeta = [
  {
    id: 'curva',
    number: '01',
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/curva.webp',
    mobileImage: '/projects/curva-mobile.webp',
    liveUrl: 'https://curvaegypt.com',
    featured: true,
    layout: 'featured' as ProjectLayout,
    highlightValues: null,
  },
  {
    id: 'user-management',
    number: '02',
    technologies: ['Vue 3', 'Nuxt', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Vue I18n'],
    image: '/projects/user-dashboard.webp',
    liveUrl: undefined,
    githubUrl:
      'https://github.com/ibrahem-ghaybour/user-management-dashboard-vue-3-assessment',
    featured: true,
    layout: 'split-right' as ProjectLayout,
    highlightValues: [
      { value: '50+', key: 'users' },
      { value: '3', key: 'languages' },
      { value: 'RBAC', key: 'permissions' },
    ],
  },
  {
    id: 'dashboard',
    number: '03',
    technologies: [
      'Vue 3',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Pinia',
      'Reka UI',
      'TanStack Table',
      'Unovis',
    ],
    image: '/projects/dashboard.webp',
    githubUrl: 'https://github.com/ibrahem-ghaybour/my-dashpoard-app',
    layout: 'stacked' as ProjectLayout,
    highlightValues: null,
  },
  {
    id: 'deliver',
    number: '04',
    technologies: ['TypeScript', 'Vite', 'Bootstrap', 'GSAP', 'Sass'],
    image: '/projects/deliver.webp',
    liveUrl: 'https://ibrahem-ghaybour.github.io/deliver/',
    githubUrl: 'https://github.com/ibrahem-ghaybour/deliver',
    layout: 'split-left' as ProjectLayout,
    highlightValues: null,
  },
  {
    id: 'pos',
    number: '05',
    technologies: [] as string[],
    image: '/projects/pos.webp',
    layout: 'media-first' as ProjectLayout,
    highlightValues: null,
  },
] as const

export const experienceMeta = [
  {
    id: 'tebalink',
    company: 'TebaLink',
    technologies: undefined as string[] | undefined,
  },
  {
    id: 'freelance',
    company: 'Freelance',
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Pinia'],
  },
  {
    id: 'genwin',
    company: 'Genwin',
    technologies: ['Vue.js', 'Nuxt.js', 'JavaScript', 'Tailwind CSS'],
  },
] as const

export const skillTech = {
  frontend: [
    'JavaScript (ES6+)',
    'TypeScript',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Bootstrap',
    'Vue.js',
    'Nuxt.js',
    'VueUse',
    'Vuex',
    'Pinia',
    'ShadcnVue',
    'GSAP.js',
  ],
  backend: ['NestJS', 'Mongoose', 'REST APIs'],
  tools: ['Git', 'GitHub', 'NPM', 'Webpack', 'Figma'],
  softKeys: [
    'problemSolving',
    'collaboration',
    'timeManagement',
    'adaptability',
  ] as const,
}

export const contact = {
  email: 'ebrahimghaibour65@gmail.com',
  phone: '+201122625805',
  initials: 'IG',
}

export const navHrefs = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
] as const
