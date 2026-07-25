<script setup lang="ts">
import { ref } from 'vue'
import BottomNavigation from './components/BottomNavigation.vue'
import ContactSection from './components/ContactSection.vue'
import CountdownSection from './components/CountdownSection.vue'
import Jemputan from './components/Jemputan.vue'
import EventSection from './components/EventSection.vue'
import GuestbookSection from './components/GuestbookSection.vue'
import MainSection from './components/MainSection.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import Home from './components/Home.vue'
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
    <Home v-if="!isInvitationOpen" @open-invitation="openInvitation" />
    <template v-else>
      <MainSection />
      <Jemputan />
      <EventSection />
      <TentativeSection />
      <CountdownSection />
      <GuestbookSection />
      <ContactSection />
      <BottomNavigation />
    </template>
  </main>
</template>
