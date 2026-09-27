/** Site identity + URL helpers for SEO. */

export const SITE_NAME = 'Ibrahim Marwan Ghaybour'
export const SITE_NAME_AR = 'إبراهيم مروان غيبور'
export const GITHUB_URL = 'https://github.com/ibrahem-ghaybour'
export const DEFAULT_OG_IMAGE = '/og-default.png'

export function normalizeSiteUrl(url?: string | null): string {
  const cleaned = (url || '').replace(/\/$/, '')
  return cleaned || 'http://localhost:3000'
}

export function toAbsoluteUrl(siteUrl: string, path = '/'): string {
  const base = normalizeSiteUrl(siteUrl)
  if (!path || path === '/') return `${base}/`
  return path.startsWith('http')
    ? path
    : `${base}${path.startsWith('/') ? path : `/${path}`}`
}
