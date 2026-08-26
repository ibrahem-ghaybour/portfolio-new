import type { ProjectLayout } from '~/types/portfolio'

/** Non-translated structural project data (images, links, tech, layout). */
export const projectMeta = [
  {
    id: 'hectar-plus',
    number: '01',
    technologies: [] as string[],
    image: '/projects/hectar-plus.webp',
    liveUrl: 'https://hectarplus.com/',
    featured: true,
    layout: 'featured' as ProjectLayout,
    highlightValues: null,
  },
  {
    id: 'curva',
    number: '02',
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/curva.webp',
    mobileImage: '/projects/curva-mobile.webp',
    liveUrl: 'https://curvaegypt.com',
    featured: true,
    layout: 'split-right' as ProjectLayout,
    highlightValues: null,
  },
  {
    id: 'european-market',
    number: '03',
    technologies: [] as string[],
    image: '/projects/european-market.webp',
    liveUrl: 'https://egdt2959-1.ezeestock.com/',
    featured: true,
    layout: 'split-left' as ProjectLayout,
    highlightValues: null,
  },
  {
    id: 'user-management',
    number: '04',
    technologies: ['Vue 3', 'Nuxt', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Vue I18n'],
    image: '/projects/user-dashboard.webp',
    liveUrl: undefined,
    githubUrl:
      'https://github.com/ibrahem-ghaybour/user-management-dashboard-vue-3-assessment',
    featured: true,
    layout: 'stacked' as ProjectLayout,
    highlightValues: [
      { value: '50+', key: 'users' },
      { value: '3', key: 'languages' },
      { value: 'RBAC', key: 'permissions' },
    ],
  },
  {
    id: 'dashboard',
    number: '05',
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
    layout: 'split-left' as ProjectLayout,
    highlightValues: null,
  },
  {
    id: 'deliver',
    number: '06',
    technologies: ['TypeScript', 'Vite', 'Bootstrap', 'GSAP', 'Sass'],
    image: '/projects/deliver.webp',
    liveUrl: 'https://ibrahem-ghaybour.github.io/deliver/',
    githubUrl: 'https://github.com/ibrahem-ghaybour/deliver',
    layout: 'media-first' as ProjectLayout,
    highlightValues: null,
  },
  {
    id: 'pos',
    number: '07',
    technologies: [] as string[],
    image: '/projects/pos.webp',
    layout: 'stacked' as ProjectLayout,
    highlightValues: null,
  },
] as const

export const experienceMeta = [
  {
    id: 'tebalink',
    company: 'Teba Link',
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
  cvUrl: '/cv/ibrahim-marwan-ghaybour.pdf',
  cvFileName: 'Ibrahim-Marwan-Ghaybour-CV.pdf',
}

export const navHrefs = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
] as const
