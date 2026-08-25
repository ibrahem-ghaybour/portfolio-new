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
    id: 'curva',
    number: '01',
    title: 'Curva',
    category: 'E-commerce / Sports Platform',
    description:
      'Complete e-commerce platform built independently for sports apparel and gear — with multi-language support, dark/light themes, SEO optimization, dynamic meta tags, and API-driven product display.',
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/curva.webp',
    imageAlt: 'Curva Egypt desktop homepage featuring sports apparel clearance',
    mobileImage: '/projects/curva-mobile.webp',
    mobileImageAlt: 'Curva Egypt mobile homepage with World Cup champions campaign',
    liveUrl: 'https://curvaegypt.com',
    featured: true,
    layout: 'featured',
    features: [
      'Multi-language support',
      'Dark / light themes',
      'SEO & dynamic meta tags',
      'Responsive, mobile-first UI',
      'API-driven product catalog',
      'Async data loading',
    ],
  },
  {
    id: 'user-management',
    number: '02',
    title: 'User Management Dashboard',
    category: 'Admin Dashboard / Assessment',
    description:
      'Role-based user management system with authentication, session handling, and full CRUD against a mock API — including pagination, filtering, sorting, i18n, and theme switching.',
    technologies: ['Vue 3', 'Nuxt', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Vue I18n'],
    image: '/projects/user-dashboard.webp',
    imageAlt: 'User Management Dashboard project cover',
    githubUrl:
      'https://github.com/ibrahem-ghaybour/user-management-dashboard-vue-3-assessment',
    featured: true,
    layout: 'split-right',
    features: [
      'Authentication & session handling',
      'Role-based permissions (RBAC)',
      'User CRUD operations',
      'Pagination, filtering & sorting',
      'Form validation',
      'Theme switching',
      'Internationalization',
      'Custom directives (permissions, focus)',
      'Pinia caching & optimistic UI',
    ],
    highlights: [
      { value: '50+', label: 'Users' },
      { value: '3', label: 'Languages' },
      { value: 'RBAC', label: 'Permissions' },
    ],
  },
  {
    id: 'dashboard',
    number: '03',
    title: 'Dashboard',
    category: 'Admin / E-commerce Backoffice',
    description:
      'Vue 3 admin dashboard for managing products, orders, categories, users, carts, and wishlists — with interactive charts, data tables, auth flows, and Cloudinary-ready image uploads.',
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
    imageAlt: 'Admin dashboard project cover',
    githubUrl: 'https://github.com/ibrahem-ghaybour/my-dashpoard-app',
    layout: 'stacked',
    features: [
      'Products, orders & categories management',
      'Users, carts & wishlist tables',
      'Interactive area charts',
      'Authentication (login / sign up)',
      'Image upload integration',
      'Form validation with VeeValidate & Zod',
    ],
  },
  {
    id: 'deliver',
    number: '04',
    title: 'Deliver',
    category: 'Landing Page / Delivery Brand',
    description:
      'Marketing landing page for a delivery brand with polished typography, GSAP motion, Bootstrap layout, and clear CTAs for registration and app download.',
    technologies: ['TypeScript', 'Vite', 'Bootstrap', 'GSAP', 'Sass'],
    image: '/projects/deliver.webp',
    imageAlt: 'Deliver X landing page with delivery hero and floating UI cards',
    liveUrl: 'https://ibrahem-ghaybour.github.io/deliver/',
    githubUrl: 'https://github.com/ibrahem-ghaybour/deliver',
    layout: 'split-left',
    features: [
      'Responsive marketing layout',
      'GSAP-powered interactions',
      'About, pricing & cart sections',
      'Register & download CTAs',
    ],
  },
  {
    id: 'pos',
    number: '05',
    title: 'POS System Online/Offline',
    category: 'Point of Sale / Retail',
    description:
      'POS system working online and offline with printer connectivity via USB and internet.',
    technologies: [],
    image: '/projects/pos.webp',
    imageAlt:
      'POS Point of Sale interface with product grid, filters, shift controls, and invoice panel',
    layout: 'media-first',
    features: [
      'Online and offline operation',
      'Printer connectivity via USB and internet',
      'Product search, categories & filters',
      'Shift management (open / close)',
      'Barcode scanning',
      'Invoice cart with save, delete, print & pay',
      'Customers and settings modules',
    ],
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
