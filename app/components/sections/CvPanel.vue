<script setup lang="ts">
import { Download, Eye, FileText } from '@lucide/vue'
import { contact } from '~/data/portfolio'

const { t } = useI18n()
const { personal } = usePortfolioContent()
</script>

<template>
  <aside
    class="cv-panel group relative overflow-hidden rounded-[1.35rem] border border-border/70 bg-card/60 p-5 shadow-[0_20px_50px_-28px_oklch(0.24_0.025_240/0.35)] ring-1 ring-black/5 backdrop-blur-sm sm:p-6 dark:ring-white/5"
    :aria-label="t('cv.label')"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_100%_0%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_55%)]"
      aria-hidden="true"
    />

    <div class="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
      <!-- Mini document preview -->
      <div
        class="relative mx-auto w-[7.5rem] shrink-0 sm:mx-0"
        aria-hidden="true"
      >
        <div
          class="absolute -inset-2 rounded-2xl bg-primary/10 blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-70"
        />
        <div
          class="relative overflow-hidden rounded-xl border border-border/80 bg-background shadow-[0_12px_28px_-16px_oklch(0.24_0.025_240/0.5)] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
        >
          <div class="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-2.5 py-1.5">
            <span class="size-1.5 rounded-full bg-destructive/70" />
            <span class="size-1.5 rounded-full bg-primary/50" />
            <span class="size-1.5 rounded-full bg-muted-foreground/40" />
          </div>
          <div class="space-y-2 px-3 py-3">
            <div class="flex items-center gap-2">
              <span
                class="flex size-7 items-center justify-center rounded-md bg-primary/15 font-display text-[0.65rem] font-bold text-primary"
              >
                {{ contact.initials }}
              </span>
              <div class="min-w-0 flex-1 space-y-1">
                <div class="h-1.5 w-full rounded-full bg-foreground/15" />
                <div class="h-1 w-2/3 rounded-full bg-foreground/10" />
              </div>
            </div>
            <div class="space-y-1.5 pt-1">
              <div class="h-1 w-full rounded-full bg-muted-foreground/20" />
              <div class="h-1 w-[92%] rounded-full bg-muted-foreground/15" />
              <div class="h-1 w-[78%] rounded-full bg-muted-foreground/15" />
              <div class="h-1 w-[88%] rounded-full bg-muted-foreground/10" />
            </div>
            <div class="flex items-center gap-1.5 pt-1">
              <FileText class="size-3 text-primary/80" />
              <span class="text-[0.6rem] font-medium tracking-wide text-muted-foreground uppercase">
                PDF
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="min-w-0 flex-1 text-center sm:text-start">
        <p class="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
          {{ t('cv.eyebrow') }}
        </p>
        <h3 class="font-display mt-1.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {{ t('cv.title') }}
        </h3>
        <p class="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {{ t('cv.description', { name: personal.fullName }) }}
        </p>

        <div class="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
          <Button
            as="a"
            :href="contact.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            class="gap-2"
          >
            <Eye class="size-4" aria-hidden="true" />
            {{ t('cv.view') }}
          </Button>
          <Button
            as="a"
            :href="contact.cvUrl"
            :download="contact.cvFileName"
            variant="outline"
            size="lg"
            class="gap-2"
          >
            <Download class="size-4" aria-hidden="true" />
            {{ t('cv.download') }}
          </Button>
        </div>
      </div>
    </div>
  </aside>
</template>
