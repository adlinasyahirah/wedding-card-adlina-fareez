<script setup lang="ts">
import CoupleProfile from './CoupleProfile.vue'
import { wedding } from '../data/wedding'
</script>

<template>
  <section v-reveal class="couple-section" aria-labelledby="couple-title">
    <div class="couple-section__container">
      <header class="couple-section__header">
        <p class="couple-section__eyebrow">Mempelai</p>
        <h2 id="couple-title" class="couple-section__title">Raja Sehari</h2>
        <p class="couple-section__intro">
          Dua hati disatukan dalam sebuah ikatan yang penuh kasih dan keberkatan.
        </p>
      </header>

      <div class="couple-section__profiles">
        <CoupleProfile :person="wedding.bride" role="Pengantin Perempuan" />

        <div class="couple-section__connector" aria-hidden="true">
          <span>&amp;</span>
        </div>

        <CoupleProfile :person="wedding.groom" role="Pengantin Lelaki" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.couple-section {
  padding: 5rem var(--space-4);
  background: var(--color-cream-50);
}

.couple-section__container {
  width: min(100%, 62rem);
  margin-inline: auto;
}

.couple-section__header {
  max-width: 34rem;
  margin: 0 auto var(--space-12);
  text-align: center;
}

.couple-section__eyebrow {
  margin: 0 0 var(--space-3);
  color: var(--color-gold);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.couple-section__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 11vw, 4rem);
  font-weight: 400;
  line-height: 1.1;
}

.couple-section__intro {
  margin: var(--space-4) auto 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.8;
}

.couple-section__profiles {
  display: grid;
  gap: var(--space-8);
  align-items: center;
}

.couple-section__connector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  color: var(--color-gold);
  font-family: var(--font-display);
  font-size: 2rem;
  font-style: italic;
}

.couple-section__connector::before,
.couple-section__connector::after {
  width: 3rem;
  height: 1px;
  background: currentColor;
  content: '';
  opacity: 0.45;
}

@media (min-width: 48rem) {
  .couple-section {
    padding-block: 7rem;
  }

  .couple-section__header {
    margin-bottom: var(--space-16);
  }

  .couple-section__profiles {
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    gap: var(--space-6);
  }

  .couple-section__connector {
    flex-direction: column;
  }

  .couple-section__connector::before,
  .couple-section__connector::after {
    width: 1px;
    height: 3rem;
  }
}
</style>
