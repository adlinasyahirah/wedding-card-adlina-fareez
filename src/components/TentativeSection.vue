<script setup lang="ts">
import { wedding } from '../data/wedding'
</script>

<template>
  <section v-reveal class="tentative-section" aria-labelledby="tentative-heading">
    <div class="tentative-section__container">
      <header class="tentative-section__header">
        <p class="tentative-section__eyebrow">Atur Cara</p>
        <h2 id="tentative-heading" class="tentative-section__title">Tentatif Majlis</h2>
        <p class="tentative-section__intro">
          Susunan acara untuk meraikan hari istimewa kami bersama anda.
        </p>
      </header>

      <ol v-if="wedding.tentative.length" class="timeline">
        <li
          v-for="(item, index) in wedding.tentative"
          :key="`${item.time}-${item.title}`"
          class="timeline__item"
        >
          <div class="timeline__marker" aria-hidden="true">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
          </div>

          <article class="timeline__content">
            <time v-if="item.time" class="timeline__time">{{ item.time }}</time>
            <p v-else class="timeline__time">Masa akan dikemas kini</p>
            <h3 class="timeline__title">{{ item.title }}</h3>
            <p v-if="item.description" class="timeline__description">
              {{ item.description }}
            </p>
          </article>
        </li>
      </ol>

      <p v-else class="tentative-section__empty">
        Tentatif majlis akan dikemas kini.
      </p>
    </div>
  </section>
</template>

<style scoped>
.tentative-section {
  padding: 5rem var(--space-4);
  color: var(--color-text);
  background: var(--color-cream-50);
}

.tentative-section__container {
  width: min(100%, 46rem);
  margin-inline: auto;
}

.tentative-section__header {
  max-width: 35rem;
  margin: 0 auto var(--space-12);
  text-align: center;
}

.tentative-section__eyebrow {
  margin: 0 0 var(--space-3);
  color: var(--color-gold);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.tentative-section__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 11vw, 4rem);
  font-weight: 400;
  line-height: 1.1;
}

.tentative-section__intro {
  margin: var(--space-4) auto 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.8;
}

.timeline {
  margin: 0;
  padding: 0;
  list-style: none;
}

.timeline__item {
  position: relative;
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: var(--space-4);
  padding-bottom: var(--space-8);
}

.timeline__item:not(:last-child)::before {
  position: absolute;
  top: 2.5rem;
  bottom: 0;
  left: 1.5rem;
  width: 1px;
  background: rgb(168 134 82 / 35%);
  content: '';
}

.timeline__marker {
  position: relative;
  z-index: 1;
  display: grid;
  width: 3rem;
  height: 3rem;
  border: 1px solid rgb(168 134 82 / 50%);
  border-radius: 50%;
  color: var(--color-gold);
  background: var(--color-cream-50);
  font-size: 0.63rem;
  letter-spacing: 0.08em;
  place-items: center;
}

.timeline__content {
  padding: var(--space-1) 0 var(--space-6);
}

.timeline__time {
  margin: 0 0 var(--space-2);
  color: var(--color-gold);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.timeline__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 7vw, 2rem);
  font-weight: 400;
  line-height: 1.2;
}

.timeline__description {
  margin: var(--space-3) 0 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
}

.tentative-section__empty {
  margin: 0;
  color: var(--color-text-muted);
  text-align: center;
  font-style: italic;
}

@media (min-width: 48rem) {
  .tentative-section {
    padding-block: 7rem;
  }

  .tentative-section__header {
    margin-bottom: var(--space-16);
  }

  .timeline__item {
    grid-template-columns: 4rem minmax(0, 1fr);
    gap: var(--space-8);
  }

  .timeline__item:not(:last-child)::before {
    left: 2rem;
  }

  .timeline__marker {
    width: 4rem;
    height: 4rem;
  }
}
</style>
