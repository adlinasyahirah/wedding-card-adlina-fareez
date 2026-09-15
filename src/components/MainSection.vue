<script setup lang="ts">
import { computed } from 'vue'
import { wedding } from '../data/wedding'
import childhoodPortraits from '../assets/images/Books.png'
import defaultBackground from '../assets/images/background.jpeg'

interface Props {
  backgroundImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  backgroundImage: defaultBackground,
})

const heroStyle = computed(() =>
  props.backgroundImage
    ? { backgroundImage: `url("${props.backgroundImage}")` }
    : undefined,
)

const weddingDay = computed(() =>
  new Intl.DateTimeFormat('ms-MY', { weekday: 'long' })
    .format(new Date(wedding.dateTime))
    .toUpperCase(),
)
</script>

<template>
  <section
    id="hero"
    v-reveal
    class="hero-section"
    :class="{ 'hero-section--with-image': backgroundImage }"
    :style="heroStyle"
    aria-labelledby="hero-title"
  >
    <div class="hero-section__overlay" aria-hidden="true"></div>

    <div class="hero-section__content">
      <p class="hero-section__eyebrow">{{ wedding.ceremonyTitle }}</p>

      <h1 id="hero-title" class="hero-section__names">
        <span>{{ wedding.bride.name }}</span>
        <span class="hero-section__ampersand" aria-label="dan">&amp;</span>
        <span>{{ wedding.groom.name }}</span>
      </h1>

      <img
        class="hero-section__portraits"
        :src="childhoodPortraits"
        alt="Buku kenangan dengan gambar zaman kanak-kanak Adlina dan Fareez"
      >

      <div class="hero-section__details">
        <p>{{ weddingDay }}</p>
        <time :datetime="wedding.dateTime">{{ wedding.date }}</time>
        <p v-if="wedding.hashtag" class="hero-section__hashtag">
          {{ wedding.hashtag }}
        </p>
      </div>
    </div>

  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  isolation: isolate;
  display: grid;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  padding: clamp(5.75rem, 13vh, 8rem) clamp(3.5rem, 13vw, 5.5rem);
  color: var(--color-text);
  background: #f9d7dc;
  background-position: center;
  background-size: cover;
}

.hero-section--with-image {
  color: var(--color-white);
}

.hero-section--with-image::after {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
  height: clamp(7rem, 16vh, 10rem);
  background: linear-gradient(to bottom, transparent, #b8aa94);
  content: '';
  pointer-events: none;
}

.hero-section--with-image .hero-section__eyebrow {
  color: var(--color-white);
}

.hero-section--with-image .hero-section__names,
.hero-section--with-image .hero-section__details .hero-section__hashtag {
  color: var(--color-white);
  text-shadow: 0 2px 8px rgb(0 0 0 / 25%);
}

.hero-section--with-image .hero-section__details .hero-section__hashtag {
  border-color: rgb(255 255 255 / 50%);
}

.hero-section__overlay {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgb(27 22 17 / 34%) 0%,
    rgb(27 22 17 / 52%) 50%,
    rgb(27 22 17 / 62%) 100%
  );
  opacity: 0;
}

.hero-section--with-image .hero-section__overlay {
  opacity: 1;
}


.hero-section__content {
  position: relative;
  z-index: 2;
  align-self: center;
  width: min(100%, 42rem);
  margin-inline: auto;
  text-align: center;
}

.hero-section__eyebrow {
  display: grid;
  gap: var(--space-1);
  margin: 0 0 clamp(2rem, 6vh, 3.5rem);
  color: var(--color-text);
  font-size: 1.53rem;
  letter-spacing: 0.12em;
  line-height: 1.55;
  text-transform: uppercase;
}

.hero-section__portraits {
  display: block;
  width: min(100%, 34rem);
  height: auto;
  margin: 0 auto;
  transform: translateY(2.5rem) scale(1.2);
  filter: drop-shadow(0 0.75rem 1.1rem rgb(111 27 55 / 10%));
}

.hero-section__names {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.6rem, 2vh, 1rem);
  margin: 0;
  color: var(--color-primary);
  font-family: 'Snell Roundhand', 'Brush Script MT', 'Segoe Script', cursive;
  font-size: clamp(2.85rem, 12vw, 7.25rem);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.hero-section__ampersand {
  margin-block: 0.1em;
  color: inherit;
  font-family: var(--font-display);
  font-size: 0.34em;
  line-height: 1;
}

.hero-section__invitation {
  max-width: 27rem;
  margin: 0 auto;
  color: var(--color-text-muted);
  font-size: clamp(0.95rem, 3.8vw, 1.08rem);
  line-height: 1.8;
}

.hero-section--with-image .hero-section__invitation {
  color: rgb(255 255 255 / 88%);
}

.hero-section__details {
  margin-top: clamp(2.5rem, 7vh, 4rem);
  font-size: clamp(0.82rem, 3vw, 0.99rem);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-section__details p,
.hero-section__details time {
  display: block;
  margin: 0;
}

.hero-section__details time {
  margin-top: var(--space-1);
}

.hero-section__details .hero-section__hashtag {
  width: min(82%, 18rem);
  margin-top: var(--space-4);
  margin-inline: auto;
  padding-top: var(--space-3);
  border-top: 1px solid rgb(189 63 112 / 25%);
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 0.82rem;
  letter-spacing: 0.02em;
  text-transform: none;
}

@media (max-width: 30rem) {
  .hero-section {
    min-height: calc(100svh - 1rem);
    padding: clamp(4.5rem, 10vh, 5.75rem) 1.25rem clamp(7.5rem, 16vh, 9rem);
  }

  .hero-section__eyebrow {
    margin-bottom: clamp(1.75rem, 5vh, 2.5rem);
    font-size: clamp(1.15rem, 5.8vw, 1.4rem);
    letter-spacing: 0.09em;
  }

  .hero-section__portraits {
    width: min(100%, 21rem);
    margin-block: 0;
  }

  .hero-section__names {
    width: 100%;
    gap: 0.45rem;
    font-size: clamp(3.25rem, 16vw, 4rem);
    letter-spacing: 0;
  }

  .hero-section__details {
    margin-top: clamp(2.25rem, 6vh, 3rem);
  }

  .hero-section__details .hero-section__hashtag {
    width: min(88%, 18rem);
    font-size: 0.88rem;
  }

}

@media (min-width: 48rem) {
  .hero-section {
    padding-inline: clamp(6rem, 15vw, 14rem);
  }
}
</style>
