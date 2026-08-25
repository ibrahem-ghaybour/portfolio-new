<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'

const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed(() => colorMode.value === 'dark')

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    :aria-label="isDark ? t('theme.toLight') : t('theme.toDark')"
    @click="toggle"
  >
    <Sun v-if="isDark" class="size-4" aria-hidden="true" />
    <Moon v-else class="size-4" aria-hidden="true" />
  </button>
</template>
