<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  src: string
}

const props = defineProps<Props>()

const audio = ref<HTMLAudioElement | null>(null)
const hasStarted = ref(false)
const isPlaying = ref(false)
const playbackError = ref(false)

const buttonLabel = computed(() =>
  isPlaying.value ? 'Jeda muzik latar' : 'Mainkan muzik latar',
)

async function play(): Promise<void> {
  if (!props.src || !audio.value) return

  hasStarted.value = true
  playbackError.value = false

  try {
    await audio.value.play()
  } catch {
    isPlaying.value = false
    playbackError.value = true
  }
}

function pause(): void {
  audio.value?.pause()
}

async function togglePlayback(): Promise<void> {
  if (isPlaying.value) {
    pause()
    return
  }

  await play()
}

defineExpose({ play, pause })
</script>

<template>
  <div class="music-player">
    <audio
      ref="audio"
      :src="src || undefined"
      loop
      preload="metadata"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @error="playbackError = true"
    ></audio>

    <button
      v-if="src && hasStarted"
      class="music-player__button"
      :class="{ 'music-player__button--playing': isPlaying }"
      type="button"
      :aria-label="buttonLabel"
      :aria-pressed="isPlaying"
      @click="togglePlayback"
    >
      <span class="music-player__disc" aria-hidden="true">
        <span></span>
      </span>
    </button>

    <p v-if="playbackError && hasStarted" class="music-player__error" role="status">
      Muzik tidak dapat dimainkan.
    </p>
  </div>
</template>

<style scoped>
.music-player {
  position: relative;
  z-index: 60;
}

.music-player__button {
  position: fixed;
  z-index: 60;
  top: max(var(--space-4), env(safe-area-inset-top));
  right: var(--space-4);
  display: grid;
  width: 2.9rem;
  min-height: 2.9rem;
  padding: 0;
  border: 1px solid rgb(168 134 82 / 40%);
  border-radius: 50%;
  color: var(--color-gold);
  background: rgb(253 251 247 / 90%);
  box-shadow: 0 0.5rem 1.5rem rgb(51 42 33 / 16%);
  cursor: pointer;
  backdrop-filter: blur(0.75rem);
  -webkit-backdrop-filter: blur(0.75rem);
  place-items: center;
}

.music-player__disc {
  position: relative;
  display: grid;
  width: 1.65rem;
  height: 1.65rem;
  border: 1px solid currentColor;
  border-radius: 50%;
  place-items: center;
}

.music-player__disc::before,
.music-player__disc::after {
  position: absolute;
  border: 1px solid currentColor;
  border-radius: 50%;
  content: '';
  opacity: 0.45;
}

.music-player__disc::before {
  inset: 0.28rem;
}

.music-player__disc::after {
  inset: 0.55rem;
  background: currentColor;
}

.music-player__button--playing .music-player__disc {
  animation: music-spin 4s linear infinite;
}

.music-player__button:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

.music-player__error {
  position: fixed;
  z-index: 59;
  top: max(4.2rem, calc(env(safe-area-inset-top) + 4.2rem));
  right: var(--space-4);
  max-width: 13rem;
  margin: 0;
  padding: var(--space-2) var(--space-3);
  border-radius: 0.5rem;
  color: var(--color-text);
  background: rgb(253 251 247 / 94%);
  box-shadow: 0 0.5rem 1.5rem rgb(51 42 33 / 12%);
  font-size: 0.72rem;
}

@keyframes music-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .music-player__button--playing .music-player__disc {
    animation: none;
  }
}
</style>
