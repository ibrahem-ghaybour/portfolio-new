<script setup lang="ts">
import { ArrowDownRight, Mail } from '@lucide/vue'

const { t, locale } = useI18n()
const { personal } = usePortfolioContent()

const root = ref<HTMLElement | null>(null)
const nameEl = ref<HTMLElement | null>(null)
const ready = defineModel<boolean>('ready', { default: false })
const { gsap, reduced } = useGsap()

/**
 * Two balanced lines on small screens (given names / surname),
 * one flowing line from sm+ so the hero stays composed.
 */
const nameLines = computed(() => {
  const name = personal.value.fullName.trim()

  if (locale.value === 'ar') {
    return [{ key: name, chars: [name] }]
  }

  const words = name.split(/\s+/).filter(Boolean)
  if (words.length <= 1) {
    return [{ key: name, chars: name.split('') }]
  }

  const given = words.slice(0, -1).join(' ')
  const surname = words.at(-1)!

  return [
    {
      key: given,
      chars: given.split('').map((ch) => (ch === ' ' ? '\u00A0' : ch)),
    },
    {
      key: surname,
      chars: surname.split(''),
    },
  ]
})

watch(ready, async (value) => {
  if (!value || !import.meta.client) return
  await nextTick()

  const meta = root.value?.querySelectorAll('[data-hero-item]')
  const letters = nameEl.value?.querySelectorAll('[data-letter]')

  if (reduced.value) {
    if (meta?.length) gsap.set(meta, { clearProps: 'all', opacity: 1, y: 0 })
    if (letters?.length) gsap.set(letters, { clearProps: 'all', opacity: 1, y: 0, rotateX: 0 })
    return
  }

  const tl = gsap.timeline({ defaults: { ease: 'sine.out' } })

  if (meta?.length) {
    tl.fromTo(
      meta,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
      0,
    )
  }

  if (letters?.length) {
    tl.fromTo(
      letters,
      {
        opacity: 0,
        y: 22,
        rotateX: -28,
        filter: 'blur(4px)',
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.95,
        stagger: locale.value === 'ar' ? 0.1 : 0.028,
        ease: 'sine.out',
      },
      0.1,
    )
  }
})
</script>

<template>
  <section
    id="top"
    ref="root"
    class="relative flex min-h-[100svh] items-center pt-20"
    :class="{ 'hero-pending': !ready }"
    aria-labelledby="hero-name"
  >
    <div class="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-28">
      <p
        data-hero-item
        class="mb-4 text-xs font-medium tracking-[0.2em] text-primary uppercase sm:mb-5 sm:text-sm"
      >
        {{ personal.title }}
      </p>

      <h1
        id="hero-name"
        ref="nameEl"
        class="font-display hero-name text-[clamp(1.9rem,1rem+4.8vw,5.25rem)] leading-[1.1] font-bold tracking-tight text-foreground sm:max-w-4xl sm:leading-[1.05]"
        :aria-label="personal.fullName"
      >
        <template v-for="(line, lineIndex) in nameLines" :key="line.key">
          <span class="hero-line inline-block whitespace-nowrap">
            <span
              v-for="(ch, charIndex) in line.chars"
              :key="`${line.key}-${charIndex}`"
              data-letter
              class="hero-letter inline-block origin-bottom will-change-transform"
            >{{ ch }}</span>
          </span>
          <br v-if="lineIndex < nameLines.length - 1" class="sm:hidden" />
          <span
            v-if="lineIndex < nameLines.length - 1"
            class="hidden sm:inline"
            aria-hidden="true"
          >&nbsp;</span>
        </template>
      </h1>

      <p
        data-hero-item
        class="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-xl"
      >
        {{ personal.tagline }}
      </p>

      <div data-hero-item class="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
        <Button as="a" href="#projects" size="lg" class="gap-2">
          {{ t('hero.viewProjects') }}
          <ArrowDownRight class="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </Button>
        <Button as="a" href="#contact" variant="outline" size="lg" class="gap-2">
          <Mail class="size-4" aria-hidden="true" />
          {{ t('hero.getInTouch') }}
        </Button>
      </div>

      <a
        data-hero-item
        href="#cv"
        class="mt-5 inline-flex text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mt-6"
      >
        {{ t('hero.viewCv') }}
      </a>

      <p data-hero-item class="mt-10 text-sm text-muted-foreground sm:mt-12">
        {{ personal.location }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero-name {
  perspective: 700px;
}

.hero-pending [data-hero-item],
.hero-pending [data-letter] {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .hero-pending [data-hero-item],
  .hero-pending [data-letter] {
    opacity: 1;
  }
}
</style>
