<script setup lang="ts">
const { locale, setLocale, t } = useI18n()

async function switchLocale() {
  const next = locale.value === 'ar' ? 'en' : 'ar'
  await setLocale(next)
}
</script>

<template>
  <button
    type="button"
    class="inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs font-semibold tracking-wide text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    :aria-label="t('locale.label')"
    @click="switchLocale"
  >
    {{ locale === 'ar' ? t('locale.en') : t('locale.ar') }}
  </button>
</template>
