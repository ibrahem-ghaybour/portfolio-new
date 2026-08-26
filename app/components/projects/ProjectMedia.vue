<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import type { ProjectItem } from '~/types/portfolio'

const props = defineProps<{
  project: ProjectItem
  priority?: boolean
}>()

const root = ref<HTMLElement | null>(null)
const { revealMedia } = useGsapReveal()

const href = computed(() => props.project.liveUrl ?? props.project.githubUrl)
const { t } = useI18n()
const ctaLabel = computed(() =>
  props.project.liveUrl ? t('projects.viewProject') : t('projects.viewCode'),
)
const hasMobile = computed(() => Boolean(props.project.mobileImage))

onMounted(async () => {
  await nextTick()
  if (root.value) revealMedia(root.value)
})
</script>

<template>
  <div ref="root" class="project-media mx-auto w-full max-w-3xl lg:max-w-4xl">
    <!-- Desktop + iPhone pair (e.g. Curva) -->
    <div
      v-if="hasMobile"
      class="relative flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:gap-4 lg:gap-5"
    >
      <component
        :is="href ? 'a' : 'div'"
        :href="href"
        :target="href ? '_blank' : undefined"
        :rel="href ? 'noopener noreferrer' : undefined"
        class="group relative min-w-0 flex-1 overflow-hidden rounded-[1.35rem] border border-border/70 bg-[#0a0a0a] shadow-[0_20px_50px_-28px_oklch(0.24_0.025_240/0.45)] outline-none ring-1 ring-black/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:ring-white/5"
        :aria-label="href ? `${ctaLabel}: ${project.title} desktop` : undefined"
      >
        <NuxtImg
          :src="project.image"
          :alt="project.imageAlt"
          :preload="priority"
          loading="lazy"
          format="webp"
          sizes="100vw md:50vw lg:640px"
          width="1406"
          height="775"
          class="block h-auto w-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />

        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
          aria-hidden="true"
        />

        <div
          v-if="href"
          class="pointer-events-none absolute inset-x-0 bottom-0 flex p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-4 motion-reduce:opacity-100"
        >
          <span
            class="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-md sm:text-sm"
          >
            {{ ctaLabel }}
            <ArrowUpRight class="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
          </span>
        </div>
      </component>

      <component
        :is="href ? 'a' : 'div'"
        :href="href"
        :target="href ? '_blank' : undefined"
        :rel="href ? 'noopener noreferrer' : undefined"
        class="group relative w-[min(52%,200px)] shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-[24%] sm:max-w-[200px] lg:max-w-[210px]"
        :aria-label="href ? `${ctaLabel}: ${project.title} mobile` : undefined"
      >
        <ProjectsIphoneFrame interactive>
          <NuxtImg
            :src="project.mobileImage!"
            :alt="project.mobileImageAlt || `${project.title} mobile preview`"
            loading="lazy"
            format="webp"
            sizes="200px"
            width="446"
            height="855"
            class="block h-auto w-full"
          />
        </ProjectsIphoneFrame>
      </component>
    </div>

    <!-- Single preview — soft iOS-like continuous corners -->
    <component
      v-else
      :is="href ? 'a' : 'div'"
      :href="href"
      :target="href ? '_blank' : undefined"
      :rel="href ? 'noopener noreferrer' : undefined"
      class="group relative block overflow-hidden rounded-[1.35rem] border border-border/70 bg-card shadow-[0_20px_50px_-28px_oklch(0.24_0.025_240/0.45)] outline-none ring-1 ring-black/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:ring-white/5"
      :aria-label="href ? `${ctaLabel}: ${project.title}` : undefined"
    >
      <div class="relative overflow-hidden bg-muted">
        <NuxtImg
          :src="project.image"
          :alt="project.imageAlt"
          :preload="priority"
          loading="lazy"
          format="webp"
          sizes="100vw md:50vw lg:720px"
          class="block h-auto w-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.012] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />

        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
          aria-hidden="true"
        />

        <div
          v-if="href"
          class="pointer-events-none absolute inset-x-0 bottom-0 flex p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-4 motion-reduce:opacity-100"
        >
          <span
            class="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-md sm:text-sm"
          >
            {{ ctaLabel }}
            <ArrowUpRight class="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
          </span>
        </div>
      </div>
    </component>
  </div>
</template>
