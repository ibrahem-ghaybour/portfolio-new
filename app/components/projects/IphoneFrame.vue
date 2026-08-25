<script setup lang="ts">
defineProps<{
  /** Slight lift on hover when wrapped by a group */
  interactive?: boolean
}>()
</script>

<template>
  <div
    class="iphone-frame relative mx-auto w-full"
    :class="
      interactive
        ? 'transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0'
        : undefined
    "
  >
    <!-- Outer titanium-like shell -->
    <div
      class="relative overflow-hidden rounded-[2.15rem] bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-500 p-[2.5px] shadow-[0_22px_48px_-20px_oklch(0.24_0.025_240/0.55)] dark:from-neutral-600 dark:via-neutral-700 dark:to-neutral-800"
    >
      <!-- Inner bezel -->
      <div class="relative overflow-hidden rounded-[2rem] bg-neutral-950 p-[7px]">
        <!-- Side buttons (visual only) -->
        <span
          class="pointer-events-none absolute -start-[3px] top-[18%] h-7 w-[2.5px] rounded-s-sm bg-neutral-400 dark:bg-neutral-500"
          aria-hidden="true"
        />
        <span
          class="pointer-events-none absolute -start-[3px] top-[28%] h-11 w-[2.5px] rounded-s-sm bg-neutral-400 dark:bg-neutral-500"
          aria-hidden="true"
        />
        <span
          class="pointer-events-none absolute -start-[3px] top-[40%] h-11 w-[2.5px] rounded-s-sm bg-neutral-400 dark:bg-neutral-500"
          aria-hidden="true"
        />
        <span
          class="pointer-events-none absolute -end-[3px] top-[30%] h-14 w-[2.5px] rounded-e-sm bg-neutral-400 dark:bg-neutral-500"
          aria-hidden="true"
        />

        <!-- Screen -->
        <div class="relative overflow-hidden rounded-[1.55rem] bg-[#0a0a0a]">
          <!-- Dynamic Island -->
          <div
            class="pointer-events-none absolute inset-x-0 top-2.5 z-10 flex justify-center"
            aria-hidden="true"
          >
            <div
              class="h-[1.15rem] w-[28%] max-w-[6.5rem] rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
            />
          </div>

          <slot />

          <!-- Home indicator -->
          <div
            class="pointer-events-none absolute inset-x-0 bottom-1.5 z-10 flex justify-center"
            aria-hidden="true"
          >
            <div class="h-[3px] w-[34%] max-w-[7rem] rounded-full bg-white/35" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
