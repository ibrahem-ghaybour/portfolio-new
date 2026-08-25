import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

function ensurePlugin() {
  if (import.meta.client && !registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
}

/**
 * Shared GSAP helpers for scroll reveals and media entrances.
 */
export function useGsapReveal() {
  const reduced = useReducedMotion()
  ensurePlugin()

  function reveal(
    targets: gsap.TweenTarget,
    options: gsap.TweenVars & { trigger?: gsap.DOMTarget } = {},
  ) {
    if (!import.meta.client) return

    const elements = gsap.utils.toArray(targets)
    if (!elements.length) return

    if (reduced.value) {
      gsap.set(elements, { clearProps: 'all', opacity: 1, y: 0, scale: 1 })
      return
    }

    const { trigger, ...vars } = options

    gsap.from(elements, {
      opacity: 0,
      y: 28,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: trigger ?? (elements[0] as gsap.DOMTarget),
        start: 'top 88%',
        once: true,
      },
      ...vars,
    })
  }

  function revealMedia(
    target: gsap.TweenTarget,
    options: { trigger?: gsap.DOMTarget } = {},
  ) {
    if (!import.meta.client) return

    if (reduced.value) {
      gsap.set(target, { clearProps: 'all', opacity: 1, y: 0, scale: 1 })
      return
    }

    gsap.from(target, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: options.trigger ?? (target as gsap.DOMTarget),
        start: 'top 90%',
        once: true,
      },
    })
  }

  return { gsap, ScrollTrigger, reveal, revealMedia, reduced }
}

/** @deprecated Prefer useGsapReveal — kept for existing sections */
export function useGsap() {
  return useGsapReveal()
}
