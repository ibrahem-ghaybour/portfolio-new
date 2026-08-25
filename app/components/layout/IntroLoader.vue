<script setup lang="ts">
import { personal } from '~/data/portfolio'

const props = defineProps<{
  active: boolean
}>()

const emit = defineEmits<{
  complete: []
}>()

const root = ref<HTMLElement | null>(null)
const mark = ref<HTMLElement | null>(null)
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
    defaults: { ease: 'power2.out' },
    onComplete: () => emit('complete'),
  })

  tl.fromTo(
    mark.value,
    { opacity: 0, scale: 0.92, filter: 'blur(4px)' },
    { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.55 },
  )
    .to(mark.value, { opacity: 0, y: -12, duration: 0.35, delay: 0.25 })
    .to(root.value, { opacity: 0, duration: 0.35 }, '-=0.15')
})
</script>

<template>
  <div
    v-if="active"
    ref="root"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    aria-hidden="true"
  >
    <p
      ref="mark"
      class="font-display text-5xl font-bold tracking-[0.2em] text-foreground sm:text-6xl"
    >
      {{ personal.initials }}
    </p>
  </div>
</template>
