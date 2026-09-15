<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { wedding } from '../data/wedding'
import floralLeft from '../assets/images/opening-floral-left.webp'

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const SECOND = 1_000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const targetTime = new Date(wedding.dateTime).getTime()
const now = ref(Date.now())

const timeRemaining = computed<TimeRemaining>(() => {
  const difference = Math.max(targetTime - now.value, 0)

  return {
    days: Math.floor(difference / DAY),
    hours: Math.floor((difference % DAY) / HOUR),
    minutes: Math.floor((difference % HOUR) / MINUTE),
    seconds: Math.floor((difference % MINUTE) / SECOND),
  }
})

const hasStarted = computed(() => now.value >= targetTime)

const timer = window.setInterval(() => {
  now.value = Date.now()
}, SECOND)

onBeforeUnmount(() => {
  window.clearInterval(timer)
})

function formatNumber(value: number): string {
  return String(value).padStart(2, '0')
}
</script>

<template>
  <section class="countdown" aria-labelledby="countdown-title">
    <img
      class="countdown__floral"
      :src="floralLeft"
      alt=""
      aria-hidden="true"
    >

    <div v-reveal class="countdown__container">
      <div class="countdown__letter">
        <header class="countdown__letter-heading">
          <p class="countdown__eyebrow">Menghitung Hari</p>
          <h2 id="countdown-title" class="countdown__title">
            Menuju Hari Bahagia
          </h2>
        </header>
        <div class="countdown__letter-content">
      <p v-if="hasStarted" class="countdown__message" role="status">
        Hari yang dinantikan telah tiba.
      </p>

      <div v-else class="countdown__grid" aria-live="off">
        <div class="countdown__item">
          <span class="countdown__value">{{ formatNumber(timeRemaining.days) }}</span>
          <span class="countdown__label">Hari</span>
        </div>

        <span class="countdown__separator" aria-hidden="true">:</span>

        <div class="countdown__item">
          <span class="countdown__value">{{ formatNumber(timeRemaining.hours) }}</span>
          <span class="countdown__label">Jam</span>
        </div>

        <span class="countdown__separator" aria-hidden="true">:</span>

        <div class="countdown__item">
          <span class="countdown__value">{{ formatNumber(timeRemaining.minutes) }}</span>
          <span class="countdown__label">Minit</span>
        </div>

        <span class="countdown__separator" aria-hidden="true">:</span>

        <div class="countdown__item">
          <span class="countdown__value">{{ formatNumber(timeRemaining.seconds) }}</span>
          <span class="countdown__label">Saat</span>
        </div>
      </div>

      <p class="countdown__date">
        <time :datetime="wedding.dateTime">{{ wedding.date }}</time>
      </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.countdown {
  position: relative;
  overflow: hidden;
  padding: 0 var(--space-4) clamp(3rem, 8vw, 5rem);
  color: #493940;
  background: #d4c7b4;
}

.countdown__floral {
  position: absolute;
  z-index: 1;
  top: 4%;
  left: -2%;
  width: auto;
  height: 94%;
  object-fit: contain;
  object-position: left center;
  pointer-events: none;
}

.countdown__container {
  position: relative;
  z-index: 2;
  width: min(100%, 48rem);
  margin-inline: auto;
  text-align: center;
}

.countdown__letter-heading {
  position: absolute;
  top: 15%;
  left: 20%;
  width: 58%;
  color: #fff;
  transform: rotate(-11deg);
}

.countdown__eyebrow {
  margin: 0 0 1.5cqw;
  color: #fff;
  font-size: 3.5cqw;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.countdown__title {
  margin: 0;
  font-family: 'Snell Roundhand', 'Brush Script MT', 'Segoe Script', cursive;
  font-size: 4.6cqw;
  font-weight: 400;
  line-height: 1.3;
}

.countdown__letter {
  position: relative;
  container-type: inline-size;
  width: 100%;
  aspect-ratio: 1238 / 978;
  margin-top: 0;
  transform: translate(1.81rem, 1rem);
  background: url('../assets/images/letter.png') center / contain no-repeat;
  filter: drop-shadow(0 0.8rem 0.8rem rgb(65 43 35 / 18%));
}

/* Keep the details inside the cream paper and below the wax seal. */
.countdown__letter-content {
  position: absolute;
  inset: 58% 18% 15% 31%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3cqw;
}

.countdown__grid {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: start;
  gap: 0.4cqw;
}

.countdown__item {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
}

.countdown__value {
  font-family: var(--font-display);
  font-size: 7.5cqw;
  font-variant-numeric: tabular-nums;
  font-weight: 400;
  line-height: 1;
}

.countdown__label {
  margin-top: 1.5cqw;
  font-size: 2cqw;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.countdown__separator {
  font-size: 6cqw;
  font-weight: 300;
  line-height: 1;
}

.countdown__date {
  margin: 0;
  font-size: 2.7cqw;
  letter-spacing: 0.07em;
  white-space: nowrap;
  text-transform: uppercase;
}

.countdown__message {
  margin: 0;
  font-family: var(--font-display);
  font-size: 3.8cqw;
  line-height: 1.4;
}
@media (max-width: 30rem) {
  .countdown__floral {
    top: 0;
    left: 0;
    height: 100%;
  }
}
</style>
