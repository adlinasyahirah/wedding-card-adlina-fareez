<script setup lang="ts">
import { computed } from 'vue'
import type { Person } from '../types/wedding'

interface Props {
  person: Person
  role: string
}

const props = defineProps<Props>()

const initial = computed(() => props.person.name.trim().charAt(0).toUpperCase())
</script>

<template>
  <article class="couple-profile">
    <div class="couple-profile__portrait">
      <img
        v-if="person.photo"
        class="couple-profile__image"
        :src="person.photo"
        :alt="`Potret ${person.name}`"
      />
      <span v-else class="couple-profile__monogram" aria-hidden="true">
        {{ initial }}
      </span>
    </div>

    <p class="couple-profile__role">{{ role }}</p>
    <h3 class="couple-profile__name">{{ person.fullName || person.name }}</h3>
    <p v-if="person.description" class="couple-profile__description">
      {{ person.description }}
    </p>
  </article>
</template>

<style scoped>
.couple-profile {
  text-align: center;
}

.couple-profile__portrait {
  position: relative;
  display: grid;
  width: min(74vw, 17rem);
  aspect-ratio: 4 / 5;
  margin-inline: auto;
  overflow: hidden;
  border: 1px solid rgb(189 63 112 / 45%);
  border-radius: 9rem 9rem 1rem 1rem;
  background:
    radial-gradient(circle at 50% 32%, rgb(255 255 255 / 90%), transparent 36%),
    linear-gradient(150deg, var(--color-cream-100), #f2dce6);
  box-shadow: 0 1.25rem 3rem rgb(70 62 53 / 10%);
  place-items: center;
}

.couple-profile__portrait::after {
  position: absolute;
  inset: 0.5rem;
  border: 1px solid rgb(255 255 255 / 62%);
  border-radius: inherit;
  content: '';
  pointer-events: none;
}

.couple-profile__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.couple-profile__monogram {
  color: var(--color-gold);
  font-family: var(--font-display);
  font-size: clamp(5rem, 24vw, 8rem);
  font-style: italic;
  line-height: 1;
  opacity: 0.78;
}

.couple-profile__role {
  margin: var(--space-8) 0 var(--space-2);
  color: var(--color-gold);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.couple-profile__name {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 9vw, 3rem);
  font-weight: 400;
  line-height: 1.1;
}

.couple-profile__description {
  max-width: 24rem;
  margin: var(--space-4) auto 0;
  color: var(--color-text-muted);
  line-height: 1.75;
}
</style>
