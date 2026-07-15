<script setup lang="ts">
import { computed } from 'vue'
import { wedding } from '../data/wedding'

const hasDirections = computed(() =>
  Boolean(wedding.venue.googleMapsUrl || wedding.venue.wazeUrl),
)
</script>

<template>
  <section id="maps" v-reveal class="maps-section" aria-labelledby="maps-heading">
    <div class="maps-section__container">
      <header class="maps-section__header">
        <p class="maps-section__eyebrow">Lokasi Majlis</p>
        <h2 id="maps-heading" class="maps-section__title">Temui Kami Di Sini</h2>
      </header>

      <div class="maps-card">
        <div class="maps-card__visual">
          <iframe
            v-if="wedding.venue.mapEmbedUrl"
            class="maps-card__frame"
            :src="wedding.venue.mapEmbedUrl"
            :title="`Peta ke ${wedding.venue.name || 'lokasi majlis'}`"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>

          <div v-else class="maps-card__placeholder" aria-hidden="true">
            <span class="maps-card__pin">
              <span></span>
            </span>
            <span class="maps-card__route maps-card__route--one"></span>
            <span class="maps-card__route maps-card__route--two"></span>
          </div>
        </div>

        <div class="maps-card__content">
          <p class="maps-card__label">Alamat</p>
          <h3 class="maps-card__venue">
            {{ wedding.venue.name || 'Lokasi akan dikemas kini' }}
          </h3>
          <address v-if="wedding.venue.address" class="maps-card__address">
            {{ wedding.venue.address }}
          </address>
          <p v-else class="maps-card__address maps-card__address--empty">
            Alamat penuh majlis akan diumumkan tidak lama lagi.
          </p>

          <div v-if="hasDirections" class="maps-card__actions">
            <a
              v-if="wedding.venue.googleMapsUrl"
              class="maps-card__button maps-card__button--primary"
              :href="wedding.venue.googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps
            </a>
            <a
              v-if="wedding.venue.wazeUrl"
              class="maps-card__button"
              :href="wedding.venue.wazeUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Waze
            </a>
          </div>

          <p v-else class="maps-card__directions-empty">
            Pautan navigasi akan dikemas kini.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.maps-section {
  padding: 5rem var(--space-4);
  color: var(--color-text);
  background: var(--color-cream-50);
}

.maps-section__container {
  width: min(100%, 68rem);
  margin-inline: auto;
}

.maps-section__header {
  max-width: 36rem;
  margin: 0 auto var(--space-12);
  text-align: center;
}

.maps-section__eyebrow {
  margin: 0 0 var(--space-3);
  color: var(--color-gold);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.maps-section__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 10vw, 4rem);
  font-weight: 400;
  line-height: 1.1;
}

.maps-card {
  display: grid;
  overflow: hidden;
  border: 1px solid rgb(168 134 82 / 28%);
  background: var(--color-cream-100);
  box-shadow: 0 1.5rem 4rem rgb(70 62 53 / 10%);
}

.maps-card__visual {
  position: relative;
  min-height: 20rem;
  overflow: hidden;
  background: #e3d6c4;
}

.maps-card__frame {
  width: 100%;
  height: 100%;
  min-height: 20rem;
  border: 0;
}

.maps-card__placeholder {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    linear-gradient(35deg, transparent 47%, rgb(255 255 255 / 42%) 48% 52%, transparent 53%),
    linear-gradient(125deg, transparent 45%, rgb(255 255 255 / 30%) 46% 50%, transparent 51%),
    #e3d6c4;
}

.maps-card__pin {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid rgb(255 255 255 / 65%);
  border-radius: 50% 50% 50% 0;
  background: var(--color-gold);
  box-shadow: 0 0.75rem 1.5rem rgb(70 62 53 / 24%);
  transform: translate(-50%, -70%) rotate(-45deg);
  place-items: center;
}

.maps-card__pin span {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: var(--color-cream-50);
}

.maps-card__route {
  position: absolute;
  height: 2px;
  background: rgb(168 134 82 / 42%);
  transform-origin: left;
}

.maps-card__route--one {
  top: 30%;
  left: 8%;
  width: 44%;
  transform: rotate(18deg);
}

.maps-card__route--two {
  right: -5%;
  bottom: 24%;
  width: 48%;
  transform: rotate(-24deg);
}

.maps-card__content {
  align-self: center;
  padding: var(--space-8) var(--space-6);
}

.maps-card__label {
  margin: 0 0 var(--space-3);
  color: var(--color-gold);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.maps-card__venue {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 9vw, 3.25rem);
  font-weight: 400;
  line-height: 1.15;
}

.maps-card__address {
  margin: var(--space-4) 0 0;
  color: var(--color-text-muted);
  font-size: 0.92rem;
  font-style: normal;
  line-height: 1.75;
}

.maps-card__address--empty {
  font-style: italic;
}

.maps-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-8);
}

.maps-card__button {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.2rem;
  border: 1px solid var(--color-gold);
  border-radius: 999px;
  color: var(--color-gold);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.maps-card__button--primary {
  color: var(--color-white);
  background: var(--color-gold);
}

.maps-card__button:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

.maps-card__directions-empty {
  margin: var(--space-8) 0 0;
  color: var(--color-text-muted);
  font-size: 0.76rem;
  font-style: italic;
}

@media (min-width: 48rem) {
  .maps-section {
    padding-block: 7rem;
  }

  .maps-card {
    grid-template-columns: minmax(0, 1.25fr) minmax(20rem, 0.75fr);
  }

  .maps-card__visual,
  .maps-card__frame {
    min-height: 31rem;
  }

  .maps-card__content {
    padding: var(--space-12);
  }
}
</style>
