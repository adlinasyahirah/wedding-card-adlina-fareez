<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { wedding } from '../data/wedding'

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
  <section v-reveal class="countdown" aria-labelledby="countdown-title">
    <div class="countdown__container">
      <p class="countdown__eyebrow">Menghitung Hari</p>
      <h2 id="countdown-title" class="countdown__title">
        Menuju Hari Bahagia
      </h2>

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
  </section>
</template>

<style scoped>
.countdown {
  position: relative;
  overflow: hidden;
  padding: var(--space-16) var(--space-4);
  color: var(--color-text);
  background: var(--color-cream-100);
}

.countdown::before,
.countdown::after {
  position: absolute;
  width: 8rem;
  height: 8rem;
  border: 1px solid rgb(189 63 112 / 20%);
  border-radius: 50%;
  content: '';
}

.countdown::before {
  top: -5rem;
  left: -4rem;
}

.countdown::after {
  right: -4rem;
  bottom: -5rem;
}

.countdown__container {
  position: relative;
  z-index: 1;
  width: min(100%, 42rem);
  margin-inline: auto;
  text-align: center;
}

.countdown__eyebrow {
  margin: 0 0 var(--space-3);
  color: var(--color-gold);
  font-size: 1.81rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.countdown__title {
  margin: 0;
  color: var(--color-primary);
  font-family: 'Snell Roundhand', 'Brush Script MT', 'Segoe Script', cursive;
  font-size: clamp(1.75rem, 6vw, 2.15rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.01em;
}

.countdown__grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: start;
  margin-top: var(--space-12);
  padding: clamp(1.5rem, 6vw, 2.5rem) clamp(0.75rem, 4vw, 2rem);
  border: 1px solid rgb(189 63 112 / 24%);
  border-radius: 0.35rem;
  background: rgb(255 255 255 / 42%);
}

.countdown__item {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
}

.countdown__value {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 9.5vw, 3.75rem);
  font-variant-numeric: tabular-nums;
  font-weight: 400;
  line-height: 1;
}

.countdown__label {
  margin-top: var(--space-3);
  color: var(--color-text-muted);
  font-size: clamp(0.58rem, 2.5vw, 0.72rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.countdown__separator {
  padding-top: 0.15rem;
  color: var(--color-gold);
  font-size: clamp(1.5rem, 7vw, 3rem);
  font-weight: 300;
  line-height: 1;
}

.countdown__date,
.countdown__message {
  margin: var(--space-8) 0 0;
  color: var(--color-text-muted);
  font-size: 1.81rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.countdown__message {
  color: var(--color-gold);
  font-family: var(--font-display);
  font-size: 1.15rem;
  letter-spacing: 0.04em;
  text-transform: none;
}

@media (min-width: 48rem) {
  .countdown {
    padding-block: 6rem;
  }

  .countdown__grid {
    margin-top: var(--space-16);
  }
}
</style>
