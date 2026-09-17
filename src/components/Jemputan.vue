<script setup lang="ts">
import { wedding } from '../data/wedding'
import floralLeft from '../assets/images/opening-floral-left.webp'
</script>

<template>
  <section id="jemputan" v-reveal class="couple-section" aria-labelledby="couple-title">
    <div class="couple-section__glow couple-section__glow--top" aria-hidden="true"></div>
    <div class="couple-section__glow couple-section__glow--bottom" aria-hidden="true"></div>

    <div class="couple-section__container">
      <div class="couple-section__card">
        <span class="couple-section__floral-corner" aria-hidden="true">
          <img :src="floralLeft" alt="">
        </span>

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
  padding: clamp(1rem, 4vw, 2.5rem) var(--space-4) clamp(2rem, 6vw, 4rem);
  background: linear-gradient(180deg, #b8aa94 0%, #c7b9a3 35%, #d4c7b4 100%);
}

.couple-section__container {
  position: relative;
  width: min(100%, 54rem);
  padding-top: 0;
  margin-inline: auto;
}

.couple-section__card {
  --lace-unit: clamp(0.16px, 0.045vw, 0.25px);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(1.75rem, 5vw, 3rem) clamp(0.75rem, 3vw, 2rem);
  border-style: solid;
  border-color: transparent;
  border-width:
    calc(210 * var(--lace-unit))
    calc(170 * var(--lace-unit))
    calc(160 * var(--lace-unit))
    calc(170 * var(--lace-unit));
  border-image-source: url('../assets/images/lace.png');
  border-image-slice: 210 170 160 170;
  border-image-repeat: round;
  background: #e9e2d9;
  background-clip: padding-box;
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
  white-space: normal;
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
.couple-section__couple p {
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

.couple-section__couple h3 {
  font-family: 'Snell Roundhand', 'Brush Script MT', 'Segoe Script', cursive;
  font-size: clamp(1.45rem, 6vw, 2rem);
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-transform: none;
}

.couple-section__couple p,
.couple-section__on {
  color: #493940;
  font-style: italic;
}

.couple-section__couple p {
  font-size: 0.84em;
}

.couple-section__on {
  font-size: 0.85rem;
}

.couple-section__on {
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 22.5rem) {
  .couple-section {
    padding-inline: 0.75rem;
  }

  .couple-section__card {
    padding-inline: 0.75rem;
  }

  .couple-section__greeting {
    font-size: 0.72rem;
    white-space: normal;
  }

  .couple-section__intro {
    font-size: 0.74rem;
  }

  .couple-section__hosts {
    font-size: 0.82rem;
    letter-spacing: 0.015em;
  }

  .couple-section__copy {
    font-size: 0.72rem;
    line-height: 1.6;
  }

  .couple-section__copy strong {
    font-size: 0.7rem;
    letter-spacing: 0;
  }

  .couple-section__couple h3 {
    font-size: 1.15rem;
    line-height: 1.35;
  }

  .couple-section__couple p {
    font-size: 0.72rem;
  }

  .couple-section__header,
  .couple-section__hosts,
  .couple-section__copy,
  .couple-section__couple{
    max-width: 100%;
    overflow-wrap: anywhere;
  }
}

@media (min-width: 48rem) {
  .couple-section__card {
    padding-inline: 2rem;
  }

}
</style>
