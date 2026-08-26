<script setup lang="ts">
import { ArrowDownRight, Mail } from '@lucide/vue'

const { t, locale } = useI18n()
const { personal } = usePortfolioContent()

const root = ref<HTMLElement | null>(null)
const nameEl = ref<HTMLElement | null>(null)
const ready = defineModel<boolean>('ready', { default: false })
const { gsap, reduced } = useGsap()

const nameParts = computed(() => {
  const name = personal.value.fullName.trim()
  // Keep Arabic as a single block so word order stays correct in RTL
  if (locale.value === 'ar') {
    return [{ type: 'word' as const, value: name }]
  }
  return name.split('').map((ch) => ({
    type: 'char' as const,
    value: ch === ' ' ? '\u00A0' : ch,
  }))
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
        stagger: locale.value === 'ar' ? 0.1 : 0.032,
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
    class="relative flex min-h-[100svh] items-center pt-16"
    :class="{ 'hero-pending': !ready }"
    aria-labelledby="hero-name"
  >
    <div class="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <p
        data-hero-item
        class="mb-5 text-sm font-medium tracking-[0.18em] text-primary uppercase"
      >
        {{ personal.title }}
      </p>

      <h1
        id="hero-name"
        ref="nameEl"
        class="font-display hero-name max-w-4xl text-[clamp(2.5rem,8vw,5.25rem)] leading-[1.05] font-bold tracking-tight text-foreground"
        :aria-label="personal.fullName"
      >
        <span
          v-for="(part, index) in nameParts"
          :key="`${part.value}-${index}`"
          data-letter
          class="hero-letter inline-block origin-bottom will-change-transform"
          :class="part.type === 'word' && locale !== 'ar' ? 'me-[0.35em]' : ''"
        >{{ part.value }}</span>
      </h1>

      <p
        data-hero-item
        class="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
      >
        {{ personal.tagline }}
      </p>

      <div data-hero-item class="mt-10 flex flex-wrap items-center gap-3">
        <Button as="a" href="#projects" size="lg" class="gap-2">
          {{ t('hero.viewProjects') }}
          <ArrowDownRight class="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </Button>
        <Button as="a" href="#contact" variant="outline" size="lg" class="gap-2">
          <Mail class="size-4" aria-hidden="true" />
          {{ t('hero.getInTouch') }}
        </Button>
      </div>

      <p data-hero-item class="mt-12 text-sm text-muted-foreground">
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
