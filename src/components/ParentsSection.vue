<script setup lang="ts">
import { wedding } from '../data/wedding'
import ParentsCard from './ParentsCard.vue'
</script>

<template>
  <section v-reveal class="parents-section" aria-labelledby="parents-title">
    <div class="parents-section__container">
      <header class="parents-section__header">
        <p class="parents-section__eyebrow">Dengan Restu</p>
        <h2 id="parents-title" class="parents-section__title">Kedua-dua Keluarga</h2>
        <p class="parents-section__intro">
          Dengan penuh kesyukuran, bersama keluarga kami meraikan penyatuan dua hati.
        </p>
      </header>

      <div class="parents-section__families">
        <ParentsCard
          :family-label="`Keluarga ${wedding.bride.name}`"
          :parents="wedding.parents.bride"
        />

        <ParentsCard
          :family-label="`Keluarga ${wedding.groom.name}`"
          :parents="wedding.parents.groom"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.parents-section {
  position: relative;
  overflow: hidden;
  padding: 5rem var(--space-4);
  background:
    radial-gradient(circle at 50% 0%, rgb(255 255 255 / 80%), transparent 28rem),
    var(--color-cream-100);
}

.parents-section__container {
  width: min(100%, 58rem);
  margin-inline: auto;
}

.parents-section__header {
  max-width: 36rem;
  margin: 0 auto var(--space-12);
  text-align: center;
}

.parents-section__eyebrow {
  margin: 0 0 var(--space-3);
  color: var(--color-gold);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.parents-section__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.35rem, 10vw, 3.75rem);
  font-weight: 400;
  line-height: 1.1;
}

.parents-section__intro {
  margin: var(--space-4) auto 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.8;
}

.parents-section__families {
  display: grid;
  gap: var(--space-6);
}

@media (min-width: 48rem) {
  .parents-section {
    padding-block: 7rem;
  }

  .parents-section__header {
    margin-bottom: var(--space-16);
  }

  .parents-section__families {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
