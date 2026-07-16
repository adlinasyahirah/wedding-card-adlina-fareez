<script setup lang="ts">
import { computed } from 'vue'
import { wedding } from '../data/wedding'
import floralFrameDesktop from '../assets/images/opening-floral-frame-desktop.png'
import floralFrame from '../assets/images/opening-floral-frame.png'

interface Props {
  backgroundImage?: string
  desktopBackgroundImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  backgroundImage: floralFrame,
  desktopBackgroundImage: floralFrameDesktop,
})

const emit = defineEmits<{
  openInvitation: []
}>()

const coverStyle = computed(() => ({
  '--opening-background-mobile': `url("${props.backgroundImage}")`,
  '--opening-background-desktop': `url("${props.desktopBackgroundImage}")`,
}))

const weddingDay = computed(() =>
  new Intl.DateTimeFormat('ms-MY', { weekday: 'long' })
    .format(new Date(wedding.dateTime))
    .toUpperCase(),
)

function openInvitation(): void {
  emit('openInvitation')
}
</script>

<template>
  <section
    class="opening-cover"
    aria-labelledby="opening-title"
  >
    <div class="opening-cover__card" :style="coverStyle">
      <div class="opening-cover__content">
        <p class="opening-cover__eyebrow">
          <span>{{ wedding.ceremonyTitle }}</span>
        </p>

        <h1 id="opening-title" class="opening-cover__names">
          <span>{{ wedding.bride.name }}</span>
          <span class="opening-cover__ampersand" aria-hidden="true">&amp;</span>
          <span>{{ wedding.groom.name }}</span>
        </h1>

        <div class="opening-cover__details">
          <p>{{ weddingDay }}</p>
          <time :datetime="wedding.dateTime">{{ wedding.date }}</time>
          <p v-if="wedding.hashtag" class="opening-cover__hashtag">
            {{ wedding.hashtag }}
          </p>
        </div>

        <button class="opening-cover__button" type="button" @click="openInvitation">
          Buka
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.opening-cover {
  display: grid;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  background: var(--color-cream-50);
}

.opening-cover__card {
  position: relative;
  display: grid;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  color: var(--color-text);
  background-image: var(--opening-background-mobile);
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.opening-cover__content {
  display: flex;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(5.75rem, 13vh, 8rem) clamp(3.5rem, 13vw, 5.5rem);
  text-align: center;
}

.opening-cover__content > * {
  width: min(100%, 48rem);
  margin-inline: auto;
}

.opening-cover__eyebrow {
  display: grid;
  gap: var(--space-1);
  margin: 0 0 clamp(2rem, 6vh, 3.5rem);
  font-size: clamp(0.72rem, 3vw, 0.9rem);
  letter-spacing: 0.12em;
  line-height: 1.55;
  text-transform: uppercase;
}

.opening-cover__names {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  color: var(--color-primary);
  font-family: 'Snell Roundhand', 'Brush Script MT', 'Segoe Script', cursive;
  font-size: clamp(3.75rem, 18vw, 6.25rem);
  font-weight: 400;
  line-height: 0.78;
  letter-spacing: 0.01em;
}

.opening-cover__ampersand {
  margin-block: var(--space-4);
  color: inherit;
  font-family: var(--font-display);
  font-size: 0.42em;
  line-height: 1;
}

.opening-cover__details {
  margin-top: clamp(2.5rem, 7vh, 4rem);
  font-size: clamp(0.72rem, 3vw, 0.88rem);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.opening-cover__details p,
.opening-cover__details time {
  display: block;
  margin: 0;
}

.opening-cover__details time {
  margin-top: var(--space-1);
}

.opening-cover__hashtag {
  margin-top: var(--space-4) !important;
  padding-top: var(--space-3);
  border-top: 1px solid rgb(189 63 112 / 25%);
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 0.82rem;
  letter-spacing: 0.02em;
  text-transform: none;
}

.opening-cover__button {
  width: fit-content;
  min-width: 1rem;
  margin-top: clamp(1.5rem, 4vh, .5rem);
  padding: 0.52rem 1.35rem;
  border: 1px solid var(--color-primary);
  border-radius: 999px;
  color: var(--color-white);
  background: var(--color-primary);
  cursor: pointer;
  font-size: 0.91rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition:
    color var(--transition-base),
    background-color var(--transition-base),
    transform var(--transition-base);
}

.opening-cover__button:hover {
  color: var(--color-primary);
  background: var(--color-white);
}

.opening-cover__button:active {
  transform: scale(0.98);
}

.opening-cover__button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
}

@media (min-width: 48rem) {
  .opening-cover__card {
    background-image: var(--opening-background-desktop);
  }

  .opening-cover__content {
    padding-inline: clamp(6rem, 15vw, 14rem);
  }
}
</style>
