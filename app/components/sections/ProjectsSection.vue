<script setup lang="ts">
const { t } = useI18n()
const { projects } = usePortfolioContent()

const header = ref<HTMLElement | null>(null)
const { reveal } = useGsapReveal()

onMounted(async () => {
  await nextTick()
  if (header.value) {
    reveal(header.value.querySelectorAll('[data-reveal]'), {
      trigger: header.value,
    })
  }
})
</script>

<template>
  <section
    id="projects"
    class="scroll-mt-24"
    aria-labelledby="projects-heading"
  >
    <div
      ref="header"
      class="mx-auto max-w-6xl border-t border-border/70 px-5 pt-20 pb-4 sm:px-8 sm:pt-28"
    >
      <p
        data-reveal
        class="mb-3 text-sm font-medium tracking-[0.16em] text-primary uppercase"
      >
        {{ t('projects.eyebrow') }}
      </p>
      <h2
        id="projects-heading"
        data-reveal
        class="font-display max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {{ t('projects.heading') }}
      </h2>
    </div>

    <div>
      <ProjectsProjectShowcase
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :index="index"
      />
    </div>
  </section>
</template>
