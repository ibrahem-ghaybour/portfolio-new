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
 * Shared GSAP helpers — soft, smooth section reveals.
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
      y: 18,
      duration: 1.05,
      ease: 'sine.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: trigger ?? (elements[0] as gsap.DOMTarget),
        start: 'top 90%',
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
      y: 24,
      scale: 0.985,
      duration: 1.15,
      ease: 'sine.out',
      scrollTrigger: {
        trigger: options.trigger ?? (target as gsap.DOMTarget),
        start: 'top 92%',
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
