<script setup lang="ts">
import { computed } from 'vue'
import { wedding } from '../data/wedding'

const eventDate = computed(() => new Date(wedding.event.dateTime))

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

const eventTime = computed(() => {
  if (!wedding.event.startTime) return 'Masa akan dikemas kini'
  if (!wedding.event.endTime) return wedding.event.startTime

  return `${wedding.event.startTime} – ${wedding.event.endTime}`
})

const venueName = computed(() => wedding.venue.name || 'Lokasi akan dikemas kini')
</script>

<template>
  <section id="event" v-reveal class="event-section" aria-labelledby="event-heading">
    <div class="event-section__container">
      <header class="event-section__header">
        <p class="event-section__eyebrow">Butiran Majlis</p>
        <h2 id="event-heading" class="event-section__title">Raikan Bersama Kami</h2>
      </header>

      <article class="event-card">
        <div class="event-card__date" aria-hidden="true">
          <span class="event-card__day">{{ dayNumber }}</span>
          <span class="event-card__month">{{ monthName }}</span>
          <span class="event-card__year">{{ year }}</span>
        </div>

        <div class="event-card__details">
          <p class="event-card__day-name">{{ dayName }}</p>
          <h3 class="event-card__title">{{ wedding.event.title }}</h3>

          <dl class="event-card__list">
            <div class="event-card__detail">
              <dt>Masa</dt>
              <dd>{{ eventTime }}</dd>
            </div>

            <div class="event-card__detail">
              <dt>Lokasi</dt>
              <dd>{{ venueName }}</dd>
              <dd v-if="wedding.venue.address" class="event-card__address">
                {{ wedding.venue.address }}
              </dd>
            </div>
          </dl>

          <time class="sr-only" :datetime="wedding.event.dateTime">
            {{ wedding.event.date }}
          </time>
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
    radial-gradient(circle at 10% 10%, rgb(216 195 165 / 13%), transparent 24rem),
    #3e372f;
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
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.event-section__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.35rem, 10vw, 3.75rem);
  font-weight: 400;
  line-height: 1.1;
}

.event-card {
  display: grid;
  overflow: hidden;
  border: 1px solid rgb(216 195 165 / 42%);
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
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.event-card__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 9vw, 3rem);
  font-weight: 400;
  line-height: 1.15;
}

.event-card__list {
  display: grid;
  gap: var(--space-6);
  margin: var(--space-8) 0 0;
}

.event-card__detail {
  padding-top: var(--space-4);
  border-top: 1px solid rgb(216 195 165 / 25%);
}

.event-card__detail dt {
  margin-bottom: var(--space-2);
  color: var(--color-champagne);
  font-size: 0.63rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.event-card__detail dd {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.65;
}

.event-card__address {
  margin-top: var(--space-1) !important;
  color: rgb(253 251 247 / 68%);
  font-size: 0.85rem !important;
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
