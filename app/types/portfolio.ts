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

export interface ProjectItem {
  name: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
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
