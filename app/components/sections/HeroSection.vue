<script setup lang="ts">
import { ArrowDownRight, Mail } from '@lucide/vue'

const { t } = useI18n()
const { personal } = usePortfolioContent()

const root = ref<HTMLElement | null>(null)
const ready = defineModel<boolean>('ready', { default: false })
const { gsap, reduced } = useGsap()

watch(ready, async (value) => {
  if (!value || !import.meta.client) return
  await nextTick()

  const items = root.value?.querySelectorAll('[data-hero-item]')
  if (!items?.length) return

  if (reduced.value) {
    gsap.set(items, { clearProps: 'all', opacity: 1, y: 0 })
    return
  }

  gsap.fromTo(
    items,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.05,
    },
  )
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
        data-hero-item
        class="font-display max-w-4xl text-[clamp(2.5rem,8vw,5.25rem)] leading-[1.05] font-bold tracking-tight text-foreground"
      >
        {{ personal.fullName }}
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
          <ArrowDownRight class="size-4" aria-hidden="true" />
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
.hero-pending [data-hero-item] {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .hero-pending [data-hero-item] {
    opacity: 1;
  }
}
</style>
