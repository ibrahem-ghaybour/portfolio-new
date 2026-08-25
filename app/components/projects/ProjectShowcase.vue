<script setup lang="ts">
import type { ProjectItem } from '~/types/portfolio'

const props = defineProps<{
  project: ProjectItem
  index: number
}>()

const root = ref<HTMLElement | null>(null)
const { reveal } = useGsapReveal()

onMounted(async () => {
  await nextTick()
  const text = root.value?.querySelector('[data-project-copy]')
  if (text && root.value) reveal(text, { trigger: root.value })
})
</script>

<template>
  <article
    :id="`project-${project.id}`"
    ref="root"
    class="project-showcase border-t border-border/70 py-12 sm:py-16 lg:py-20"
    :class="{ 'bg-muted/30': index % 2 === 1 }"
    :aria-labelledby="`project-title-${project.id}`"
  >
    <!-- Featured: full-width case study -->
    <div
      v-if="project.layout === 'featured'"
      class="mx-auto max-w-6xl px-5 sm:px-8"
    >
      <div class="flex flex-col gap-10 lg:gap-12">
        <div class="order-1 lg:order-2">
          <ProjectsProjectMedia :project="project" :priority="index === 0" />
        </div>
        <div data-project-copy class="order-2 max-w-2xl lg:order-1">
          <ProjectsProjectMeta :project="project" />
        </div>
      </div>
    </div>

    <!-- Split: info left, image right (desktop) — image first on mobile -->
    <div
      v-else-if="project.layout === 'split-right'"
      class="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14"
    >
      <div data-project-copy class="order-2 lg:order-1">
        <ProjectsProjectMeta :project="project" />
      </div>
      <div class="order-1 lg:order-2">
        <ProjectsProjectMedia :project="project" />
      </div>
    </div>

    <!-- Stacked: image top, info below -->
    <div
      v-else-if="project.layout === 'stacked'"
      class="mx-auto max-w-6xl px-5 sm:px-8"
    >
      <ProjectsProjectMedia :project="project" />
      <div data-project-copy class="mt-8 max-w-2xl lg:mt-10">
        <ProjectsProjectMeta :project="project" compact />
      </div>
    </div>

    <!-- Split: info | large preview — image first on mobile -->
    <div
      v-else-if="project.layout === 'split-left'"
      class="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14"
    >
      <div data-project-copy class="order-2 lg:order-1">
        <ProjectsProjectMeta :project="project" />
      </div>
      <div class="order-1 lg:order-2">
        <ProjectsProjectMedia :project="project" />
      </div>
    </div>

    <!-- Media first: large screenshot then details -->
    <div
      v-else
      class="mx-auto max-w-6xl px-5 sm:px-8"
    >
      <ProjectsProjectMedia :project="project" />
      <div data-project-copy class="mt-8 max-w-2xl lg:mt-10">
        <ProjectsProjectMeta :project="project" compact />
      </div>
    </div>
  </article>
</template>
