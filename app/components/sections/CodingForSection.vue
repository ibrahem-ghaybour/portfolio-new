<script setup lang="ts">
const { t } = useI18n()
const { units } = useCodingDuration()

const root = ref<HTMLElement | null>(null)
const { reveal } = useGsapReveal()

onMounted(async () => {
  await nextTick()
  if (root.value) {
    reveal(root.value.querySelectorAll('[data-reveal]'), { trigger: root.value })
  }
})
</script>

<template>
  <section
    id="coding-for"
    ref="root"
    class="scroll-mt-24 border-y border-border/40 py-14 sm:py-16"
    :aria-label="t('codingFor.label')"
  >
    <div class="mx-auto max-w-6xl px-5 sm:px-8">
      <div
        data-reveal
        class="liquid-glass mx-auto max-w-4xl rounded-[1.75rem] px-5 py-8 sm:px-10 sm:py-10"
      >
        <p
          class="mb-8 text-center text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase sm:text-sm"
        >
          {{ t('codingFor.label') }}
        </p>

        <div
          class="flex flex-wrap items-start justify-center gap-y-8"
          role="timer"
        >
          <template v-for="(unit, index) in units" :key="unit.key">
            <div class="flex min-w-[4.5rem] flex-col items-center px-3 sm:min-w-[5.5rem] sm:px-5">
              <span
                class="font-display text-3xl font-bold tracking-tight text-foreground tabular-nums sm:text-4xl md:text-5xl"
              >
                {{ unit.value }}
              </span>
              <span
                class="mt-2 text-[0.65rem] font-medium tracking-[0.18em] text-muted-foreground uppercase sm:text-xs"
              >
                {{ t(`codingFor.${unit.key}`) }}
              </span>
            </div>

            <span
              v-if="index < units.length - 1"
              class="mt-2 hidden items-center self-start pt-1 text-2xl font-light text-primary sm:flex sm:pt-2 sm:text-3xl"
              aria-hidden="true"
            >
              :
            </span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
