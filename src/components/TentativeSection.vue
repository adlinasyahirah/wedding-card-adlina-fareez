<script setup lang="ts">
import { computed, ref } from 'vue'
import { wedding } from '../data/wedding'

const activeTab = ref(
  wedding.tentatives.find((schedule) => schedule.id === 'bersanding')?.id
    ?? wedding.tentatives[0]?.id
    ?? '',
)

const activeSchedule = computed(() =>
  wedding.tentatives.find((schedule) => schedule.id === activeTab.value),
)
</script>

<template>
  <section
    id="tentative"
    v-reveal
    class="tentative-section"
    aria-labelledby="tentative-heading"
  >
    <div class="tentative-section__container">
      <header class="tentative-section__header">
        <p class="tentative-section__eyebrow">Atur Cara</p>
        <h3 id="tentative-heading" class="tentative-section__title">TENTATIF MAJLIS</h3>
        <p class="tentative-section__intro">
          Susunan acara untuk meraikan hari istimewa kami.
        </p>
      </header>

      <div
        v-if="wedding.tentatives.length"
        class="tentative-section__tabs"
        role="tablist"
        aria-label="Pilih tentatif majlis"
      >
        <button
          v-for="schedule in wedding.tentatives"
          :id="`tab-${schedule.id}`"
          :key="schedule.id"
          class="tentative-section__tab"
          :class="{ 'tentative-section__tab--active': activeTab === schedule.id }"
          type="button"
          role="tab"
          :aria-selected="activeTab === schedule.id"
          :aria-controls="`panel-${schedule.id}`"
          @click="activeTab = schedule.id"
        >
          {{ schedule.title }}
        </button>
      </div>

      <ol
        v-if="activeSchedule"
        :id="`panel-${activeSchedule.id}`"
        class="timeline"
        role="tabpanel"
        :aria-labelledby="`tab-${activeSchedule.id}`"
      >
        <li
          v-for="(item, index) in activeSchedule.items"
          :key="`${item.time}-${item.title}`"
          class="timeline__item"
        >
          <div class="timeline__marker" aria-hidden="true">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
          </div>

          <article class="timeline__content">
            <time v-if="item.time" class="timeline__time">{{ item.time }}</time>
            <p v-else class="timeline__time">Masa akan dikemas kini</p>
            <h3 class="timeline__title">{{ item.title }}</h3>
            <ul v-if="item.details?.length" class="timeline__details">
              <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
            </ul>
          </article>
        </li>
      </ol>

      <p v-else class="tentative-section__empty">
        Tentatif majlis akan dikemas kini.
      </p>
    </div>
  </section>
</template>

<style scoped>
.tentative-section {
  padding: 5rem var(--space-4);
  color: var(--color-text);
  background: var(--color-cream-50);
}

.tentative-section__container {
  width: min(100%, 46rem);
  margin-inline: auto;
}

.tentative-section__header {
  max-width: 35rem;
  margin: 0 auto var(--space-12);
  text-align: center;
}

.tentative-section__eyebrow {
  margin: 0 0 var(--space-3);
  color: var(--color-gold);
  font-size: 1.81rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.tentative-section__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 2.8rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.1;
}

.tentative-section__intro {
  margin: var(--space-4) auto 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.8;
}

.tentative-section__tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
  margin-bottom: var(--space-12);
  padding: var(--space-1);
  border: 1px solid rgb(189 63 112 / 24%);
  border-radius: 999px;
  background: var(--color-cream-100);
}

.tentative-section__tab {
  min-width: 0;
  min-height: 3.25rem;
  padding: 0.65rem var(--space-3);
  border: 0;
  border-radius: 999px;
  color: var(--color-text-muted);
  background: transparent;
  cursor: pointer;
  font-size: clamp(0.78rem, 3vw, 0.95rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tentative-section__tab--active {
  color: var(--color-white);
  background: var(--color-primary);
  box-shadow: 0 0.4rem 1.2rem rgb(189 63 112 / 18%);
}

.tentative-section__tab:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

.timeline {
  margin: 0;
  padding: 0;
  list-style: none;
}

.timeline__item {
  position: relative;
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: var(--space-4);
  padding-bottom: var(--space-8);
}

.timeline__item:not(:last-child)::before {
  position: absolute;
  top: 2.5rem;
  bottom: 0;
  left: 1.5rem;
  width: 1px;
  background: rgb(189 63 112 / 35%);
  content: '';
}

.timeline__marker {
  position: relative;
  z-index: 1;
  display: grid;
  width: 3rem;
  height: 3rem;
  border: 1px solid rgb(189 63 112 / 50%);
  border-radius: 50%;
  color: var(--color-gold);
  background: var(--color-cream-50);
  font-size: 0.93rem;
  letter-spacing: 0.08em;
  place-items: center;
}

.timeline__content {
  padding: var(--space-1) 0 var(--space-6);
}

.timeline__time {
  margin: 0 0 var(--space-2);
  color: var(--color-gold);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.timeline__title {
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(1rem, 3.8vw, 1.2rem);
  font-weight: 650;
  letter-spacing: 0.04em;
  line-height: 1.4;
  text-transform: uppercase;
}

.timeline__details {
  margin: var(--space-3) 0 0;
  padding-left: 1.15rem;
  color: var(--color-text-muted);
  font-size: 1.1rem;
  line-height: 1.7;
}

.timeline__details li + li {
  margin-top: var(--space-1);
}

.tentative-section__empty {
  margin: 0;
  color: var(--color-text-muted);
  text-align: center;
  font-style: italic;
}

@media (min-width: 48rem) {
  .tentative-section {
    padding-block: 7rem;
  }

  .tentative-section__header {
    margin-bottom: var(--space-16);
  }

  .timeline__item {
    grid-template-columns: 4rem minmax(0, 1fr);
    gap: var(--space-8);
  }

  .timeline__item:not(:last-child)::before {
    left: 2rem;
  }

  .timeline__marker {
    width: 4rem;
    height: 4rem;
  }
}
</style>
