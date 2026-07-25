<script setup lang="ts">
import { computed } from 'vue'
import type { WeddingContact } from '../types/wedding'

interface Props {
  contact: WeddingContact
}

const props = defineProps<Props>()

const phoneHref = computed(() => {
  const normalizedPhone = props.contact.phone.replace(/[^\d+]/g, '')
  return normalizedPhone ? `tel:${normalizedPhone}` : ''
})

</script>

<template>
  <article class="contact-card">
    <div class="contact-card__monogram">{{ contact.name }}</div>
    <p class="contact-card__role">{{ contact.role }}</p>

    <p v-if="contact.phone" class="contact-card__phone">{{ contact.phone }}</p>
    <p v-else class="contact-card__empty">Nombor telefon akan dikemas kini.</p>

    <div v-if="phoneHref || contact.whatsappUrl" class="contact-card__actions">
      <a v-if="phoneHref" class="contact-card__button" :href="phoneHref">
        Call
      </a>
      <a
        v-if="contact.whatsappUrl"
        class="contact-card__button contact-card__button--primary"
        :href="contact.whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </div>
  </article>
</template>

<style scoped>
.contact-card {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: var(--space-8) var(--space-6);
  border: 1px solid rgb(189 63 112 / 30%);
  border-radius: 0.35rem;
  background: rgb(255 255 255 / 48%);
  box-shadow: 0 0.75rem 2rem rgb(127 41 77 / 6%);
  text-align: center;
}

.contact-card__monogram {
  width: fit-content;
  margin: 0 auto var(--space-6);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid rgb(189 63 112 / 45%);
  color: var(--color-gold);
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.contact-card__role {
  margin: 0 0 var(--space-2);
  color: var(--color-gold);
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.contact-card__phone,
.contact-card__empty {
  margin: var(--space-3) 0 0;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
}

.contact-card__empty {
  font-style: italic;
}

.contact-card__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: auto;
  padding-top: var(--space-6);
}

.contact-card__button {
  display: inline-flex;
  min-width: 7.5rem;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.2rem;
  border: 1px solid var(--color-gold);
  border-radius: 999px;
  color: var(--color-gold);
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-decoration: none;
  text-transform: uppercase;
}

.contact-card__button--primary {
  color: var(--color-white);
  background: var(--color-gold);
}

.contact-card__button:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

@media (min-width: 64rem) {
  .contact-card {
    padding-inline: var(--space-4);
  }

  .contact-card__button {
    width: 100%;
  }
}
</style>
