<script setup lang="ts">
import { computed } from 'vue'
import { wedding } from '../data/wedding'

interface Props {
  backgroundImage?: string
}

const props = defineProps<Props>()

const heroStyle = computed(() =>
  props.backgroundImage
    ? { backgroundImage: `url("${props.backgroundImage}")` }
    : undefined,
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

    <div class="hero-section__botanical hero-section__botanical--top" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="hero-section__content">
      <p class="hero-section__eyebrow">Undangan Perkahwinan</p>

      <h1 id="hero-title" class="hero-section__names">
        <span>{{ wedding.bride.name }}</span>
        <span class="hero-section__ampersand" aria-label="dan">&amp;</span>
        <span>{{ wedding.groom.name }}</span>
      </h1>

      <div class="hero-section__divider" aria-hidden="true">
        <span></span>
      </div>

      <p class="hero-section__invitation">
        {{ wedding.invitationText }}
      </p>

      <p class="hero-section__date">
        <time :datetime="wedding.dateTime">{{ wedding.date }}</time>
      </p>
    </div>

    <div class="hero-section__botanical hero-section__botanical--bottom" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
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
  padding: clamp(5rem, 14vh, 8rem) var(--space-6);
  color: var(--color-text);
  background:
    radial-gradient(circle at 5% 8%, rgb(216 195 165 / 36%), transparent 25%),
    radial-gradient(circle at 95% 92%, rgb(168 134 82 / 18%), transparent 27%),
    linear-gradient(165deg, var(--color-cream-50), var(--color-cream-100));
  background-position: center;
  background-size: cover;
}

.hero-section--with-image {
  color: var(--color-white);
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
  align-self: center;
  width: min(100%, 34rem);
  margin-inline: auto;
  text-align: center;
}

.hero-section__eyebrow {
  margin: 0 0 var(--space-8);
  color: var(--color-gold);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.hero-section--with-image .hero-section__eyebrow {
  color: var(--color-champagne);
}

.hero-section__names {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.25rem, 17vw, 6.5rem);
  font-weight: 400;
  line-height: 0.82;
  letter-spacing: -0.055em;
}

.hero-section__ampersand {
  margin-block: var(--space-4);
  color: var(--color-gold);
  font-size: 0.43em;
  font-style: italic;
  line-height: 1;
}

.hero-section--with-image .hero-section__ampersand {
  color: var(--color-champagne);
}

.hero-section__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin: var(--space-8) auto;
}

.hero-section__divider::before,
.hero-section__divider::after {
  width: 2.75rem;
  height: 1px;
  background: currentColor;
  content: '';
  opacity: 0.38;
}

.hero-section__divider span {
  width: 0.35rem;
  height: 0.35rem;
  border: 1px solid currentColor;
  transform: rotate(45deg);
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

.hero-section__date {
  margin: var(--space-8) 0 0;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.hero-section__botanical {
  position: absolute;
  z-index: -1;
  width: 8rem;
  height: 8rem;
  color: var(--color-gold);
  opacity: 0.22;
  pointer-events: none;
}

.hero-section__botanical::before {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  background: currentColor;
  content: '';
  transform: rotate(38deg);
  transform-origin: center;
}

.hero-section__botanical span {
  position: absolute;
  width: 2.25rem;
  height: 1.1rem;
  border: 1px solid currentColor;
  border-radius: 100% 0 100% 0;
}

.hero-section__botanical span:nth-child(1) {
  top: 1.2rem;
  left: 1.8rem;
  transform: rotate(17deg);
}

.hero-section__botanical span:nth-child(2) {
  top: 3.5rem;
  left: 4.35rem;
  transform: scaleX(-1) rotate(12deg);
}

.hero-section__botanical span:nth-child(3) {
  top: 5.8rem;
  left: 2.2rem;
  transform: rotate(25deg);
}

.hero-section__botanical--top {
  top: -1.5rem;
  right: -1.5rem;
}

.hero-section__botanical--bottom {
  bottom: -1.5rem;
  left: -1.5rem;
  transform: rotate(180deg);
}

.hero-section--with-image .hero-section__botanical {
  color: var(--color-white);
}

@media (min-width: 48rem) {
  .hero-section {
    padding-inline: var(--space-12);
  }

  .hero-section__botanical {
    width: 12rem;
    height: 12rem;
  }
}
</style>
