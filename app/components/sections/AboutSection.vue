<script setup lang="ts">
const { t } = useI18n()
const { personal, education, languages } = usePortfolioContent()

const root = ref<HTMLElement | null>(null)
const { reveal } = useGsap()

onMounted(async () => {
  await nextTick()
  const items = root.value?.querySelectorAll('[data-reveal]')
  if (items?.length && root.value) reveal(items, { trigger: root.value })
})
</script>

<template>
  <section
    id="about"
    ref="root"
    class="scroll-mt-24 border-t border-border/70 py-20 sm:py-28"
    aria-labelledby="about-heading"
  >
    <div class="mx-auto max-w-6xl px-5 sm:px-8">
      <div class="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div data-reveal>
          <p class="mb-3 text-sm font-medium tracking-[0.16em] text-primary uppercase">
            {{ t('about.eyebrow') }}
          </p>
          <h2
            id="about-heading"
            class="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {{ t('about.heading') }}
          </h2>
        </div>

        <div class="space-y-5" data-reveal>
          <p class="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {{ personal.summary }}
          </p>
          <p
            v-for="(paragraph, index) in personal.about"
            :key="index"
            class="text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {{ paragraph }}
          </p>

          <div class="pt-4">
            <p class="text-sm font-medium text-foreground">
              {{ education.degree }}
              <span class="text-muted-foreground"> — {{ education.place }}</span>
            </p>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {{ education.note }}
            </p>
          </div>

          <ul class="flex flex-wrap gap-2 pt-2" :aria-label="t('skills.eyebrow')">
            <li v-for="lang in languages" :key="lang.name">
              <Badge variant="secondary">
                {{ lang.name }} · {{ lang.level }}
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
