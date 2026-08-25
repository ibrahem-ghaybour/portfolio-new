<script setup lang="ts">
import { Menu, X } from '@lucide/vue'

const { t } = useI18n()
const { personal, navLinks } = usePortfolioContent()

const open = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function close() {
  open.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(open, (value) => {
  if (!import.meta.client) return
  document.body.style.overflow = value ? 'hidden' : ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-300"
    :class="
      scrolled || open
        ? 'border-b border-border/60 bg-background/75 backdrop-blur-xl'
        : 'border-b border-transparent bg-transparent'
    "
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
      <a
        href="#top"
        class="font-display text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        @click="close"
      >
        {{ personal.initials }}
      </a>

      <nav class="hidden items-center gap-6 lg:flex" :aria-label="t('nav.primary')">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-1">
        <LayoutLocaleToggle />
        <LayoutThemeToggle />
        <Button
          as="a"
          href="#contact"
          size="sm"
          class="ms-1 hidden md:inline-flex"
        >
          {{ t('nav.contact') }}
        </Button>

        <button
          type="button"
          class="ms-1 inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :aria-label="open ? t('nav.closeMenu') : t('nav.openMenu')"
          @click="open = !open"
        >
          <X v-if="open" class="size-5" aria-hidden="true" />
          <Menu v-else class="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div
      id="mobile-nav"
      class="border-t border-border bg-background lg:hidden"
      :class="open ? 'block' : 'hidden'"
    >
      <nav class="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4" :aria-label="t('nav.mobile')">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          @click="close"
        >
          {{ link.label }}
        </a>
        <Button as="a" href="#contact" class="mt-2" @click="close">
          {{ t('nav.contact') }}
        </Button>
      </nav>
    </div>
  </header>
</template>
