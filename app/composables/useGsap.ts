import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function useGsap() {
  const reduced = useReducedMotion()

  if (import.meta.client && !registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }

  function reveal(
    targets: gsap.TweenTarget,
    options: gsap.TweenVars & { trigger?: gsap.DOMTarget } = {},
  ) {
    if (!import.meta.client) return

    if (reduced.value) {
      gsap.set(targets, { clearProps: 'all', opacity: 1, y: 0 })
      return
    }

    const { trigger, ...vars } = options
    const elements = gsap.utils.toArray(targets)
    if (!elements.length) return

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

  return { gsap, ScrollTrigger, reveal, reduced }
}
