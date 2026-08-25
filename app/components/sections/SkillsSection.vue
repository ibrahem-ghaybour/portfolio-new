<script setup lang="ts">
const { t } = useI18n()
const { skillGroups } = usePortfolioContent()

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
    id="skills"
    ref="root"
    class="scroll-mt-24 border-t border-border/70 py-20 sm:py-28"
    aria-labelledby="skills-heading"
  >
    <div class="mx-auto max-w-6xl px-5 sm:px-8">
      <div data-reveal class="max-w-2xl">
        <p class="mb-3 text-sm font-medium tracking-[0.16em] text-primary uppercase">
          {{ t('skills.eyebrow') }}
        </p>
        <h2
          id="skills-heading"
          class="font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {{ t('skills.heading') }}
        </h2>
      </div>

      <div class="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="group in skillGroups"
          :key="group.title"
          data-reveal
        >
          <h3 class="font-display text-lg font-semibold tracking-tight">
            {{ group.title }}
          </h3>
          <ul class="mt-4 flex flex-wrap gap-2" :aria-label="group.title">
            <li v-for="skill in group.skills" :key="skill">
              <Badge variant="outline" class="font-normal">
                {{ skill }}
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
