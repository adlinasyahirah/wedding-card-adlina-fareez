<script setup lang="ts">
import { wedding } from '../data/wedding'
</script>

<template>
  <section v-reveal class="couple-section" aria-labelledby="couple-title">
    <div class="couple-section__container">
      <header class="couple-section__header">
        <p class="couple-section__greeting">Assalamualaikum &amp; Salam Sejahtera <br> Dengan kesyukuran dan ke hadrat Ilahi, kami</p>
      </header>

      <div class="couple-section__invitation">
        <div class="couple-section__hosts">
          <p>{{ wedding.parents.bride.father }}</p>
          <p>&</p>
          <p>{{ wedding.parents.bride.mother }}</p>
        </div>

        <p class="couple-section__copy">
          dengan penuh kesyukuran, kami menjemput <br>
          Dato' / Datin / Tuan / Puan / Encik / Cik dan seisi keluarga <br>
          ke majlis puteri kami yang dikasihi
        </p>

        <div class="couple-section__couple">
          <h2 id="couple-title">{{ wedding.bride.fullName }}</h2>
          <p>dengan pilihan hatinya</p>
          <h3>{{ wedding.groom.fullName }}</h3>
        </div>

        <div class="couple-section__event">
          <p class="couple-section__on">pada</p>
          <p class="couple-section__date">
            <span>Sabtu</span>
            <span class="couple-section__date-separator" aria-hidden="true">|</span>
            <time :datetime="wedding.dateTime">{{ wedding.date }}</time>
          </p>
          <p class="couple-section__hijri">{{ wedding.hijriDate }}</p>
        </div>

        <address class="couple-section__venue">
          <strong>{{ wedding.venue.name }}</strong>
          <span>{{ wedding.venue.address }}</span>
        </address>
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
  width: min(100%, 52rem);
  margin-inline: auto;
}

.couple-section__header {
  margin: 0 auto var(--space-6);
  text-align: center;
}

.couple-section__greeting {
  margin: 0;
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 400;
}

.couple-section__invitation {
  display: grid;
  gap: var(--space-8);
  text-align: center;
}

.couple-section__hosts {
  display: grid;
  gap: var(--space-1);
  color: var(--color-text-muted);
  font-family: var(--font-display);
  padding-top: 15px;
  font-size: 1.13rem;
  font-weight: 800;
  letter-spacing: 0.em;
  text-transform: uppercase;
}

.couple-section__hosts p,
.couple-section__copy,
.couple-section__couple p,
.couple-section__event p {
  margin: 0;
}

.couple-section__copy {
  display: grid;
  gap: var(--space-2);
  color: var(--color-text-muted);
  font-size: 0.94rem;
  line-height: 1.8;
}

.couple-section__copy strong {
  color: var(--color-text);
  font-weight: 600;
}

.couple-section__couple {
  display: grid;
  gap: var(--space-4);
}

.couple-section__couple h2,
.couple-section__couple h3 {
  margin: 0;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.couple-section__couple p,
.couple-section__on,
.couple-section__hijri {
  color: var(--color-text-muted);
  font-size: 0.88rem;
  font-style: italic;
}

.couple-section__event {
  display: grid;
  gap: var(--space-2);
}

.couple-section__date {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 5vw, 1.5rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.couple-section__date-separator {
  color: var(--color-primary);
  font-weight: 400;
}

.couple-section__venue {
  display: grid;
  gap: var(--space-2);
  max-width: 34rem;
  margin-inline: auto;
  font-style: normal;
  line-height: 1.7;
}

.couple-section__venue strong {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 6vw, 2rem);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.couple-section__venue span {
  color: var(--color-text-muted);
}

@media (min-width: 48rem) {
  .couple-section {
    padding-block: 7rem;
  }

  .couple-section__invitation {
    gap: var(--space-12);
  }
}
</style>
