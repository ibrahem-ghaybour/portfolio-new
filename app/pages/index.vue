<script setup lang="ts">
useSiteSeo()

const { t } = useI18n()

const showIntro = ref(true)
const heroReady = ref(false)
let safetyTimer: ReturnType<typeof setTimeout> | undefined

function onIntroComplete() {
  if (!showIntro.value) return
  showIntro.value = false
  heroReady.value = true
  if (safetyTimer) clearTimeout(safetyTimer)
}

onMounted(() => {
  safetyTimer = setTimeout(() => {
    onIntroComplete()
  }, 3200)
})

onBeforeUnmount(() => {
  if (safetyTimer) clearTimeout(safetyTimer)
})
</script>

<template>
  <div class="site-atmosphere relative min-h-svh">
    <div class="site-grain" aria-hidden="true" />

    <LayoutIntroLoader :active="showIntro" @complete="onIntroComplete" />

    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      {{ t('nav.skip') }}
    </a>

    <LayoutAppHeader />

    <main id="main-content" itemscope itemtype="https://schema.org/ProfilePage">
      <meta itemprop="name" :content="t('meta.title')" />
      <meta itemprop="description" :content="t('meta.description')" />
      <SectionsHeroSection v-model:ready="heroReady" />
      <SectionsCodingForSection />
      <SectionsAboutSection />
      <SectionsSkillsSection />
      <SectionsExperienceSection />
      <SectionsProjectsSection />
      <SectionsContactSection />
    </main>

    <LayoutAppFooter />
  </div>
</template>
