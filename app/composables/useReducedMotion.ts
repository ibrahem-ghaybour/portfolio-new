export function useReducedMotion() {
  const reduced = ref(false)

  onMounted(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = media.matches

    const onChange = (event: MediaQueryListEvent) => {
      reduced.value = event.matches
    }

    media.addEventListener('change', onChange)
    onBeforeUnmount(() => media.removeEventListener('change', onChange))
  })

  return reduced
}
