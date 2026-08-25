export interface SocialLink {
  label: string
  href: string
  icon: 'mail' | 'phone' | 'map-pin'
}

export interface SkillGroup {
  title: string
  skills: string[]
}

export interface ExperienceItem {
  company: string
  position: string
  duration: string
  description: string[]
  technologies?: string[]
}

export type ProjectLayout =
  | 'featured'
  | 'split-right'
  | 'stacked'
  | 'split-left'
  | 'media-first'

export interface ProjectHighlight {
  value: string
  label: string
}

export interface ProjectItem {
  id: string
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  image: string
  imageAlt: string
  /** Optional mobile screenshot shown beside the desktop preview */
  mobileImage?: string
  mobileImageAlt?: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  features?: string[]
  highlights?: ProjectHighlight[]
  layout: ProjectLayout
}

export interface LanguageItem {
  name: string
  level: string
}

export interface PersonalInfo {
  fullName: string
  firstName: string
  lastName: string
  initials: string
  title: string
  location: string
  email: string
  phone: string
  summary: string
  about: string[]
  tagline: string
  availability: string
}
