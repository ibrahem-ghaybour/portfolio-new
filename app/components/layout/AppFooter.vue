<script setup lang="ts">
import { personal } from '~/data/portfolio'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border/80">
    <div class="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p class="font-display text-sm font-semibold tracking-tight">
        {{ personal.fullName }}
      </p>
      <p class="text-sm text-muted-foreground">
        © {{ year }} · Front-End Web Developer
      </p>
    </div>
  </footer>
</template>
