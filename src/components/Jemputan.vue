<script setup lang="ts">
import { wedding } from '../data/wedding'
</script>

<template>
  <section v-reveal class="couple-section" aria-labelledby="couple-title">
    <div class="couple-section__glow couple-section__glow--top" aria-hidden="true"></div>
    <div class="couple-section__glow couple-section__glow--bottom" aria-hidden="true"></div>

    <div class="couple-section__container">
      <div class="couple-section__card">
        <span class="couple-section__corner couple-section__corner--top-left" aria-hidden="true"></span>
        <span class="couple-section__corner couple-section__corner--top-right" aria-hidden="true"></span>
        <span class="couple-section__corner couple-section__corner--bottom-left" aria-hidden="true"></span>
        <span class="couple-section__corner couple-section__corner--bottom-right" aria-hidden="true"></span>

        <header class="couple-section__header">
          <p class="couple-section__greeting">
            Assalamualaikum &amp; Salam Sejahtera
          </p>
          <p class="couple-section__intro">
            Dengan penuh kesyukuran ke hadrat Ilahi, kami
          </p>
        </header>

        <div class="couple-section__invitation">
          <div class="couple-section__hosts">
            <p>{{ wedding.parents.bride.father }}</p>
            <span aria-label="dan">&amp;</span>
            <p>{{ wedding.parents.bride.mother }}</p>
          </div>

          <p class="couple-section__copy">
            <span>Dengan sukacitanya menjemput</span>
            <strong>Dato' / Datin / Tuan / Puan / Encik / Cik</strong>
            <span>serta seisi keluarga ke majlis perkahwinan puteri kami yang dikasihi</span>
          </p>

          <div class="couple-section__couple">
            <h3 id="couple-title">{{ wedding.bride.fullName }}</h3>
            <p>dengan pilihan hatinya</p>
            <h3>{{ wedding.groom.fullName }}</h3>
          </div>

          <div class="couple-section__event">
            <p class="couple-section__on">Pada</p>
            <p class="couple-section__date">
              <span>Sabtu</span>
              <span class="couple-section__date-separator" aria-hidden="true"></span>
              <time :datetime="wedding.dateTime">{{ wedding.date }}</time>
            </p>
            <p class="couple-section__hijri">{{ wedding.hijriDate }}</p>
          </div>

          <address class="couple-section__venue">
            <span class="couple-section__venue-label">Bertempat di</span>
            <strong>{{ wedding.venue.name }}</strong>
            <span>{{ wedding.venue.address }}</span>
          </address>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.couple-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(4.5rem, 10vw, 7rem) var(--space-4);
  background:
    radial-gradient(circle at 10% 15%, rgb(235 186 208 / 22%), transparent 20rem),
    radial-gradient(circle at 90% 85%, rgb(189 63 112 / 12%), transparent 22rem),
    var(--color-cream-50);
}

.couple-section__container {
  width: min(100%, 54rem);
  margin-inline: auto;
}

.couple-section__card {
  position: relative;
  padding: clamp(3rem, 8vw, 5rem) clamp(1.35rem, 7vw, 5rem);
  border: 1px solid rgb(189 63 112 / 28%);
  border-radius: 0.35rem;
  background:
    radial-gradient(ellipse at 5% 8%, rgb(235 186 208 / 28%), transparent 28%),
    radial-gradient(ellipse at 95% 92%, rgb(189 63 112 / 14%), transparent 30%),
    radial-gradient(circle at 88% 18%, rgb(251 224 234 / 22%), transparent 20%),
    linear-gradient(145deg, rgb(255 255 255 / 92%), rgb(251 244 238 / 78%));
  box-shadow:
    0 1.5rem 4rem rgb(127 41 77 / 8%),
    inset 0 0 0 0.4rem rgb(255 255 255 / 55%),
    inset 0 0 0 0.45rem rgb(189 63 112 / 10%);
}

.couple-section__header {
  margin: 0 auto clamp(1.25rem, 3vw, 1.75rem);
  text-align: center;
}

.couple-section__greeting {
  margin: 0;
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-size: clamp(1.08rem, 3vw, 1.3rem);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.couple-section__intro {
  margin: var(--space-2) 0 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
}

.couple-section__invitation {
  display: grid;
  gap: clamp(1.75rem, 5vw, 2.5rem);
  text-align: center;
}

.couple-section__hosts {
  display: grid;
  gap: 0.15rem;
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 3.5vw, 1.3rem);
  font-weight: 600;
  letter-spacing: 0.045em;
  text-transform: uppercase;
}

.couple-section__hosts-and {
  margin-block: 0.1rem;
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-style: italic;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  text-transform: lowercase;
}

.couple-section__hosts p,
.couple-section__copy,
.couple-section__couple p,
.couple-section__event p {
  margin: 0;
}

.couple-section__copy {
  display: grid;
  gap: 0.3rem;
  max-width: 37rem;
  margin-top: -0.5rem;
  margin-inline: auto;
  color: var(--color-text-muted);
  font-size: clamp(0.88rem, 2.6vw, 1rem);
  line-height: 1.7;
}

.couple-section__copy strong {
  color: var(--color-text-muted);
  font-weight: 900;
  letter-spacing: 0.02em;
}

.couple-section__couple {
  display: grid;
  gap: var(--space-4);
  padding-block: clamp(1.5rem, 5vw, 2.25rem);
  border-block: 1px solid rgb(189 63 112 / 18%);
}

.couple-section__couple h2,
.couple-section__couple h3 {
  margin: 0;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 3.5vw, 1.3rem);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.045em;
  text-transform: uppercase;
}

.couple-section__couple p,
.couple-section__on,
.couple-section__hijri {
  color: var(--color-text-muted);
  font-style: italic;
}

.couple-section__couple p {
  font-size: 0.84em;
}

.couple-section__on,
.couple-section__hijri {
  font-size: 0.85rem;
}

.couple-section__event {
  display: grid;
  gap: var(--space-3);
}

.couple-section__on {
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.couple-section__date {
  display: grid;
  gap: var(--space-1);
  width: min(100%, 32rem);
  margin-inline: auto !important;
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-size: clamp(1rem, 4vw, 1.25rem);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.couple-section__date time {
  display: block;
}

.couple-section__venue {
  display: grid;
  gap: var(--space-2);
  max-width: 34rem;
  padding: clamp(1.25rem, 4vw, 1.75rem);
  border: 1px solid rgb(189 63 112 / 20%);
  border-radius: 0.35rem;
  margin-inline: auto;
  background: rgb(251 244 238 / 62%);
  font-style: normal;
  line-height: 1.7;
}

.couple-section__venue-label {
  color: var(--color-text-muted);
  font-size: 0.84rem;
  font-style: italic;
  letter-spacing: 0.12em;
}

.couple-section__venue strong {
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 4.5vw, 1.65rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.couple-section__venue > span:last-child {
  color: var(--color-text-muted);
  font-size: 0.84rem;
}

@media (min-width: 48rem) {
  .couple-section {
    padding-block: 7rem;
  }

  .couple-section__card {
    padding-inline: 5rem;
  }

}
</style>
