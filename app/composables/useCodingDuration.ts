export interface CodingDuration {
  years: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

/** Coding journey start — yields 2+ years (not 3) as of 2026. */
export const CODING_START_DATE = new Date('2024-02-01T00:00:00')

export function getCodingDuration(
  now = new Date(),
  start = CODING_START_DATE,
): CodingDuration {
  let years = now.getFullYear() - start.getFullYear()
  const anniversary = new Date(start)
  anniversary.setFullYear(start.getFullYear() + years)

  if (anniversary.getTime() > now.getTime()) {
    years -= 1
    anniversary.setFullYear(start.getFullYear() + years)
  }

  const ms = Math.max(0, now.getTime() - anniversary.getTime())
  const totalDays = Math.floor(ms / (1000 * 60 * 60 * 24))
  const remAfterDays = ms % (1000 * 60 * 60 * 24)
  const hours = Math.floor(remAfterDays / (1000 * 60 * 60))
  const remAfterHours = remAfterDays % (1000 * 60 * 60)
  const minutes = Math.floor(remAfterHours / (1000 * 60))
  const seconds = Math.floor((remAfterHours % (1000 * 60)) / 1000)

  return {
    years: Math.max(0, years),
    days: totalDays,
    hours,
    minutes,
    seconds,
  }
}

export function useCodingDuration() {
  const duration = ref<CodingDuration>(getCodingDuration())
  let timer: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    duration.value = getCodingDuration()
    timer = setInterval(() => {
      duration.value = getCodingDuration()
    }, 1000)
  })

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
  })

  function pad(value: number) {
    return String(value).padStart(2, '0')
  }

  const units = computed(() => [
    { key: 'years' as const, value: pad(duration.value.years) },
    { key: 'days' as const, value: pad(duration.value.days) },
    { key: 'hours' as const, value: pad(duration.value.hours) },
    { key: 'minutes' as const, value: pad(duration.value.minutes) },
    { key: 'seconds' as const, value: pad(duration.value.seconds) },
  ])

  return { duration, units }
}
