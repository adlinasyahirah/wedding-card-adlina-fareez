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
  window.setTimeout(() => {
    isInvitationOpen.value = true
  }, 520)
}
</script>

<template>
  <main id="main-content" class="site-shell">
    <MusicPlayer ref="musicPlayer" :src="wedding.music" />
    <Transition name="invitation" mode="out-in">
      <Home
        v-if="!isInvitationOpen"
        key="cover"
        @open-invitation="openInvitation"
      />
      <div v-else key="invitation" class="invitation-content">
        <MainSection />
        <Jemputan />
        <EventSection />
        <TentativeSection />
        <CountdownSection />
        <GuestbookSection />
        <ContactSection />
        <BottomNavigation />
      </div>
    </Transition>
  </main>
</template>

<style scoped>
.invitation-content { overflow: clip; }

.invitation-enter-active {
  transition: opacity 720ms ease, transform 850ms cubic-bezier(.2,.75,.2,1), filter 720ms ease;
}

.invitation-enter-from {
  opacity: 0;
  filter: blur(5px);
  transform: translateY(2rem) scale(0.985);
}

.invitation-enter-to { opacity: 1; filter: blur(0); transform: none; }
.invitation-leave-active { transition: opacity 120ms ease; }
.invitation-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .invitation-enter-active,
  .invitation-leave-active { transition-duration: 1ms; }
}
</style>
