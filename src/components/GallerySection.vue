<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { wedding } from '../data/wedding'

const galleryTrack = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

function scrollToImage(index: number): void {
  const track = galleryTrack.value
  if (!track || !wedding.gallery.length) return

  const safeIndex = Math.min(Math.max(index, 0), wedding.gallery.length - 1)
  const target = track.children[safeIndex] as HTMLElement | undefined

  target?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}

function showPrevious(): void {
  scrollToImage(activeIndex.value - 1)
}

function showNext(): void {
  scrollToImage(activeIndex.value + 1)
}

function updateActiveImage(): void {
  const track = galleryTrack.value
  if (!track) return

  const trackCenter = track.scrollLeft + track.clientWidth / 2
  let closestIndex = 0
  let closestDistance = Number.POSITIVE_INFINITY

  Array.from(track.children).forEach((child, index) => {
    const element = child as HTMLElement
    const imageCenter = element.offsetLeft + element.offsetWidth / 2
    const distance = Math.abs(trackCenter - imageCenter)

    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  activeIndex.value = closestIndex
}

function handleImageLoad(): void {
  void nextTick(updateActiveImage)
}
</script>

<template>
  <section id="gallery" v-reveal class="gallery-section" aria-labelledby="gallery-heading">
    <div class="gallery-section__header">
      <div>
        <p class="gallery-section__eyebrow">Memori Kami</p>
        <h2 id="gallery-heading" class="gallery-section__title">Galeri</h2>
      </div>

      <div v-if="wedding.gallery.length > 1" class="gallery-section__controls">
        <button
          class="gallery-section__control"
          type="button"
          aria-label="Gambar sebelumnya"
          :disabled="activeIndex === 0"
          @click="showPrevious"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          class="gallery-section__control"
          type="button"
          aria-label="Gambar seterusnya"
          :disabled="activeIndex === wedding.gallery.length - 1"
          @click="showNext"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>

    <div
      v-if="wedding.gallery.length"
      ref="galleryTrack"
      class="gallery-section__track"
      tabindex="0"
      aria-label="Galeri foto pasangan"
      @scroll.passive="updateActiveImage"
      @keydown.left.prevent="showPrevious"
      @keydown.right.prevent="showNext"
    >
      <figure
        v-for="(image, index) in wedding.gallery"
        :key="`${image.src}-${index}`"
        class="gallery-card"
      >
        <img
          class="gallery-card__image"
          :src="image.src"
          :alt="image.alt"
          loading="lazy"
          decoding="async"
          @load="handleImageLoad"
        />
        <figcaption v-if="image.caption" class="gallery-card__caption">
          {{ image.caption }}
        </figcaption>
      </figure>
    </div>

    <div v-else class="gallery-section__empty">
      <span class="gallery-section__monogram" aria-hidden="true">
        {{ wedding.bride.name.charAt(0) }}&amp;{{ wedding.groom.name.charAt(0) }}
      </span>
      <p>Foto kenangan akan ditambahkan tidak lama lagi.</p>
    </div>

    <div
      v-if="wedding.gallery.length > 1"
      class="gallery-section__progress"
      aria-live="polite"
    >
      <span>{{ String(activeIndex + 1).padStart(2, '0') }}</span>
      <span class="gallery-section__progress-line" aria-hidden="true"></span>
      <span>{{ String(wedding.gallery.length).padStart(2, '0') }}</span>
    </div>
  </section>
</template>

<style scoped>
.gallery-section {
  overflow: hidden;
  padding: 5rem 0;
  color: var(--color-text);
  background: var(--color-cream-100);
}

.gallery-section__header {
  display: flex;
  width: min(100% - 2rem, 68rem);
  align-items: end;
  justify-content: space-between;
  gap: var(--space-4);
  margin: 0 auto var(--space-8);
}

.gallery-section__eyebrow {
  margin: 0 0 var(--space-2);
  color: var(--color-gold);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.gallery-section__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 12vw, 4.5rem);
  font-weight: 400;
  line-height: 1;
}

.gallery-section__controls {
  display: flex;
  gap: var(--space-2);
}

.gallery-section__control {
  display: grid;
  width: 2.75rem;
  min-height: 2.75rem;
  padding: 0;
  border: 1px solid rgb(168 134 82 / 48%);
  border-radius: 50%;
  color: var(--color-gold);
  background: transparent;
  cursor: pointer;
  place-items: center;
}

.gallery-section__control:disabled {
  cursor: default;
  opacity: 0.3;
}

.gallery-section__control:focus-visible,
.gallery-section__track:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

.gallery-section__track {
  display: grid;
  grid-auto-columns: min(78vw, 24rem);
  grid-auto-flow: column;
  gap: var(--space-4);
  width: 100%;
  padding: 0 max(var(--space-4), calc((100vw - 68rem) / 2));
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-padding-inline: var(--space-4);
  scroll-snap-type: inline mandatory;
  scrollbar-width: none;
}

.gallery-section__track::-webkit-scrollbar {
  display: none;
}

.gallery-card {
  position: relative;
  aspect-ratio: 4 / 5;
  margin: 0;
  overflow: hidden;
  background: #e6d8c6;
  scroll-snap-align: center;
}

.gallery-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-card__caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: var(--space-8) var(--space-4) var(--space-4);
  color: var(--color-white);
  background: linear-gradient(transparent, rgb(27 22 17 / 68%));
  font-size: 0.82rem;
}

.gallery-section__empty {
  display: grid;
  width: min(100% - 2rem, 42rem);
  min-height: 22rem;
  margin-inline: auto;
  padding: var(--space-8);
  border: 1px solid rgb(168 134 82 / 30%);
  color: var(--color-text-muted);
  background:
    radial-gradient(circle, rgb(255 255 255 / 82%), transparent 55%),
    #eadfce;
  text-align: center;
  place-content: center;
}

.gallery-section__empty p {
  margin: var(--space-4) 0 0;
  font-size: 0.9rem;
  font-style: italic;
}

.gallery-section__monogram {
  color: var(--color-gold);
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-style: italic;
}

.gallery-section__progress {
  display: flex;
  width: min(100% - 2rem, 68rem);
  align-items: center;
  gap: var(--space-3);
  margin: var(--space-6) auto 0;
  color: var(--color-text-muted);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
}

.gallery-section__progress-line {
  width: 3rem;
  height: 1px;
  background: var(--color-gold);
}

@media (min-width: 48rem) {
  .gallery-section {
    padding-block: 7rem;
  }

  .gallery-section__header {
    width: min(100% - 4rem, 68rem);
    margin-bottom: var(--space-12);
  }

  .gallery-section__track {
    grid-auto-columns: min(42vw, 25rem);
    gap: var(--space-6);
    padding-inline: max(var(--space-8), calc((100vw - 68rem) / 2));
  }

  .gallery-section__progress {
    width: min(100% - 4rem, 68rem);
  }
}
</style>
