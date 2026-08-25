<script setup lang="ts">
import { Mail, MapPin, Phone } from '@lucide/vue'

const { t } = useI18n()
const { personal, contact } = usePortfolioContent()

const root = ref<HTMLElement | null>(null)
const { reveal } = useGsap()

const contacts = computed(() => [
  {
    label: t('contact.email'),
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: Mail,
  },
  {
    label: t('contact.phone'),
    value: contact.phone,
    href: `tel:${contact.phone}`,
    icon: Phone,
  },
  {
    label: t('contact.location'),
    value: personal.value.location,
    href: undefined as string | undefined,
    icon: MapPin,
  },
])

onMounted(async () => {
  await nextTick()
  const items = root.value?.querySelectorAll('[data-reveal]')
  if (items?.length && root.value) reveal(items, { trigger: root.value })
})
</script>

<template>
  <section
    id="contact"
    ref="root"
    class="scroll-mt-24 border-t border-border/70 py-20 sm:py-28"
    aria-labelledby="contact-heading"
  >
    <div class="mx-auto max-w-6xl px-5 sm:px-8">
      <div data-reveal class="max-w-2xl">
        <p class="mb-3 text-sm font-medium tracking-[0.16em] text-primary uppercase">
          {{ t('contact.eyebrow') }}
        </p>
        <h2
          id="contact-heading"
          class="font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {{ t('contact.heading') }}
        </h2>
        <p class="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {{ personal.availability }}
        </p>
      </div>

      <ul class="mt-12 grid gap-4 sm:grid-cols-3">
        <li
          v-for="item in contacts"
          :key="item.label"
          data-reveal
          class="border border-border bg-card/50 p-5 transition-colors duration-300 hover:border-primary/30"
        >
          <component
            :is="item.icon"
            class="size-5 text-primary"
            aria-hidden="true"
          />
          <p class="mt-4 text-sm font-medium text-muted-foreground">
            {{ item.label }}
          </p>
          <a
            v-if="item.href"
            :href="item.href"
            class="mt-1 inline-block text-base font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {{ item.value }}
          </a>
          <p v-else class="mt-1 text-base font-medium text-foreground">
            {{ item.value }}
          </p>
        </li>
      </ul>

      <div data-reveal class="mt-10">
        <Button as="a" :href="`mailto:${contact.email}`" size="lg">
          {{ t('contact.sendEmail') }}
        </Button>
      </div>
    </div>
  </section>
</template>
