<script setup lang="ts">
const { t } = useI18n()

const MODEL_SRC = '/obj/hero-model.glb'

const root = ref<HTMLElement | null>(null)
const visible = ref(false)
const loaded = ref(false)
const failed = ref(false)

let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!root.value || !import.meta.client) return

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { rootMargin: '120px' },
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

function onLoad() {
  loaded.value = true
}

function onError() {
  failed.value = true
}
</script>

<template>
  <div
    ref="root"
    class="hero-model relative mx-auto aspect-square w-full max-w-[22rem] lg:max-w-none"
    :aria-label="t('hero.modelLabel')"
  >
    <div
      class="pointer-events-none absolute inset-[8%] rounded-full bg-primary/15 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="liquid-glass absolute inset-0 rounded-[2rem] opacity-70"
      aria-hidden="true"
    />

    <div
      v-if="!loaded && !failed"
      class="absolute inset-0 z-[1] flex items-center justify-center"
      aria-hidden="true"
    >
      <span
        class="size-10 animate-pulse rounded-full border border-primary/30 bg-primary/10"
      />
    </div>

    <ClientOnly>
      <model-viewer
        v-if="visible && !failed"
        class="hero-model-viewer relative z-[2] h-full w-full"
        :src="MODEL_SRC"
        alt=""
        auto-rotate
        auto-rotate-delay="0"
        rotation-per-second="22deg"
        camera-controls
        touch-action="pan-y"
        shadow-intensity="0.65"
        exposure="1.05"
        environment-image="neutral"
        interaction-prompt="none"
        meshopt-decoder-location="/meshopt_decoder.js"
        loading="lazy"
        reveal="auto"
        @load="onLoad"
        @error="onError"
      />
      <template #fallback>
        <div class="relative z-[2] flex h-full items-center justify-center">
          <span class="size-10 animate-pulse rounded-full bg-primary/15" />
        </div>
      </template>
    </ClientOnly>

    <p
      v-if="failed"
      class="relative z-[2] flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground"
    >
      {{ t('hero.modelFallback') }}
    </p>
  </div>
</template>

<style scoped>
.hero-model-viewer {
  --progress-bar-color: color-mix(in oklch, var(--primary) 70%, transparent);
  --progress-bar-height: 2px;
  background: transparent;
  outline: none;
}

.hero-model-viewer::part(default-progress-bar) {
  display: none;
}
</style>
