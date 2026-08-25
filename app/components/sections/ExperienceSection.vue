<script setup lang="ts">
const { t } = useI18n()
const { experience } = usePortfolioContent()

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
    id="experience"
    ref="root"
    class="scroll-mt-24 border-t border-border/70 py-20 sm:py-28"
    aria-labelledby="experience-heading"
  >
    <div class="mx-auto max-w-6xl px-5 sm:px-8">
      <div data-reveal class="max-w-2xl">
        <p class="mb-3 text-sm font-medium tracking-[0.16em] text-primary uppercase">
          {{ t('experience.eyebrow') }}
        </p>
        <h2
          id="experience-heading"
          class="font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {{ t('experience.heading') }}
        </h2>
      </div>

      <ol class="relative mt-14 ms-3 space-y-0 border-s border-border sm:ms-4">
        <li
          v-for="item in experience"
          :key="`${item.company}-${item.duration}`"
          data-reveal
          class="relative pb-12 ps-8 last:pb-0 sm:ps-10"
        >
          <span
            class="absolute -start-[5px] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-background"
            aria-hidden="true"
          />

          <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div>
              <h3 class="font-display text-xl font-semibold tracking-tight">
                {{ item.position }}
              </h3>
              <p class="mt-1 text-base font-medium text-primary">
                {{ item.company }}
              </p>
            </div>
            <time class="shrink-0 text-sm text-muted-foreground">
              {{ item.duration }}
            </time>
          </div>

          <ul class="mt-4 space-y-2">
            <li
              v-for="(point, index) in item.description"
              :key="index"
              class="text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {{ point }}
            </li>
          </ul>

          <ul
            v-if="item.technologies?.length"
            class="mt-4 flex flex-wrap gap-2"
            :aria-label="`${item.company} technologies`"
          >
            <li v-for="tech in item.technologies" :key="tech">
              <Badge variant="secondary" class="font-normal">
                {{ tech }}
              </Badge>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>
