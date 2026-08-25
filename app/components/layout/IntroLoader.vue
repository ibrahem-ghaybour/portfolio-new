<script setup lang="ts">
const { personal, isRtl } = usePortfolioContent()
const { locale } = useI18n()

const props = defineProps<{
  active: boolean
}>()

const emit = defineEmits<{
  complete: []
}>()

const root = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const signature = ref<HTMLElement | null>(null)
const pen = ref<HTMLElement | null>(null)
const tipGlow = ref<HTMLElement | null>(null)
const line = ref<SVGPathElement | null>(null)
const flourish = ref<SVGSVGElement | null>(null)
const { gsap, reduced } = useGsap()

function placePen(x: number, y: number, angle = -28) {
  if (!pen.value) return
  gsap.set(pen.value, {
    x,
    y,
    rotate: angle,
    transformOrigin: '12% 88%',
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

  if (import.meta.client && document.fonts?.ready) {
    await document.fonts.ready.catch(() => undefined)
  }
  await nextTick()

  const stageBox = stage.value!.getBoundingClientRect()
  const textBox = signature.value!.getBoundingClientRect()
  const rtl = isRtl.value

  const textLeft = textBox.left - stageBox.left
  const textTop = textBox.top - stageBox.top
  const textWidth = textBox.width
  const textHeight = textBox.height

  // Pen tip sits near the writing baseline
  const startX = rtl ? textLeft + textWidth : textLeft
  const endX = rtl ? textLeft : textLeft + textWidth
  const writeY = textTop + textHeight * 0.72

  gsap.set(signature.value, {
    clipPath: rtl ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
    opacity: 1,
  })

  gsap.set(pen.value, { opacity: 1, scale: 0.92 })
  placePen(startX, writeY - 8, rtl ? 28 : -28)

  if (line.value) {
    const length = line.value.getTotalLength()
    gsap.set(line.value, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
    })
  }

  const writeProgress = { t: 0 }
  const tl = gsap.timeline({
    defaults: { ease: 'power1.inOut' },
    onComplete: () => emit('complete'),
  })

  // Soft entrance for pen
  tl.fromTo(
    pen.value,
    { opacity: 0, scale: 0.7, y: writeY + 18 },
    { opacity: 1, scale: 1, y: writeY - 8, duration: 0.35, ease: 'back.out(1.6)' },
  )

  // Write the name + move the pen
  tl.to(
    writeProgress,
    {
      t: 1,
      duration: 1.85,
      ease: 'power1.inOut',
      onUpdate: () => {
        const p = writeProgress.t
        const x = startX + (endX - startX) * p
        const wobble = Math.sin(p * Math.PI * 6) * 2.2
        placePen(x, writeY - 8 + wobble, rtl ? 28 : -28)

        if (rtl) {
          gsap.set(signature.value, {
            clipPath: `inset(0 0 0 ${(1 - p) * 100}%)`,
          })
        } else {
          gsap.set(signature.value, {
            clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`,
          })
        }

        if (tipGlow.value) {
          gsap.set(tipGlow.value, { opacity: 0.35 + Math.sin(p * Math.PI * 8) * 0.2 })
        }
      },
    },
    '-=0.05',
  )

  // Flourish underline with pen following the path
  if (line.value && flourish.value) {
    const path = line.value
    const length = path.getTotalLength()
    const svgBox = flourish.value.getBoundingClientRect()
    const flourishProgress = { t: 0 }

    tl.to(
      flourishProgress,
      {
        t: 1,
        duration: 0.85,
        ease: 'power1.out',
        onUpdate: () => {
          const p = flourishProgress.t
          gsap.set(path, { strokeDashoffset: length * (1 - p) })

          const point = path.getPointAtLength(length * p)
          const scaleX = svgBox.width / 400
          const scaleY = svgBox.height / 36
          const x = svgBox.left - stageBox.left + point.x * scaleX
          const y = svgBox.top - stageBox.top + point.y * scaleY
          placePen(x, y - 6, rtl ? 18 : -35)
        },
      },
      '-=0.12',
    )
  }

  // Lift pen and fade out
  tl.to(pen.value, {
    y: '-=18',
    opacity: 0,
    duration: 0.35,
    ease: 'power2.in',
  })

  tl.to(
    root.value,
    {
      opacity: 0,
      duration: 0.45,
      delay: 0.15,
      ease: 'power2.inOut',
    },
    '-=0.05',
  )
})
</script>

<template>
  <div
    v-if="active"
    ref="root"
    class="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background px-6"
    aria-hidden="true"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-70"
      style="
        background:
          radial-gradient(ellipse 55% 40% at 50% 48%, color-mix(in oklch, var(--primary) 16%, transparent), transparent 70%);
      "
    />

    <div ref="stage" class="relative w-full max-w-3xl">
      <div class="relative mx-auto w-fit max-w-full px-2 py-6">
        <p
          ref="signature"
          class="signature-name relative z-[1] text-[clamp(2.6rem,8.5vw,5rem)] leading-[1.15] text-foreground"
          :class="locale === 'ar' ? 'font-arabic-signature' : 'font-signature'"
        >
          {{ personal.fullName }}
        </p>

        <!-- Writing pen -->
        <div
          ref="pen"
          class="pointer-events-none absolute top-0 left-0 z-20 opacity-0"
          style="width: 54px; height: 54px"
        >
          <span
            ref="tipGlow"
            class="absolute bottom-[6px] left-[4px] size-3 rounded-full bg-primary/50 blur-[5px]"
          />
          <svg
            viewBox="0 0 64 64"
            class="size-full drop-shadow-[0_6px_12px_oklch(0.2_0.02_240/0.35)]"
            aria-hidden="true"
          >
            <!-- fountain pen body -->
            <path
              d="M18 52 L46 10 C48 7 52 8 53 11 L54 14 C55 17 52 20 49 22 L21 54 C19 56 16 55 16 52 Z"
              fill="oklch(0.42 0.075 195)"
            />
            <path
              d="M46 10 C48 7 52 8 53 11 L49 22 C52 20 55 17 54 14 Z"
              fill="oklch(0.62 0.06 185)"
            />
            <path
              d="M20 50 L48 14"
              stroke="oklch(0.92 0.02 95)"
              stroke-width="1.2"
              stroke-linecap="round"
              opacity="0.55"
            />
            <!-- nib -->
            <path
              d="M18 52 L12 58 L21 54 Z"
              fill="oklch(0.78 0.05 85)"
            />
            <circle cx="15.5" cy="55.5" r="1.1" fill="oklch(0.35 0.04 230)" />
          </svg>
        </div>
      </div>

      <svg
        ref="flourish"
        class="mx-auto -mt-1 h-9 w-[min(100%,30rem)] overflow-visible text-primary"
        viewBox="0 0 400 36"
        fill="none"
        aria-hidden="true"
      >
        <path
          ref="line"
          d="M12 24 C 55 10, 95 30, 140 18 S 220 8, 265 22 S 340 8, 388 20"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          opacity="0"
        />
      </svg>

      <p
        class="mt-5 text-center text-[0.7rem] tracking-[0.42em] text-muted-foreground uppercase"
      >
        {{ personal.initials }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.font-signature {
  font-family: "Great Vibes", cursive;
  font-weight: 400;
  letter-spacing: 0.03em;
  text-shadow: 0 1px 0 color-mix(in oklch, var(--foreground) 8%, transparent);
}

.font-arabic-signature {
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-weight: 600;
  letter-spacing: 0;
}

.signature-name {
  will-change: clip-path;
}
</style>
