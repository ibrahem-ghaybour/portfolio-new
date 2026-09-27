<script setup lang="ts">
import { contact } from '~/data/portfolio'

const { t } = useI18n()
const { personal } = usePortfolioContent()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border/80">
    <div class="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p class="font-display text-sm font-semibold tracking-tight">
        {{ personal.fullName }}
      </p>
      <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <a
          :href="contact.githubUrl"
          target="_blank"
          rel="noopener noreferrer me"
          class="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          GitHub
        </a>
        <p>© {{ year }} · {{ t('footer.role') }}</p>
      </div>
    </div>
  </footer>
</template>
