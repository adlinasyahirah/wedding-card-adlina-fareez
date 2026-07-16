<script setup lang="ts">
import { computed } from 'vue'
import { wedding } from '../data/wedding'
import type { WeddingEvent } from '../types/wedding'

const eventDate = computed(() => new Date(wedding.events[0]?.dateTime ?? wedding.dateTime))

const dayNumber = computed(() =>
  new Intl.DateTimeFormat('ms-MY', { day: '2-digit' }).format(eventDate.value),
)

const monthName = computed(() =>
  new Intl.DateTimeFormat('ms-MY', { month: 'long' }).format(eventDate.value),
)

const year = computed(() =>
  new Intl.DateTimeFormat('ms-MY', { year: 'numeric' }).format(eventDate.value),
)

const dayName = computed(() =>
  new Intl.DateTimeFormat('ms-MY', { weekday: 'long' }).format(eventDate.value),
)

function eventTime(event: WeddingEvent): string {
  if (!event.startTime) return 'Masa akan dikemas kini'
  if (!event.endTime) return event.startTime

  return `${event.startTime} – ${event.endTime}`
}

const venueName = computed(() => wedding.venue.name || 'Lokasi akan dikemas kini')

const hasDirections = computed(() =>
  Boolean(wedding.venue.googleMapsUrl || wedding.venue.wazeUrl),
)
</script>

<template>
  <section id="event" v-reveal class="event-section" aria-labelledby="event-heading">
    <div class="event-section__container">
      <header class="event-section__header">
        <p class="event-section__eyebrow">Butiran Majlis</p>
      </header>

      <article class="event-card">
        <div class="event-card__date" aria-hidden="true">
          <span class="event-card__day">{{ dayNumber }}</span>
          <span class="event-card__month">{{ monthName }}</span>
          <span class="event-card__year">{{ year }}</span>
        </div>

        <div class="event-card__details">
          <p class="event-card__day-name">{{ dayName }}</p>

          <div class="event-card__events">
            <section
              v-for="event in wedding.events"
              :key="event.title"
              class="event-card__event"
              :aria-label="event.title"
            >
              <h3 class="event-card__title">{{ event.title }}</h3>
              <p class="event-card__time">{{ eventTime(event) }}</p>
              <p v-if="event.note" class="event-card__note">{{ event.note }}</p>

              <time class="sr-only" :datetime="event.dateTime">
                {{ event.date }}
              </time>
            </section>
          </div>

          <div class="event-card__location">
            <p class="event-card__label">Lokasi</p>
            <p>{{ venueName }}</p>
            <p v-if="wedding.venue.address" class="event-card__address">
              {{ wedding.venue.address }}
            </p>
            <div v-if="hasDirections" class="event-card__actions">
              <a
                v-if="wedding.venue.googleMapsUrl"
                class="event-card__button event-card__button--primary"
                :href="wedding.venue.googleMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps
              </a>
              <a
                v-if="wedding.venue.wazeUrl"
                class="event-card__button"
                :href="wedding.venue.wazeUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Waze
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.event-section {
  position: relative;
  overflow: hidden;
  padding: 5rem var(--space-4);
  color: var(--color-cream-50);
  background:
    radial-gradient(circle at 10% 10%, rgb(235 186 208 / 13%), transparent 24rem),
    var(--color-primary-dark);
}

.event-section__container {
  width: min(100%, 58rem);
  margin-inline: auto;
}

.event-section__header {
  max-width: 36rem;
  margin: 0 auto var(--space-12);
  text-align: center;
}

.event-section__eyebrow {
  margin: 0 0 var(--space-3);
  color: var(--color-champagne);
  font-size: 1.81rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.event-card {
  display: grid;
  overflow: hidden;
  border: 1px solid rgb(235 186 208 / 42%);
  background: rgb(255 255 255 / 5%);
  box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 18%);
}

.event-card__date {
  display: grid;
  padding: var(--space-8) var(--space-6);
  color: var(--color-text);
  background: var(--color-champagne);
  text-align: center;
  place-content: center;
}

.event-card__day {
  font-family: var(--font-display);
  font-size: clamp(4rem, 20vw, 6.5rem);
  line-height: 0.8;
}

.event-card__month,
.event-card__year {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.event-card__month {
  margin-top: var(--space-5, 1.25rem);
}

.event-card__year {
  margin-top: var(--space-1);
}

.event-card__details {
  padding: var(--space-8) var(--space-6);
}

.event-card__day-name {
  margin: 0 0 var(--space-2);
  color: var(--color-champagne);
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.event-card__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.81rem;
  font-weight: 400;
  line-height: 1.15;
}

.event-card__events {
  display: grid;
  gap: var(--space-8);
  margin: var(--space-8) 0 0;
}

.event-card__event,
.event-card__location {
  padding-top: var(--space-4);
  border-top: 1px solid rgb(235 186 208 / 25%);
}

.event-card__label {
  margin-bottom: var(--space-2);
  color: var(--color-champagne);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.event-card__time,
.event-card__location > p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.65;
}

.event-card__time {
  margin-top: var(--space-4);
}

.event-card__location {
  margin-top: var(--space-8);
}

.event-card__location .event-card__label {
  margin-bottom: var(--space-2);
  font-size: 0.63rem;
}

.event-card__address {
  margin-top: var(--space-1) !important;
  color: rgb(253 251 247 / 68%);
  font-size: 0.85rem !important;
}

.event-card__note {
  margin-top: var(--space-2) !important;
  color: var(--color-champagne);
  font-size: 0.82rem !important;
  font-style: italic;
}

.event-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.event-card__button {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.1rem;
  border: 1px solid var(--color-champagne);
  border-radius: 999px;
  color: var(--color-champagne);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.event-card__button--primary {
  color: var(--color-primary-dark);
  background: var(--color-champagne);
}

.event-card__button:focus-visible {
  outline: 2px solid var(--color-champagne);
  outline-offset: 3px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (min-width: 48rem) {
  .event-section {
    padding-block: 7rem;
  }

  .event-section__header {
    margin-bottom: var(--space-16);
  }

  .event-card {
    grid-template-columns: minmax(15rem, 0.8fr) minmax(0, 1.4fr);
  }

  .event-card__details {
    padding: var(--space-12);
  }
}
</style>
