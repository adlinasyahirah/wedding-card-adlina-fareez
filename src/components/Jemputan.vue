<script setup lang="ts">
import { wedding } from '../data/wedding'
import floralLeft from '../assets/images/opening-floral-left.webp'
</script>

<template>
  <section v-reveal class="couple-section" aria-labelledby="couple-title">
    <div class="couple-section__glow couple-section__glow--top" aria-hidden="true"></div>
    <div class="couple-section__glow couple-section__glow--bottom" aria-hidden="true"></div>

    <div class="couple-section__container">
      <div class="couple-section__card">
        <span class="couple-section__floral-corner" aria-hidden="true">
          <img :src="floralLeft" alt="">
        </span>
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
            <p class="couple-section__date">
              <span>Sabtu</span>
              <time :datetime="wedding.dateTime">{{ wedding.date }}</time>
            </p>
            <p class="couple-section__hijri">{{ wedding.hijriDate }}</p>
          </div>

          <address class="couple-section__venue">
            <span class="couple-section__venue-label">Lokasi Majlis</span>
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
  padding: 1rem var(--space-4);
  background: #fad9df;
}

.couple-section__container {
  position: relative;
  width: min(100%, 54rem);
  padding-top: 0;
  margin-inline: auto;
}

.couple-section__card {
  position: relative;
  overflow: hidden;
  padding: clamp(3rem, 8vw, 5rem) clamp(1.35rem, 7vw, 5rem);
  border: 1px solid #b62c51;
  border-radius: 0.35rem;
  background: #fad9df;
  box-shadow: 0 1.5rem 4rem rgb(127 41 77 / 8%);
}

.couple-section__card::before {
  position: absolute;
  inset: clamp(0.55rem, 1.8vw, 0.85rem);
  border: 3px dotted #b62c51;
  border-radius: 0.18rem;
  z-index: 0;
  background: transparent;
  content: '';
  pointer-events: none;
}

.couple-section__card > * {
  position: relative;
  z-index: 1;
}

.couple-section__floral-corner {
  position: absolute;
  z-index: 0;
  top: 4%;
  bottom: 4%;
  left: -5.5rem;
  width: clamp(10rem, 42vw, 18rem);
  opacity: 0.5;
  pointer-events: none;
}

.couple-section__floral-corner img {
  width: auto;
  max-width: none;
  height: 100%;
  filter: saturate(0.6);
}

.couple-section__header {
  margin: 0 auto clamp(1.25rem, 3vw, 1.75rem);
  text-align: center;
}

.couple-section__greeting {
  margin: 0;
  color: #493940;
  font-family: var(--font-display);
  font-size: clamp(0.88rem, 3.9vw, 1.3rem);
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.couple-section__intro {
  margin: var(--space-2) 0 0;
  color: #493940;
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
  color: #493940;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 3.5vw, 1.3rem);
  font-weight: 600;
  letter-spacing: 0.045em;
  text-transform: uppercase;
}

.couple-section__hosts-and {
  margin-block: 0.1rem;
  color: #493940;
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
  color: #493940;
  font-size: clamp(0.88rem, 2.6vw, 1rem);
  line-height: 1.7;
}

.couple-section__copy strong {
  color: #493940;
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
  color: #493940;
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
  gap: 0.3rem;
}

.couple-section__on {
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.couple-section__date {
  display: grid;
  gap: 0.15rem;
  width: min(100%, 32rem);
  margin-inline: auto !important;
  color: #493940;
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
  gap: 0.35rem;
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
  color: #493940;
  font-size: 0.84rem;
  font-style: normal;
  letter-spacing: 0.12em;
}

.couple-section__venue strong {
  color: #493940;
  font-family: var(--font-display);
  font-size: clamp(0.9rem, 3.9vw, 1.65rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  white-space: nowrap;
  text-transform: uppercase;
}

.couple-section__venue > span:last-child {
  color: #493940;
  font-size: 0.84rem;
}

@media (min-width: 48rem) {
  .couple-section__card {
    padding-inline: 5rem;
  }

}
</style>
