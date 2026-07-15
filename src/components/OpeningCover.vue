<script setup lang="ts">
import { computed } from 'vue'
import { wedding } from '../data/wedding'

interface Props {
  backgroundImage?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  openInvitation: []
}>()

const coverStyle = computed(() =>
  props.backgroundImage
    ? { backgroundImage: `url("${props.backgroundImage}")` }
    : undefined,
)

function openInvitation(): void {
  emit('openInvitation')
}
</script>

<template>
  <section
    class="opening-cover"
    :class="{ 'opening-cover--with-image': backgroundImage }"
    :style="coverStyle"
    aria-labelledby="opening-title"
  >
    <div class="opening-cover__overlay" aria-hidden="true"></div>

    <div class="opening-cover__frame" aria-hidden="true">
      <span class="opening-cover__ornament">#ReezervedForSyira</span>
    </div>

    <div class="opening-cover__content">
      <p class="opening-cover__eyebrow">Majlis Bertaut Kasih</p>

      <h1 id="opening-title" class="opening-cover__names">
        <span>{{ wedding.bride.name }}</span>
        <span class="opening-cover__ampersand" aria-hidden="true">&amp;</span>
        <span>{{ wedding.groom.name }}</span>
      </h1>

      <p class="opening-cover__date">
        <time :datetime="wedding.dateTime">{{ wedding.date }}</time>
      </p>

      <button class="opening-cover__button" type="button" @click="openInvitation">
        Buka Undangan
      </button>
    </div>
  </section>
</template>

<style scoped>
.opening-cover {
  position: relative;
  isolation: isolate;
  display: grid;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  padding: var(--space-4);
  color: var(--color-text);
  background:
    radial-gradient(circle at 50% 18%, rgb(255 255 255 / 80%), transparent 34%),
    linear-gradient(155deg, var(--color-cream-50), var(--color-cream-100) 58%, #eadbc7);
  background-position: center;
  background-size: cover;
}

.opening-cover--with-image {
  color: var(--color-white);
}

.opening-cover__overlay {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgb(29 23 17 / 18%) 0%,
    rgb(29 23 17 / 38%) 48%,
    rgb(29 23 17 / 58%) 100%
  );
  opacity: 0;
}

.opening-cover--with-image .opening-cover__overlay {
  opacity: 1;
}

.opening-cover__frame {
  position: absolute;
  inset: var(--space-4);
  border: 1px solid rgb(168 134 82 / 55%);
  pointer-events: none;
}

.opening-cover__frame::before,
.opening-cover__frame::after {
  position: absolute;
  left: 50%;
  width: 3rem;
  height: 1px;
  background: currentColor;
  content: '';
  transform: translateX(-50%);
}

.opening-cover__frame::before {
  top: 2.55rem;
}

.opening-cover__frame::after {
  top: 4.65rem;
}

.opening-cover__ornament {
  position: absolute;
  top: var(--space-8);
  left: 50%;
  color: var(--color-gold);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  transform: translateX(-50%);
}

.opening-cover--with-image .opening-cover__frame {
  border-color: rgb(255 255 255 / 55%);
}

.opening-cover--with-image .opening-cover__ornament {
  color: inherit;
}

.opening-cover__content {
  align-self: center;
  width: min(100%, 30rem);
  margin-inline: auto;
  padding: 5.5rem var(--space-6) var(--space-12);
  text-align: center;
}

.opening-cover__eyebrow {
  margin: 0 0 var(--space-6);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.34em;
  text-transform: uppercase;
}

.opening-cover__names {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 16vw, 4.75rem);
  font-weight: 400;
  line-height: 0.94;
  letter-spacing: -0.045em;
}

.opening-cover__ampersand {
  color: var(--color-gold);
  font-size: 0.5em;
  font-style: italic;
  line-height: 1.5;
}

.opening-cover--with-image .opening-cover__ampersand {
  color: var(--color-champagne);
}

.opening-cover__date {
  margin: var(--space-8) 0 0;
  font-size: 0.82rem;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.opening-cover__button {
  min-width: 11rem;
  margin-top: var(--space-12);
  padding: 0.8rem 1.5rem;
  border: 1px solid var(--color-gold);
  border-radius: 999px;
  color: var(--color-white);
  background: var(--color-gold);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition:
    color var(--transition-base),
    background-color var(--transition-base),
    transform var(--transition-base);
}

.opening-cover__button:hover {
  color: var(--color-gold);
  background: var(--color-white);
}

.opening-cover__button:active {
  transform: scale(0.98);
}

.opening-cover__button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
}

.opening-cover--with-image .opening-cover__button {
  border-color: rgb(255 255 255 / 72%);
  color: var(--color-text);
  background: rgb(255 255 255 / 92%);
}

@media (min-width: 48rem) {
  .opening-cover {
    padding: var(--space-8);
  }

  .opening-cover__frame {
    inset: var(--space-8);
  }

  .opening-cover__content {
    padding-inline: var(--space-8);
  }
}
</style>
