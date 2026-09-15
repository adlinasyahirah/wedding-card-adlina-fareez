<script setup lang="ts">
import { computed, ref } from 'vue'
import { wedding } from '../data/wedding'
import openingFloralLeft from '../assets/images/opening-floral-left.webp'
import openingFloralRight from '../assets/images/opening-floral-right.webp'
import openingRound from '../assets/images/round.png'

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
        <img
          class="opening-cover__round"
          :src="openingRound"
          alt=""
          aria-hidden="true"
        >

        <p class="opening-cover__eyebrow">{{ wedding.ceremonyTitle }}</p>

        <div class="opening-cover__center">
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
  padding: 0;
  background: #f9d7dc;
  transform-origin: center;
}

.opening-cover__card {
  position: relative;
  display: grid;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  color: #55514f;
  background: #f9d7dc url('../assets/images/background.jpeg') center / cover no-repeat;
}

.opening-cover__round {
  position: absolute;
  z-index: 1;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  pointer-events: none;
}

.opening-cover__botanical {
  position: absolute;
  z-index: 2;
  top: 0;
  width: auto;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
  filter: drop-shadow(0 7px 8px rgb(130 44 66 / 8%));
}

.opening-cover__botanical--left {
  left: clamp(-4.5rem, -7vw, -2.25rem);
  transform: scaleX(0.7);
  transform-origin: left center;
}

.opening-cover__botanical--right {
  right: clamp(-6.5rem, -11vw, -3.25rem);
  transform: scaleX(0.7);
  transform-origin: right center;
}

.opening-cover__content {
  position: relative;
  container-type: inline-size;
  width: min(100%, 70.94svh);
  aspect-ratio: 1240 / 1748;
  align-self: center;
  margin-inline: auto;
  text-align: center;
}

.opening-cover__center {
  position: absolute;
  z-index: 3;
  inset: 23% 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.opening-cover__eyebrow {
  position: absolute;
  z-index: 3;
  top: 5%;
  width: 100%;
  margin: 0;
  color: #fff;
  text-shadow: 0 2px 8px rgb(0 0 0 / 35%);
  font-family: var(--font-display);
  font-size: clamp(0.7rem, 3.8cqw, 1.2rem);
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
  font-size: 17cqw;
  font-weight: 400;
  line-height: 0.72;
}

.opening-cover__ampersand {
  margin-block: 4cqw;
  font-family: var(--font-display);
  font-size: 0.38em;
  line-height: 1;
}

.opening-cover__details {
  margin-top: 8cqw;
  font-family: var(--font-display);
  font-size: 3.6cqw;
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
  margin-top: 3cqw !important;
  padding-top: 2.5cqw;
  border-top: 1px solid rgb(85 81 79 / 70%);
  font-size: 3.8cqw;
  letter-spacing: 0;
  text-transform: none;
}

.opening-cover__button {
  position: absolute;
  z-index: 3;
  top: 90%;
  left: 50%;
  translate: -50% 0;
  min-width: 7.4rem;
  margin-top: 0;
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
}

.opening-cover__button:hover { color: #bf2f5b; background: rgb(255 255 255 / 70%); }
.opening-cover__button:active { transform: scale(0.97); }
.opening-cover__button:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }
.opening-cover__button:disabled { cursor: wait; }

.opening-cover.is-opening .opening-cover__card { transform: scale(1.045); opacity: 0; }
.opening-cover.is-opening .opening-cover__botanical { opacity: 0; }
.opening-cover.is-opening .opening-cover__content { transform: translateY(-1rem); opacity: 0; }

@media (max-width: 26.5625rem) {
  .opening-cover__button {
    min-width: 6.8rem;
    padding: 0.7rem 1.55rem;
    font-size: 0.84rem;
  }
}

</style>
