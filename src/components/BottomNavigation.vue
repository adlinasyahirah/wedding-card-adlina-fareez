<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface NavigationItem {
  id: string
  label: string
  icon: 'calendar' | 'contact' | 'heart' | 'home' | 'theme'
}

const navigationItems: NavigationItem[] = [
  { id: 'hero', label: 'Utama', icon: 'home' },
  { id: 'event', label: 'Majlis', icon: 'calendar' },
  { id: 'theme', label: 'Busana', icon: 'theme' },
  { id: 'guestbook', label: 'Ucapan', icon: 'heart' },
  { id: 'contact', label: 'Hubungi', icon: 'contact' },
]

const activeSection = ref('hero')
const isThemeOpen = ref(false)
let previousSection = 'hero'
let observer: IntersectionObserver | undefined

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && isThemeOpen.value) closeTheme()
}

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
    if (id === 'theme') return
    const section = document.getElementById(id)
    if (section) observer?.observe(section)
  })

  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

function openTheme(): void {
  previousSection = activeSection.value
  activeSection.value = 'theme'
  isThemeOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeTheme(): void {
  isThemeOpen.value = false
  activeSection.value = previousSection
  document.body.style.overflow = ''
}

function handleNavigationClick(event: MouseEvent, id: string): void {
  if (id === 'theme') {
    event.preventDefault()
    openTheme()
    return
  }

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
      @click="handleNavigationClick($event, item.id)"
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
        v-else-if="item.icon === 'heart'"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
      <svg
        v-else-if="item.icon === 'theme'"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 3a9 9 0 1 0 0 18h1.2a1.8 1.8 0 0 0 0-3.6h-.7a1.5 1.5 0 0 1 0-3h2.1A6.4 6.4 0 0 0 21 8c0-2.8-4-5-9-5Z" />
        <circle cx="7.5" cy="9" r=".8" />
        <circle cx="10.5" cy="6.8" r=".8" />
        <circle cx="14.2" cy="7" r=".8" />
        <circle cx="17" cy="9.5" r=".8" />
      </svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.5a8 8 0 0 1-9 7.9L5 21l1.6-4.6A8 8 0 1 1 20 11.5Z" />
        <path d="M9 10h.01M12 10h.01M15 10h.01" />
      </svg>

      <span>{{ item.label }}</span>
    </a>
  </nav>

  <Teleport to="body">
    <div
      v-if="isThemeOpen"
      class="theme-modal"
      role="presentation"
      @click.self="closeTheme"
    >
      <section
        class="theme-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="theme-modal-title"
      >
        <button
          class="theme-modal__close"
          type="button"
          aria-label="Tutup tema pakaian"
          @click="closeTheme"
        >
          ×
        </button>

        <header class="theme-modal__header">
          <p class="theme-modal__eyebrow">Palet Pakaian</p>
        </header>

        <div class="theme-modal__group">
          <h3>Tetamu</h3>
          <p>Tetamu dialu-alukan hadir dengan busana bernuansa pastel.</p>
          <div
            class="theme-modal__pastel-palette"
            role="img"
            aria-label="Pilihan warna pastel: krim, pic, kuning lembut, hijau pudina, biru muda, lavender dan teal lembut"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div class="theme-modal__divider" aria-hidden="true"></div>

        <div class="theme-modal__group theme-modal__group--colour">
          <h3>Family Pihak Perempuan</h3>
          <span class="theme-modal__swatch" aria-hidden="true"></span>
          <p class="theme-modal__colour-name">Baby Blue</p>
        </div>
      </section>
    </div>
  </Teleport>
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

<style>
.theme-modal {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgb(55 30 39 / 58%);
  backdrop-filter: blur(0.55rem);
  -webkit-backdrop-filter: blur(0.55rem);
}

.theme-modal__card {
  position: relative;
  width: min(100%, 27rem);
  padding: 2.5rem 2rem 2.25rem;
  border: 1px solid rgb(182 44 81 / 32%);
  border-radius: 1.5rem;
  color: #493940;
  background: #fffaf7;
  box-shadow: 0 1.5rem 4rem rgb(45 19 28 / 28%);
  text-align: center;
}

.theme-modal__close {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  display: grid;
  width: 2.5rem;
  min-height: 2.5rem;
  place-items: center;
  padding: 0;
  border: 1px solid #b62c51;
  border-radius: 50%;
  color: #b62c51;
  background: transparent;
  cursor: pointer;
  font-size: 1.55rem;
  font-weight: 300;
  line-height: 1;
}

.theme-modal__header {
  padding-inline: 1.5rem;
}

.theme-modal__eyebrow {
  margin: 0 0 0.35rem;
  color: #b62c51;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.theme-modal__header h2 {
  margin: 0;
  color: #b62c51;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 7vw, 2.25rem);
  font-weight: 600;
}

.theme-modal__group {
  margin-top: 1.8rem;
}

.theme-modal__group h3 {
  margin: 0 0 0.55rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
}

.theme-modal__group p {
  margin: 0;
  color: #6d5b62;
  line-height: 1.7;
}

.theme-modal__pastel-palette {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  margin-top: 1rem;
}

.theme-modal__pastel-palette span {
  display: block;
  width: clamp(1.65rem, 7vw, 2rem);
  aspect-ratio: 1;
  flex: 0 0 auto;
  border: 0.14rem solid #fffaf7;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgb(73 57 64 / 12%);
}

.theme-modal__pastel-palette span:nth-child(1) { background: #f3e5c8; }
.theme-modal__pastel-palette span:nth-child(2) { background: #f6c7a5; }
.theme-modal__pastel-palette span:nth-child(3) { background: #f6e6a8; }
.theme-modal__pastel-palette span:nth-child(4) { background: #c7e6cf; }
.theme-modal__pastel-palette span:nth-child(5) { background: #b9daf2; }
.theme-modal__pastel-palette span:nth-child(6) { background: #d7c5eb; }
.theme-modal__pastel-palette span:nth-child(7) { background: #b9dedb; }

.theme-modal__divider {
  width: min(100%, 17rem);
  height: 1px;
  margin: 1.6rem auto 0;
  background: rgb(182 44 81 / 22%);
}

.theme-modal__group--colour {
  display: grid;
  justify-items: center;
}

.theme-modal__swatch {
  display: block;
  width: 5.75rem;
  aspect-ratio: 1;
  margin-block: 0.65rem 0.55rem;
  border: 0.28rem solid #fffaf7;
  border-radius: 50%;
  background: #acd8f5;
  box-shadow:
    0 0 0 2px #acd8f5,
    inset 0.35rem 0.2rem 0.6rem rgb(255 255 255 / 22%);
}

.theme-modal__group .theme-modal__colour-name {
  color: #493940;
  font-size: 0.9rem;
  font-weight: 600;
}

@media (max-width: 24rem) {
  .theme-modal__card {
    padding-inline: 1.4rem;
  }
}
</style>
