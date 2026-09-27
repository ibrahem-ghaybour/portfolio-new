<script setup lang="ts">
import { Menu, X } from '@lucide/vue'

const { t } = useI18n()
const { personal, navLinks } = usePortfolioContent()

const open = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 16
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
  <header class="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
    <div
      class="mx-auto max-w-6xl overflow-hidden rounded-2xl transition-[background,border-color,box-shadow,backdrop-filter] duration-300"
      :class="
        scrolled || open
          ? 'liquid-glass-nav'
          : 'border border-transparent bg-transparent'
      "
    >
      <div class="flex h-14 items-center justify-between gap-3 px-4 sm:h-16 sm:px-5">
        <a
          href="#top"
          class="font-display text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          @click="close"
        >
          {{ personal.initials }}
        </a>

        <nav class="hidden items-center gap-1 lg:flex" :aria-label="t('nav.primary')">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            class="liquid-glass-chip ms-1 inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
        class="border-t border-border/40 lg:hidden"
        :class="open ? 'block' : 'hidden'"
      >
        <nav class="flex flex-col gap-1 px-3 py-3" :aria-label="t('nav.mobile')">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            @click="close"
          >
            {{ link.label }}
          </a>
          <Button as="a" href="#contact" class="mt-1" @click="close">
            {{ t('nav.contact') }}
          </Button>
        </nav>
      </div>
    </div>
  </header>
</template>
