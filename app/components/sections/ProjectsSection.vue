<script setup lang="ts">
import { ArrowUpRight, ExternalLink } from '@lucide/vue'
import { projects } from '~/data/portfolio'

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
    id="projects"
    ref="root"
    class="scroll-mt-24 border-t border-border/70 py-20 sm:py-28"
    aria-labelledby="projects-heading"
  >
    <div class="mx-auto max-w-6xl px-5 sm:px-8">
      <div data-reveal class="max-w-2xl">
        <p class="mb-3 text-sm font-medium tracking-[0.16em] text-primary uppercase">
          Projects
        </p>
        <h2
          id="projects-heading"
          class="font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Selected work.
        </h2>
      </div>

      <ul class="mt-12 grid gap-6 md:grid-cols-2">
        <li
          v-for="project in projects"
          :key="project.name"
          data-reveal
          class="group flex flex-col border border-border bg-card/60 p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_12px_40px_-24px_oklch(0.42_0.075_195/0.45)] sm:p-8"
        >
          <div class="flex items-start justify-between gap-4">
            <h3 class="font-display text-2xl font-semibold tracking-tight">
              {{ project.name }}
            </h3>
            <ArrowUpRight
              class="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
              aria-hidden="true"
            />
          </div>

          <p class="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {{ project.description }}
          </p>

          <ul class="mt-6 flex flex-wrap gap-2" :aria-label="`${project.name} stack`">
            <li v-for="tech in project.technologies" :key="tech">
              <Badge variant="outline" class="font-normal">
                {{ tech }}
              </Badge>
            </li>
          </ul>

          <div v-if="project.liveUrl || project.githubUrl" class="mt-6 flex flex-wrap gap-3">
            <Button
              v-if="project.liveUrl"
              as="a"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
              class="gap-2"
            >
              <ExternalLink class="size-3.5" aria-hidden="true" />
              Live demo
              <span class="sr-only">(opens in new tab)</span>
            </Button>
            <Button
              v-if="project.githubUrl"
              as="a"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
            >
              GitHub
              <span class="sr-only">(opens in new tab)</span>
            </Button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
