<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BadgeVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { badgeVariants } from '.'

const props = withDefaults(defineProps<{
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
  as?: string
  asChild?: boolean
}>(), {
  as: 'span',
  asChild: false,
})
</script>

<template>
  <Primitive
    data-slot="badge"
    :data-variant="variant"
    :as="as"
    :as-child="asChild"
    :class="cn(badgeVariants({ variant }), props.class)"
  >
    <slot />
  </Primitive>
</template>
