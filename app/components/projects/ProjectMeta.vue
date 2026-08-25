<script setup lang="ts">
import { ArrowUpRight, Code2, ExternalLink } from '@lucide/vue'
import type { ProjectItem } from '~/types/portfolio'

defineProps<{
  project: ProjectItem
  compact?: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-wrap items-center gap-3">
      <span class="font-mono text-sm tracking-wider text-primary">
        {{ project.number }}
      </span>
      <Badge
        v-if="project.featured"
        variant="secondary"
        class="font-normal tracking-wide uppercase"
      >
        {{ t('projects.featured') }}
      </Badge>
    </div>

    <h3
      :id="`project-title-${project.id}`"
      class="font-display mt-3 font-bold tracking-tight text-foreground"
      :class="compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl lg:text-[2.75rem]'"
    >
      {{ project.title }}
    </h3>

    <p class="mt-2 text-sm font-medium tracking-wide text-primary uppercase">
      {{ project.category }}
    </p>

    <p
      class="mt-4 max-w-xl leading-relaxed text-muted-foreground"
      :class="compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'"
    >
      {{ project.description }}
    </p>

    <ul
      v-if="project.highlights?.length"
      class="mt-6 flex flex-wrap gap-6"
      :aria-label="`${project.title} highlights`"
    >
      <li
        v-for="item in project.highlights"
        :key="item.label"
        class="min-w-[4.5rem]"
      >
        <p class="font-display text-2xl font-bold tracking-tight text-foreground">
          {{ item.value }}
        </p>
        <p class="mt-0.5 text-xs tracking-wide text-muted-foreground uppercase">
          {{ item.label }}
        </p>
      </li>
    </ul>

    <div v-if="project.features?.length" class="mt-6">
      <p class="text-xs font-semibold tracking-[0.14em] text-foreground uppercase">
        {{ t('projects.keyFeatures') }}
      </p>
      <ul class="mt-3 grid gap-2 sm:grid-cols-2">
        <li
          v-for="feature in project.features"
          :key="feature"
          class="flex gap-2 text-sm text-muted-foreground"
        >
          <span class="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          <span>{{ feature }}</span>
        </li>
      </ul>
    </div>

    <ul
      v-if="project.technologies.length"
      class="mt-6 flex flex-wrap gap-2"
      :aria-label="`${project.title} technologies`"
    >
      <li v-for="tech in project.technologies" :key="tech">
        <Badge variant="outline" class="font-normal">
          {{ tech }}
        </Badge>
      </li>
    </ul>

    <div class="mt-8 flex flex-wrap gap-3">
      <Button
        v-if="project.liveUrl"
        as="a"
        :href="project.liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="gap-2"
      >
        <ExternalLink class="size-4" aria-hidden="true" />
        {{ t('projects.viewLive') }}
        <span class="sr-only">(opens in new tab)</span>
      </Button>
      <Button
        v-if="project.githubUrl"
        as="a"
        :href="project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        :variant="project.liveUrl ? 'outline' : 'default'"
        class="gap-2"
      >
        <Code2 class="size-4" aria-hidden="true" />
        {{ t('projects.viewCode') }}
        <ArrowUpRight class="size-3.5" aria-hidden="true" />
        <span class="sr-only">(opens in new tab)</span>
      </Button>
    </div>
  </div>
</template>
