<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { wedding } from '../data/wedding'
import type { WeddingEvent } from '../types/wedding'
import floralLeft from '../assets/images/opening-floral-left.webp'
import floralRight from '../assets/images/opening-floral-right.webp'

const emit = defineEmits<{ openBusana: [] }>()

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

const isTentativeOpen = ref(false)
const activeTentativeId = ref(wedding.tentatives[0]?.id ?? '')

const activeTentative = computed(() =>
  wedding.tentatives.find((schedule) => schedule.id === activeTentativeId.value),
)

function openTentative(id?: string): void {
  if (id) activeTentativeId.value = id
  isTentativeOpen.value = true
}

function closeTentative(): void {
  isTentativeOpen.value = false
}

function closeTentativeOnEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape') closeTentative()
}

onMounted(() => window.addEventListener('keydown', closeTentativeOnEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', closeTentativeOnEscape))
</script>

<template>
  <section id="event" class="event-section" aria-labelledby="event-heading">
    <div v-reveal class="event-section__container">
      <header class="event-section__header">
        <p class="event-section__eyebrow">Aturcara Majlis</p>
      </header>

      <article class="event-card">
        <img
          class="event-card__watermark"
          :src="floralRight"
          alt=""
          aria-hidden="true"
        >
        <div class="event-card__date" aria-hidden="true">
          <span class="event-card__day">{{ dayNumber }}</span>
          <span class="event-card__month">{{ monthName }}</span>
          <span class="event-card__year">{{ year }}</span>
        </div>

        <div class="event-card__details">
          <p class="event-card__day-name">{{ dayName }}</p>
          <div class="event-card__schedule-actions">
          <button
            id="tentative"
            class="event-card__button event-card__button--primary event-card__tentative-button"
            type="button"
            @click="openTentative()"
          >
            Lihat Tentatif
          </button>
          <button
            class="event-card__button event-card__button--primary event-card__tentative-button"
            type="button"
            @click="emit('openBusana')"
          >
            Busana
          </button>
          </div>

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
            <p class="event-card__venue-name">{{ venueName }}</p>
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

    <Teleport to="body">
      <div
        v-if="isTentativeOpen"
        class="tentative-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tentative-modal-title"
        @click.self="closeTentative"
      >
        <div class="tentative-modal__panel">
        <img
          class="tentative-modal__floral"
          :src="floralLeft"
          alt=""
          aria-hidden="true"
        >
        <header class="tentative-modal__header">
          <p id="tentative-modal-title">Tentatif Majlis</p>
          <button
            class="tentative-modal__close"
            type="button"
            aria-label="Tutup tentatif"
            @click="closeTentative"
          >
            &times;
          </button>
        </header>

        <div class="tentative-modal__tabs" role="tablist" aria-label="Pilih tentatif majlis">
          <button
            v-for="schedule in wedding.tentatives"
            :key="schedule.id"
            class="tentative-modal__tab"
            :class="{ 'tentative-modal__tab--active': activeTentativeId === schedule.id }"
            type="button"
            role="tab"
            :aria-selected="activeTentativeId === schedule.id"
            @click="activeTentativeId = schedule.id"
          >
            {{ schedule.title }}
          </button>
        </div>

        <ol v-if="activeTentative" class="tentative-modal__timeline">
          <li
            v-for="item in activeTentative.items"
            :key="`${item.time}-${item.title}`"
            class="tentative-modal__item"
          >
            <time class="tentative-modal__time">{{ item.time }}</time>
            <div class="tentative-modal__description">
              <h3>{{ item.title }}</h3>
              <ul v-if="item.details?.length">
                <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
              </ul>
            </div>
          </li>
        </ol>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.event-section {
  position: relative;
  overflow: hidden;
  padding: 5rem var(--space-4) 1rem;
  color: #493940;
  background: #d4c7b4;
}

.event-card__watermark {
  position: absolute;
  z-index: 0;
  right: -4.5rem;
  bottom: -5rem;
  width: clamp(14rem, 52vw, 24rem);
  height: auto;
  opacity: 0.09;
  pointer-events: none;
  filter: saturate(0.55) brightness(1.7);
}

.event-section__container {
  position: relative;
  z-index: 1;
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
  color: #fff;
  text-shadow: 0 2px 5px rgb(73 57 40 / 20%);
  font-size: 1.81rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

@media (max-width: 30rem) {
  .event-section__eyebrow {
    font-size: clamp(1.1rem, 5.2vw, 1.35rem);
    letter-spacing: 0.18em;
  }
}

.event-card {
  position: relative;
  isolation: isolate;
  display: grid;
  overflow: hidden;
  border: 1px solid #fff;
  border-radius: 0.35rem;
  color: #fffaf7;
  background: #756653;
  box-shadow: none;
}

.event-card__date,
.event-card__details {
  position: relative;
  z-index: 1;
}

.event-card__date {
  display: grid;
  padding: var(--space-8) var(--space-6);
  color: var(--color-text);
  background: #e9e2d9;
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
  font-family: var(--font-body);
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: 0.24em;
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
  color: #fff;
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
  gap: 1.25rem;
  margin: var(--space-8) 0 0;
}

.event-card__event,
.event-card__location {
  padding-top: var(--space-4);
  border-top: 1px solid rgb(255 255 255 / 65%);
}

.event-card__label {
  margin-bottom: var(--space-2);
  color: #fff;
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
  margin-top: 1rem;
}

.event-card__location .event-card__label {
  margin-bottom: var(--space-2);
  font-size: 0.63rem;
}

.event-card__location .event-card__venue-name {
  font-size: 1.1rem;
}

.event-card__address {
  margin-top: var(--space-1) !important;
  color: rgb(253 251 247 / 68%);
  font-size: 0.85rem !important;
}

.event-card__note {
  margin-top: var(--space-2) !important;
  color: #fff;
  font-size: 0.82rem !important;
  font-style: italic;
}

.event-card__tentative-button {
  background: transparent;
  cursor: pointer;
  margin-top: var(--space-4);
}

.event-card__schedule-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-3);
}

.event-card__tentative-button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 4px;
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
  border: 1px solid #fff;
  border-radius: 999px;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.event-card__button--primary {
  color: #fff;
  background: #645542;
}

.event-card__button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

.tentative-modal {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: grid;
  padding: 1.5rem;
  background: rgb(24 21 17 / 70%);
  backdrop-filter: blur(0.55rem);
  -webkit-backdrop-filter: blur(0.55rem);
  place-items: center;
}

.tentative-modal__panel {
  position: relative;
  isolation: isolate;
  width: min(100%, 27rem);
  max-height: min(88svh, 52rem);
  padding: 1.25rem clamp(1rem, 5vw, 2rem) 2.25rem;
  scrollbar-width: thin;
  scrollbar-color: rgb(255 255 255 / 40%) transparent;
  overflow-y: auto;
  border: 1px solid rgb(255 255 255 / 65%);
  border-radius: 1.5rem;
  color: #fff;
  background:
    linear-gradient(rgb(27 22 17 / 60%), rgb(27 22 17 / 76%)),
    url('../assets/images/background.jpeg') center / cover no-repeat;
  box-shadow: 0 1.5rem 4rem rgb(45 19 28 / 28%);
}

.tentative-modal__panel > :not(.tentative-modal__floral):not(.tentative-modal__close) {
  position: relative;
  z-index: 1;
}

.tentative-modal__floral {
  position: absolute;
  z-index: 0;
  top: 8rem;
  left: -1.75rem;
  width: 8rem;
  height: auto;
  opacity: 0.12;
  pointer-events: none;
}

.tentative-modal__close {
  display: grid;
  width: 2.5rem;
  min-height: 2.5rem;
  grid-column: 3;
  grid-row: 1;
  padding: 0;
  border: 1px solid #fff;
  border-radius: 50%;
  color: #fff;
  background: transparent;
  cursor: pointer;
  font-size: 1.55rem;
  font-weight: 300;
  line-height: 1;
  place-items: center;
}

.tentative-modal__header {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) 2.5rem;
  gap: 0.35rem;
  min-height: 2.5rem;
  align-items: center;
  margin-bottom: 1.25rem;
  text-align: center;
}

.tentative-modal__header p {
  margin: 0;
  transform: translateX(-1.5rem);
}

.tentative-modal__header p {
  grid-column: 2;
  grid-row: 1;
  color: #fff;
  font-family: var(--font-display);
  font-size: clamp(0.95rem, 4.7vw, 1.25rem);
  font-weight: 600;
  letter-spacing: clamp(0.04em, 0.8vw, 0.1em);
  white-space: nowrap;
  text-transform: uppercase;
}

@media (max-width: 22rem) {
  .tentative-modal__header {
    grid-template-columns: 2.15rem minmax(0, 1fr) 2.15rem;
    gap: 0.2rem;
  }

  .tentative-modal__close {
    width: 2.15rem;
    min-height: 2.15rem;
    font-size: 1.3rem;
  }

  .tentative-modal__header p {
    font-size: clamp(0.82rem, 4.5vw, 0.95rem);
    letter-spacing: 0.035em;
  }
}

.tentative-modal__tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid #fff;
  border-radius: 999px;
  margin-bottom: var(--space-6);
}

.tentative-modal__tab {
  min-width: 0;
  min-height: 2.75rem;
  padding: 0.55rem;
  border: 0;
  border-radius: 999px;
  color: #fff;
  background: transparent;
  cursor: pointer;
  font-size: clamp(0.68rem, 2.8vw, 0.85rem);
  font-weight: 600;
  text-transform: uppercase;
}

.tentative-modal__tab--active {
  color: #fff;
  background: rgb(255 255 255 / 22%);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 70%);
}

.tentative-modal__tab:hover,
.tentative-modal__close:hover {
  background: rgb(255 255 255 / 15%);
}

.tentative-modal__tab:focus-visible,
.tentative-modal__close:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

.tentative-modal__timeline {
  position: relative;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.tentative-modal__timeline::before {
  position: absolute;
  top: 0;
  bottom: 1rem;
  left: 0.25rem;
  width: 1px;
  background: #fff;
  content: '';
}

.tentative-modal__item {
  position: relative;
  display: grid;
  grid-template-columns: 1.6rem minmax(0, 1fr);
  gap: 0.85rem;
  min-height: 6rem;
  padding: 0.5rem 0 1.75rem 1rem;
}

.tentative-modal__item::before {
  position: absolute;
  top: 1.2rem;
  left: calc(0.25rem - 4px);
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #fff;
  content: '';
}

.tentative-modal__time {
  justify-self: center;
  align-self: start;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: none;
}

.tentative-modal__item h3 {
  margin: 0;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgb(255 255 255 / 45%);
  color: #fff;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-style: italic;
  font-weight: 600;
  line-height: 1.4;
}

.tentative-modal__item ul {
  padding-left: 1rem;
  margin: 0.6rem 0 0;
  font-size: 0.8rem;
  line-height: 1.6;
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
    padding-block: 7rem 1rem;
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
