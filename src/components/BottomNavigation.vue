<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface NavigationItem {
  id: string
  label: string
  icon: 'calendar' | 'contact' | 'heart' | 'home' | 'timeline'
}

const navigationItems: NavigationItem[] = [
  { id: 'event', label: 'Majlis', icon: 'calendar' },
  { id: 'tentative', label: 'Tentatif', icon: 'timeline' },
  { id: 'hero', label: 'Utama', icon: 'home' },
  { id: 'guestbook', label: 'Ucapan', icon: 'heart' },
  { id: 'contact', label: 'Hubungi', icon: 'contact' },
]

const activeSection = ref('hero')
let observer: IntersectionObserver | undefined

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

      if (visibleEntry?.target.id) {
        activeSection.value = visibleEntry.target.id
      }
    },
    {
      rootMargin: '-25% 0px -55% 0px',
      threshold: [0, 0.1, 0.25, 0.5],
    },
  )

  navigationItems.forEach(({ id }) => {
    const section = document.getElementById(id)
    if (section) observer?.observe(section)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

function setActiveSection(id: string): void {
  activeSection.value = id
}
</script>

<template>
  <nav class="bottom-navigation" aria-label="Navigasi undangan">
    <a
      v-for="item in navigationItems"
      :key="item.id"
      class="bottom-navigation__item"
      :class="{
        'bottom-navigation__item--active': activeSection === item.id,
        'bottom-navigation__item--home': item.id === 'hero',
      }"
      :href="`#${item.id}`"
      :aria-current="activeSection === item.id ? 'location' : undefined"
      @click="setActiveSection(item.id)"
    >
      <svg
        v-if="item.icon === 'home'"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M3.5 10.5 12 3l8.5 7.5v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z" />
        <path d="M9 20.5v-6h6v6" />
      </svg>
      <svg
        v-else-if="item.icon === 'calendar'"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </svg>
      <svg
        v-else-if="item.icon === 'timeline'"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="1.5" />
        <circle cx="6" cy="12" r="1.5" />
        <circle cx="6" cy="18" r="1.5" />
        <path d="M10 6h10M10 12h10M10 18h10" />
      </svg>
      <svg
        v-else-if="item.icon === 'heart'"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.5a8 8 0 0 1-9 7.9L5 21l1.6-4.6A8 8 0 1 1 20 11.5Z" />
        <path d="M9 10h.01M12 10h.01M15 10h.01" />
      </svg>

      <span>{{ item.label }}</span>
    </a>
  </nav>
</template>

<style scoped>
.bottom-navigation {
  position: fixed;
  z-index: 50;
  right: var(--space-3);
  bottom: max(var(--space-3), env(safe-area-inset-bottom));
  left: var(--space-3);
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  max-width: 31rem;
  min-height: 4.25rem;
  margin-inline: auto;
  padding: 0.4rem;
  border: 1px solid rgb(189 63 112 / 28%);
  border-radius: 1.4rem;
  background: rgb(253 251 247 / 92%);
  box-shadow: 0 0.75rem 2.5rem rgb(51 42 33 / 18%);
  backdrop-filter: blur(1rem);
  -webkit-backdrop-filter: blur(1rem);
}

.bottom-navigation__item {
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 3.4rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.22rem;
  border-radius: 1rem;
  color: var(--color-text-muted);
  font-size: clamp(0.5rem, 2.3vw, 0.62rem);
  font-weight: 600;
  letter-spacing: 0.03em;
  text-decoration: none;
}

.bottom-navigation__item svg {
  width: 1.2rem;
  height: 1.2rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.bottom-navigation__item--active {
  color: var(--color-gold);
  background: rgb(235 186 208 / 22%);
}

.bottom-navigation__item:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: -2px;
}

@media (min-width: 48rem) {
  .bottom-navigation {
    right: auto;
    bottom: var(--space-6);
    left: 50%;
    width: 29rem;
    transform: translateX(-50%);
  }
}
</style>
