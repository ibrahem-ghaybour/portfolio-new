<script setup lang="ts">
const { t, locale } = useI18n()
const reduced = useReducedMotion()

const MODEL_SRC = '/obj/hero-model.glb?v=2'

/** Face rests angled toward content (left); wider yaw when pointer is left. */
const BASE_THETA = 38
const BASE_PHI = 78
const MAX_YAW_LEFT = 72
const MAX_YAW_RIGHT = 34
const MAX_PITCH = 16
const LERP = 0.1

const root = ref<HTMLElement | null>(null)
const viewer = ref<HTMLElement | null>(null)
const visible = ref(false)
const loaded = ref(false)
const failed = ref(false)

const target = { x: 0, y: 0 }
const current = { x: 0, y: 0 }

let observer: IntersectionObserver | undefined
let raf = 0
let tracking = false

const rtlFactor = computed(() => (locale.value === 'ar' ? -1 : 1))

function setOrbit(theta: number, phi: number) {
  const el = viewer.value as (HTMLElement & { cameraOrbit?: string }) | null
  if (!el) return
  el.cameraOrbit = `${theta.toFixed(2)}deg ${phi.toFixed(2)}deg auto`
}

function tick() {
  current.x += (target.x - current.x) * LERP
  current.y += (target.y - current.y) * LERP

  // Pointer left (x < 0) uses a larger yaw so the face turns further that way
  const yawRange = current.x <= 0 ? MAX_YAW_LEFT : MAX_YAW_RIGHT
  const theta = BASE_THETA - current.x * yawRange * rtlFactor.value
  const phi = BASE_PHI + current.y * -MAX_PITCH
  setOrbit(theta, phi)

  raf = requestAnimationFrame(tick)
}

function updateTargetFromPoint(clientX: number, clientY: number) {
  if (!root.value) return
  const rect = root.value.getBoundingClientRect()
  const nx = (clientX - (rect.left + rect.width / 2)) / (rect.width * 0.55)
  const ny = (clientY - (rect.top + rect.height / 2)) / (rect.height * 0.55)
  target.x = Math.max(-1, Math.min(1, nx))
  target.y = Math.max(-1, Math.min(1, ny))
}

function onPointerMove(event: PointerEvent) {
  if (reduced.value || !loaded.value) return
  updateTargetFromPoint(event.clientX, event.clientY)
}

function onPointerLeaveWindow() {
  target.x = 0
  target.y = 0
}

function startTracking() {
  if (tracking || !import.meta.client || reduced.value) return
  tracking = true
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', onPointerLeaveWindow)
  document.documentElement.addEventListener('mouseleave', onPointerLeaveWindow)
  raf = requestAnimationFrame(tick)
}

function stopTracking() {
  if (!tracking) return
  tracking = false
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerleave', onPointerLeaveWindow)
  document.documentElement.removeEventListener('mouseleave', onPointerLeaveWindow)
  cancelAnimationFrame(raf)
  target.x = 0
  target.y = 0
  current.x = 0
  current.y = 0
  setOrbit(BASE_THETA, BASE_PHI)
}

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
  stopTracking()
})

watch(loaded, (value) => {
  if (value && !reduced.value) startTracking()
})

watch(reduced, (value) => {
  if (value) stopTracking()
  else if (loaded.value) startTracking()
})

function onLoad() {
  loaded.value = true
  setOrbit(BASE_THETA, BASE_PHI)
}

function onError() {
  failed.value = true
  stopTracking()
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
        ref="viewer"
        class="hero-model-viewer relative z-[2] h-full w-full"
        :src="MODEL_SRC"
        alt=""
        :camera-orbit="`${BASE_THETA}deg ${BASE_PHI}deg auto`"
        interpolation-decay="90"
        disable-zoom
        disable-tap
        disable-pan
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
  /* Let page scroll; orbit is driven by pointer tracking */
  pointer-events: none;
}

.hero-model-viewer::part(default-progress-bar) {
  display: none;
}
</style>
