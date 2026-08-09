<script setup lang="ts">
import { computed, ref } from 'vue'
import { wedding } from '../data/wedding'
import openingFloralLeft from '../assets/images/opening-floral-left.webp'
import openingFloralRight from '../assets/images/opening-floral-right.webp'

const emit = defineEmits<{
  openInvitation: []
}>()

const isOpening = ref(false)

const weddingDay = computed(() =>
  new Intl.DateTimeFormat('ms-MY', { weekday: 'long' })
    .format(new Date(wedding.dateTime))
    .toUpperCase(),
)

function openInvitation(): void {
  if (isOpening.value) return
  isOpening.value = true
  emit('openInvitation')
}
</script>

<template>
  <section
    class="opening-cover"
    :class="{ 'is-opening': isOpening }"
    aria-labelledby="opening-title"
  >
    <div class="opening-cover__card">
      <img
        class="opening-cover__botanical opening-cover__botanical--left"
        :src="openingFloralLeft"
        alt=""
        aria-hidden="true"
      >
      <img
        class="opening-cover__botanical opening-cover__botanical--right"
        :src="openingFloralRight"
        alt=""
        aria-hidden="true"
      >

      <div class="opening-cover__content">
        <p class="opening-cover__eyebrow">{{ wedding.ceremonyTitle }}</p>

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

        <button
          class="opening-cover__button"
          type="button"
          :disabled="isOpening"
          @click="openInvitation"
        >
          <span>{{ isOpening ? 'Membuka…' : 'Buka' }}</span>
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
  padding: clamp(0.45rem, 1.6vw, 1rem);
  background: #fffdfb;
  transform-origin: center;
}

.opening-cover__card {
  --scallop-width: clamp(4.5rem, 12vw, 8rem);
  --scallop-depth: clamp(1.35rem, 3vw, 2.25rem);
  position: relative;
  display: grid;
  width: 100%;
  min-height: calc(100vh - 0.9rem);
  min-height: calc(100svh - 0.9rem);
  overflow: hidden;
  border-radius: clamp(2.75rem, 6vw, 5rem);
  color: #55514f;
  background: #f9d7dc;
  -webkit-mask:
    radial-gradient(
      ellipse calc(var(--scallop-width) / 2) var(--scallop-depth) at 50% 100%,
      #000 98%,
      transparent 100%
    ) top left / var(--scallop-width) var(--scallop-depth) repeat-x,
    radial-gradient(
      ellipse calc(var(--scallop-width) / 2) var(--scallop-depth) at 50% 0%,
      #000 98%,
      transparent 100%
    ) bottom left / var(--scallop-width) var(--scallop-depth) repeat-x,
    radial-gradient(
      ellipse var(--scallop-depth) calc(var(--scallop-width) / 2) at 100% 50%,
      #000 98%,
      transparent 100%
    ) top left / var(--scallop-depth) var(--scallop-width) repeat-y,
    radial-gradient(
      ellipse var(--scallop-depth) calc(var(--scallop-width) / 2) at 0% 50%,
      #000 98%,
      transparent 100%
    ) top right / var(--scallop-depth) var(--scallop-width) repeat-y,
    linear-gradient(#000 0 0) var(--scallop-depth) var(--scallop-depth) /
      calc(100% - var(--scallop-depth) * 2) calc(100% - var(--scallop-depth) * 2) no-repeat;
  mask:
    radial-gradient(
      ellipse calc(var(--scallop-width) / 2) var(--scallop-depth) at 50% 100%,
      #000 98%,
      transparent 100%
    ) top left / var(--scallop-width) var(--scallop-depth) repeat-x,
    radial-gradient(
      ellipse calc(var(--scallop-width) / 2) var(--scallop-depth) at 50% 0%,
      #000 98%,
      transparent 100%
    ) bottom left / var(--scallop-width) var(--scallop-depth) repeat-x,
    radial-gradient(
      ellipse var(--scallop-depth) calc(var(--scallop-width) / 2) at 100% 50%,
      #000 98%,
      transparent 100%
    ) top left / var(--scallop-depth) var(--scallop-width) repeat-y,
    radial-gradient(
      ellipse var(--scallop-depth) calc(var(--scallop-width) / 2) at 0% 50%,
      #000 98%,
      transparent 100%
    ) top right / var(--scallop-depth) var(--scallop-width) repeat-y,
    linear-gradient(#000 0 0) var(--scallop-depth) var(--scallop-depth) /
      calc(100% - var(--scallop-depth) * 2) calc(100% - var(--scallop-depth) * 2) no-repeat;
  transition: transform 700ms cubic-bezier(.2,.75,.2,1), opacity 480ms ease;
}

.opening-cover__card::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(circle at 15% 12%, rgb(255 255 255 / 18%), transparent 24%),
    linear-gradient(145deg, rgb(255 255 255 / 10%), transparent 48%);
  content: '';
  pointer-events: none;
}

.opening-cover__botanical {
  position: absolute;
  z-index: 2;
  top: calc(var(--scallop-depth) * 0.5);
  width: auto;
  height: calc(100% - var(--scallop-depth));
  object-fit: contain;
  pointer-events: none;
  filter: drop-shadow(0 7px 8px rgb(130 44 66 / 8%));
  transition: transform 680ms cubic-bezier(.2,.75,.2,1), opacity 420ms ease;
}

.opening-cover__botanical--left {
  left: calc(var(--scallop-depth) * 0.3);
  transform-origin: left center;
  animation:
    botanical-arrive-left 1.25s cubic-bezier(.2,.75,.2,1) both,
    floral-drift-left 6.5s 1.25s ease-in-out infinite;
}

.opening-cover__botanical--right {
  right: calc(var(--scallop-depth) * 0.3);
  transform-origin: right center;
  animation:
    botanical-arrive-right 1.25s cubic-bezier(.2,.75,.2,1) both,
    floral-drift-right 7.25s 1.55s ease-in-out infinite;
}

.opening-cover__content {
  position: relative;
  z-index: 3;
  display: flex;
  width: 64%;
  min-height: calc(100vh - 0.9rem);
  min-height: calc(100svh - 0.9rem);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(3rem, 8vh, 5rem) 0.75rem;
  margin-inline: auto;
  text-align: center;
  animation: wording-arrive 900ms 180ms cubic-bezier(.2,.75,.2,1) both;
  transition: transform 480ms ease, opacity 350ms ease;
}

.opening-cover__eyebrow {
  margin: 0 0 clamp(2.5rem, 7vh, 4.25rem);
  font-family: var(--font-display);
  font-size: calc(clamp(0.82rem, 3.3vw, 1.05rem) + 2px);
  letter-spacing: 0.1em;
  line-height: 1.55;
  white-space: nowrap;
  text-transform: uppercase;
}

.opening-cover__names {
  display: flex;
  flex-direction: column;
  margin: 0;
  color: #bf2f5b;
  font-family: 'Snell Roundhand', 'Brush Script MT', 'Segoe Script', cursive;
  font-size: clamp(3.45rem, 17vw, 6.4rem);
  font-weight: 400;
  line-height: 0.72;
  animation: names-float 4.8s 1.1s ease-in-out infinite;
}

.opening-cover__ampersand {
  margin-block: 1.15rem;
  font-family: var(--font-display);
  font-size: 0.38em;
  line-height: 1;
}

.opening-cover__details {
  margin-top: clamp(3.2rem, 9vh, 5rem);
  font-family: var(--font-display);
  font-size: calc(clamp(0.7rem, 2.8vw, 0.88rem) + 2px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.opening-cover__details p,
.opening-cover__details time {
  display: block;
  margin: 0;
}

.opening-cover__details time { margin-top: 0.3rem; }

.opening-cover__hashtag {
  width: min(100%, 17rem);
  margin-top: 0.85rem !important;
  padding-top: 0.75rem;
  border-top: 1px solid rgb(85 81 79 / 70%);
  font-size: calc(0.82rem + 2px);
  letter-spacing: 0;
  text-transform: none;
}

.opening-cover__button {
  position: relative;
  min-width: 7.4rem;
  margin-top: clamp(1.4rem, 4vh, 2rem);
  padding: 0.78rem 1.85rem;
  overflow: hidden;
  border: 1px solid #bf2f5b;
  border-radius: 999px;
  color: #fff;
  background: #bf2f5b;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  transition: color 250ms ease, background-color 250ms ease, transform 250ms ease;
  animation: button-breathe 2.8s 1.6s ease-in-out infinite;
}

.opening-cover__button:hover { color: #bf2f5b; background: rgb(255 255 255 / 70%); }
.opening-cover__button:active { transform: scale(0.97); }
.opening-cover__button:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }
.opening-cover__button:disabled { cursor: wait; }

.opening-cover.is-opening .opening-cover__card { transform: scale(1.045); opacity: 0; }
.opening-cover.is-opening .opening-cover__botanical--left { transform: translateX(-18%) rotate(-1deg); opacity: 0; }
.opening-cover.is-opening .opening-cover__botanical--right { transform: translateX(18%) rotate(1deg); opacity: 0; }
.opening-cover.is-opening .opening-cover__content { transform: translateY(-1rem); opacity: 0; }

@keyframes botanical-arrive-left {
  from { transform: translateX(-22%) scale(1.03); opacity: 0; }
  to { transform: translateX(0) scale(1); opacity: 1; }
}

@keyframes botanical-arrive-right {
  from { transform: translateX(22%) scale(1.03); opacity: 0; }
  to { transform: translateX(0) scale(1); opacity: 1; }
}

@keyframes floral-drift-left {
  0%, 100% { translate: 0 0; rotate: 0deg; }
  50% { translate: 0.28rem -0.45rem; rotate: 0.35deg; }
}

@keyframes floral-drift-right {
  0%, 100% { translate: 0 0; rotate: 0deg; }
  50% { translate: -0.32rem 0.5rem; rotate: -0.4deg; }
}

@keyframes names-float {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -0.32rem; }
}

@keyframes button-breathe {
  0%, 100% { box-shadow: 0 0 0 0 rgb(191 47 91 / 0%); }
  50% { box-shadow: 0 0 0 0.42rem rgb(191 47 91 / 12%); }
}

@keyframes wording-arrive {
  from { transform: translateY(1.25rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 26.5625rem) {
  .opening-cover__card {
    --scallop-width: clamp(3.4rem, 19vw, 4.75rem);
    --scallop-depth: clamp(1rem, 4.5vw, 1.35rem);
  }

  .opening-cover__botanical {
    scale: 0.45;
  }

  .opening-cover__botanical--left {
    left: calc(var(--scallop-depth) * -0.35);
  }

  .opening-cover__botanical--right {
    right: calc(var(--scallop-depth) * -0.35);
  }

  .opening-cover__content {
    width: 76%;
    padding-inline: 0.35rem;
  }

  .opening-cover__eyebrow {
    font-size: clamp(0.78rem, 4vw, 0.98rem);
    letter-spacing: 0.075em;
  }

  .opening-cover__names {
    font-size: clamp(3.35rem, 18vw, 4.8rem);
  }

  .opening-cover__details {
    font-size: clamp(0.78rem, 3.7vw, 0.94rem);
  }

  .opening-cover__hashtag {
    font-size: clamp(0.82rem, 4vw, 0.98rem);
  }

  .opening-cover__button {
    min-width: 6.8rem;
    padding: 0.7rem 1.55rem;
    font-size: 0.84rem;
  }
}

@media (min-width: 48rem) {
  .opening-cover { padding: clamp(0.8rem, 2vw, 1.5rem); }
  .opening-cover__card {
    min-height: calc(100svh - 3rem);
    border-radius: clamp(3rem, 5vw, 5rem);
  }
  .opening-cover__content { width: min(62%, 48rem); min-height: calc(100svh - 3rem); }
}

@media (prefers-reduced-motion: reduce) {
  .opening-cover__card,
  .opening-cover__botanical,
  .opening-cover__content,
  .opening-cover__names,
  .opening-cover__button { animation: none; transition-duration: 1ms; }
}
</style>
