<script setup lang="ts">
import { ref } from 'vue'
import BottomNavigation from './components/BottomNavigation.vue'
import ContactSection from './components/ContactSection.vue'
import CountdownSection from './components/CountdownSection.vue'
import CoupleSection from './components/CoupleSection.vue'
import EventSection from './components/EventSection.vue'
import GallerySection from './components/GallerySection.vue'
import GiftSection from './components/GiftSection.vue'
import HeroSection from './components/HeroSection.vue'
import MapsSection from './components/MapsSection.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import OpeningCover from './components/OpeningCover.vue'
import ParentsSection from './components/ParentsSection.vue'
import TentativeSection from './components/TentativeSection.vue'
import { wedding } from './data/wedding'

interface MusicPlayerInstance {
  play: () => Promise<void>
  pause: () => void
}

const isInvitationOpen = ref(false)
const musicPlayer = ref<MusicPlayerInstance | null>(null)

function openInvitation(): void {
  void musicPlayer.value?.play()
  isInvitationOpen.value = true
}
</script>

<template>
  <main id="main-content" class="site-shell">
    <MusicPlayer ref="musicPlayer" :src="wedding.music" />
    <OpeningCover v-if="!isInvitationOpen" @open-invitation="openInvitation" />
    <template v-else>
      <HeroSection />
      <CountdownSection />
      <CoupleSection />
      <ParentsSection />
      <EventSection />
      <TentativeSection />
      <GallerySection />
      <MapsSection />
      <GiftSection />
      <ContactSection />
      <BottomNavigation />
    </template>
  </main>
</template>
