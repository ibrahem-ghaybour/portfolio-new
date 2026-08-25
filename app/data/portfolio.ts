import type {
  ExperienceItem,
  LanguageItem,
  PersonalInfo,
  ProjectItem,
  SkillGroup,
  SocialLink,
} from '~/types/portfolio'

export const personal: PersonalInfo = {
  fullName: 'Ibrahim Marwan Ghaybour',
  firstName: 'Ibrahim',
  lastName: 'Ghaybour',
  initials: 'IG',
  title: 'Front-End Web Developer',
  location: 'Egypt, 10th of Ramadan',
  email: 'ebrahimghaibour65@gmail.com',
  phone: '+201122625805',
  tagline:
    'Building modern, responsive, and accessible web applications with Vue & Nuxt.',
  summary:
    'Passionate Front-End Developer with 3+ years of experience building modern, responsive, and user-friendly web applications. Specialized in Vue.js, Nuxt.js, and Tailwind CSS, with strong knowledge in performance optimization, accessibility, and SEO. Basic experience with NestJS and Mongoose enables contribution to full-stack applications when needed.',
  about: [
    'Skilled at collaborating with cross-functional teams and delivering high-quality projects. Currently seeking remote or on-site front-end roles on innovative products.',
  ],
  availability:
    'Looking for opportunities to join innovative teams and contribute to high-impact projects.',
}

export const socialLinks: SocialLink[] = [
  {
    label: 'Email',
    href: `mailto:${personal.email}`,
    icon: 'mail',
  },
  {
    label: 'Phone',
    href: `tel:${personal.phone}`,
    icon: 'phone',
  },
  {
    label: 'Location',
    href: '#contact',
    icon: 'map-pin',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
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
  },
  {
    title: 'Backend',
    skills: ['NestJS', 'Mongoose', 'REST APIs'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'NPM', 'Webpack', 'Figma'],
  },
  {
    title: 'Soft Skills',
    skills: [
      'Problem-solving',
      'Collaboration',
      'Time Management',
      'Adaptability',
    ],
  },
]

export const experience: ExperienceItem[] = [
  {
    company: 'TebaLink',
    position: 'Front-End Web Developer',
    duration: 'Jun 2025 – Feb 2026',
    description: [
      'Refactored and scaled the ERP front-end architecture using clean and maintainable coding practices.',
      'Optimized a slow e-commerce platform through code splitting, lazy loading, pagination, and efficient data fetching.',
      'Improved overall application performance by 2×+, delivering faster load times and a smoother user experience.',
    ],
  },
  {
    company: 'Freelance',
    position: 'Front-End Web Developer',
    duration: 'Jun 2025',
    description: [
      'Independent freelance projects including an e-commerce website and a user management dashboard.',
    ],
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Pinia'],
  },
  {
    company: 'Genwin',
    position: 'Front-End Web Developer',
    duration: 'Apr 2024',
    description: [
      'Designed and developed responsive web applications using Vue.js, Nuxt.js, JavaScript, and Tailwind CSS.',
      'Implemented UI/UX designs to improve user experience and reduce bounce rates by 30%.',
      'Collaborated with back-end developers and designers to ensure smooth integration of APIs and features.',
      'Conducted regular debugging and performance testing, ensuring cross-browser compatibility.',
    ],
    technologies: ['Vue.js', 'Nuxt.js', 'JavaScript', 'Tailwind CSS'],
  },
]

export const projects: ProjectItem[] = [
  {
    name: 'Curva Egypt',
    description:
      'Complete e-commerce platform built independently with multi-language support, dark/light themes, SEO optimization, dynamic meta tags, responsive design, and API-driven product display with async data loading.',
    technologies: [
      'Vue.js',
      'Nuxt.js',
      'TypeScript',
      'Tailwind CSS',
    ],
    liveUrl: 'https://curvaegypt.com',
  },
  {
    name: 'User Management Dashboard',
    description:
      'Role-based user management system with authentication and session handling, CRUD operations, pagination, filtering, and sorting against a mock API. Includes i18n, theme switching, custom directives, Pinia caching, and optimistic UI updates.',
    technologies: ['Vue 3', 'Nuxt', 'Pinia'],
  },
]

export const education = {
  degree: 'Faculty of Science, Mathematics',
  place: 'Damascus, Syria',
  note: 'While my formal education is unrelated to web development, I have dedicated over two years of self-learning and practical experience in front-end development.',
}

export const languages: LanguageItem[] = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'Intermediate' },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const
