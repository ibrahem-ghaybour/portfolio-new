<script setup lang="ts">
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
  }, 2200)
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
      href="#top"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      Skip to content
    </a>

    <LayoutAppHeader />

    <main>
      <SectionsHeroSection v-model:ready="heroReady" />
      <SectionsAboutSection />
      <SectionsSkillsSection />
      <SectionsExperienceSection />
      <SectionsProjectsSection />
      <SectionsContactSection />
    </main>

    <LayoutAppFooter />
  </div>
</template>
