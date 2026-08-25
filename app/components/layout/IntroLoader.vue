<script setup lang="ts">
const { personal } = usePortfolioContent()

const props = defineProps<{
  active: boolean
}>()

const emit = defineEmits<{
  complete: []
}>()

const root = ref<HTMLElement | null>(null)
const binaryLayer = ref<HTMLElement | null>(null)
const decodeLayer = ref<HTMLElement | null>(null)
const mark = ref<HTMLElement | null>(null)
const line = ref<HTMLElement | null>(null)
const { gsap, reduced } = useGsap()

const BITS = 96
const binaryBits = ref(
  Array.from({ length: BITS }, () => (Math.random() > 0.5 ? '1' : '0')),
)

const decodeSlots = ref([
  { display: '0', final: 'I' },
  { display: '1', final: 'G' },
])

let scrambleTimers: ReturnType<typeof setInterval>[] = []

function clearScramble() {
  scrambleTimers.forEach(clearInterval)
  scrambleTimers = []
}

function startBitFlicker() {
  const id = setInterval(() => {
    binaryBits.value = binaryBits.value.map(() =>
      Math.random() > 0.5 ? '1' : '0',
    )
  }, 70)
  scrambleTimers.push(id)
}

function startDecodeScramble() {
  decodeSlots.value.forEach((slot, index) => {
    const id = setInterval(() => {
      slot.display = Math.random() > 0.5 ? '1' : '0'
    }, 55 + index * 15)
    scrambleTimers.push(id)
  })
}

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

  startBitFlicker()
  startDecodeScramble()

  const tl = gsap.timeline({
    defaults: { ease: 'sine.out' },
    onComplete: () => {
      clearScramble()
      emit('complete')
    },
  })

  gsap.set(binaryLayer.value, { opacity: 0 })
  gsap.set(decodeLayer.value, { opacity: 0, y: 8 })
  gsap.set(mark.value, { opacity: 0, scale: 0.94 })
  gsap.set(line.value, { scaleX: 0, opacity: 0 })

  tl.to(binaryLayer.value, { opacity: 0.45, duration: 0.45 })
    .to(decodeLayer.value, { opacity: 1, y: 0, duration: 0.4 }, '-=0.15')
    .to({}, { duration: 0.55 })
    .add(() => {
      clearScramble()
      // keep ambient bit flicker slower briefly
      const idle = setInterval(() => {
        binaryBits.value = binaryBits.value.map((bit, i) =>
          Math.random() > 0.82 ? (bit === '0' ? '1' : '0') : bit,
        )
      }, 120)
      scrambleTimers.push(idle)

      decodeSlots.value[0]!.display = 'I'
      decodeSlots.value[1]!.display = 'G'
    })
    .to(decodeLayer.value, { opacity: 0, y: -6, duration: 0.35 }, '+=0.15')
    .to(
      mark.value,
      { opacity: 1, scale: 1, duration: 0.55, ease: 'sine.out' },
      '-=0.15',
    )
    .to(
      line.value,
      { opacity: 1, scaleX: 1, duration: 0.5, ease: 'sine.inOut' },
      '-=0.3',
    )
    .to({}, { duration: 0.35 })
    .to(binaryLayer.value, { opacity: 0, duration: 0.4 }, '-=0.1')
    .to(root.value, { opacity: 0, duration: 0.5, ease: 'sine.inOut' })
})

onBeforeUnmount(() => {
  clearScramble()
})
</script>

<template>
  <div
    v-if="active"
    ref="root"
    class="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
    aria-hidden="true"
  >
    <div
      class="pointer-events-none absolute inset-0"
      style="
        background:
          radial-gradient(ellipse 45% 35% at 50% 50%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 70%);
      "
    />

    <!-- Binary field -->
    <div
      ref="binaryLayer"
      class="pointer-events-none absolute inset-0 flex flex-wrap content-center justify-center gap-x-2 gap-y-1 overflow-hidden px-4 opacity-0 select-none sm:gap-x-3"
    >
      <span
        v-for="(bit, index) in binaryBits"
        :key="index"
        class="font-mono text-[0.65rem] text-primary/50 sm:text-xs"
        :class="bit === '1' ? 'text-primary/70' : 'text-muted-foreground/35'"
      >
        {{ bit }}
      </span>
    </div>

    <div class="relative z-[1] flex flex-col items-center gap-5">
      <div class="relative flex h-16 items-center justify-center sm:h-20">
        <!-- Scrambling 0/1 → IG -->
        <div
          ref="decodeLayer"
          class="font-mono flex gap-3 text-4xl font-semibold tracking-[0.35em] text-primary tabular-nums sm:text-5xl"
        >
          <span
            v-for="(slot, index) in decodeSlots"
            :key="index"
            class="inline-block min-w-[1.1em] text-center"
          >
            {{ slot.display }}
          </span>
        </div>

        <!-- Final monogram -->
        <p
          ref="mark"
          class="font-display absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-[0.28em] text-foreground opacity-0 sm:text-6xl"
        >
          {{ personal.initials }}
        </p>
      </div>

      <span
        ref="line"
        class="h-px w-16 origin-center bg-primary opacity-0 sm:w-20"
      />
    </div>
  </div>
</template>
