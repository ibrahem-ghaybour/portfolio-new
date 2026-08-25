<script setup lang="ts">
const { personal } = usePortfolioContent()

const props = defineProps<{
  active: boolean
}>()

const emit = defineEmits<{
  complete: []
}>()

const root = ref<HTMLElement | null>(null)
const mark = ref<HTMLElement | null>(null)
const line = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const { gsap, reduced } = useGsap()

onMounted(async () => {
  await nextTick()

  if (!props.active) {
    emit('complete')
    return
  }

  if (reduced.value) {
    emit('complete')
    return
  }

  const tl = gsap.timeline({
    defaults: { ease: 'sine.out' },
    onComplete: () => emit('complete'),
  })

  gsap.set([mark.value, line.value, ring.value], { opacity: 0 })
  gsap.set(line.value, { scaleX: 0 })
  gsap.set(ring.value, { scale: 0.85 })
  gsap.set(mark.value, { y: 12, filter: 'blur(5px)' })

  tl.to(ring.value, {
    opacity: 1,
    scale: 1,
    duration: 0.75,
  })
    .to(
      line.value,
      {
        opacity: 1,
        scaleX: 1,
        duration: 0.7,
        ease: 'sine.inOut',
      },
      '-=0.35',
    )
    .to(
      mark.value,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.85,
      },
      '-=0.4',
    )
    .to({}, { duration: 0.4 })
    .to(root.value, {
      opacity: 0,
      duration: 0.55,
      ease: 'sine.inOut',
    })
})
</script>

<template>
  <div
    v-if="active"
    ref="root"
    class="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
    aria-hidden="true"
  >
    <!-- Soft brand glow -->
    <div
      class="pointer-events-none absolute inset-0"
      style="
        background:
          radial-gradient(ellipse 45% 35% at 50% 50%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%);
      "
    />

    <div class="relative flex flex-col items-center gap-5">
      <!-- Expanding ring accent -->
      <span
        ref="ring"
        class="pointer-events-none absolute top-1/2 left-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 sm:size-44"
        aria-hidden="true"
      />

      <p
        ref="mark"
        class="font-display relative z-[1] text-5xl font-bold tracking-[0.28em] text-foreground sm:text-6xl"
      >
        {{ personal.initials }}
      </p>

      <span
        ref="line"
        class="relative z-[1] h-px w-16 origin-center bg-primary sm:w-20"
        aria-hidden="true"
      />
    </div>
  </div>
</template>
