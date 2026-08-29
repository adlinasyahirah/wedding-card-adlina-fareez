<script setup lang="ts">
import { ref } from 'vue'
import { wedding } from '../data/wedding'
import floralRight from '../assets/images/opening-floral-right.webp'

const expandedContact = ref('')

function phoneHref(phone: string): string {
  const normalizedPhone = phone.replace(/[^\d+]/g, '')
  return normalizedPhone ? `tel:${normalizedPhone}` : ''
}

function toggleContact(phone: string): void {
  expandedContact.value = expandedContact.value === phone ? '' : phone
}
</script>

<template>
  <section id="contact" v-reveal class="contact-section" aria-labelledby="contact-heading">
    <img
      class="contact-section__watermark"
      :src="floralRight"
      alt=""
      aria-hidden="true"
    >
    <div class="contact-section__container">
      <header class="contact-section__header">
        <p id="contact-heading" class="contact-section__eyebrow">Hubungi</p>
        <p class="contact-section__intro">
            Sebarang pertanyaan berkaitan majlis, hubungi
        </p>
      </header>

      <div class="contact-section__grid">
        <article
          v-for="contact in wedding.contacts"
          :key="contact.phone"
          class="contact-card"
        >
          <button
            class="contact-card__summary"
            type="button"
            :aria-expanded="expandedContact === contact.phone"
            @click="toggleContact(contact.phone)"
          >
            <span class="contact-card__identity">
              <h3 class="contact-card__name">{{ contact.name }}</h3>
              <p class="contact-card__role">{{ contact.role }}</p>
            </span>
            <span class="contact-card__indicator" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7.1 3.5 9.5 8l-2.1 1.7a15.2 15.2 0 0 0 6.9 6.9l1.7-2.1 4.5 2.4-1.1 3a2 2 0 0 1-2.2 1.3C9.8 20 4 14.2 2.8 6.8a2 2 0 0 1 1.3-2.2z" />
              </svg>
            </span>
          </button>

          <div v-if="expandedContact === contact.phone" class="contact-card__details">
            <p v-if="contact.phone" class="contact-card__phone">{{ contact.phone }}</p>
            <p v-else class="contact-card__empty">Nombor telefon akan dikemas kini.</p>

            <div v-if="phoneHref(contact.phone) || contact.whatsappUrl" class="contact-card__actions">
              <a
                v-if="phoneHref(contact.phone)"
                class="contact-card__button"
                :href="phoneHref(contact.phone)"
                :aria-label="`Telefon ${contact.name}`"
                title="Telefon"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.1 3.5 9.5 8l-2.1 1.7a15.2 15.2 0 0 0 6.9 6.9l1.7-2.1 4.5 2.4-1.1 3a2 2 0 0 1-2.2 1.3C9.8 20 4 14.2 2.8 6.8a2 2 0 0 1 1.3-2.2z" />
                </svg>
              </a>
              <a
                v-if="contact.whatsappUrl"
                class="contact-card__button contact-card__button--primary"
                :href="contact.whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`WhatsApp ${contact.name}`"
                title="WhatsApp"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.4L3 20.3l1.3-4.6a8.5 8.5 0 1 1 16.2-4.1Z" />
                  <path d="M8.2 7.6c.4 3.7 2.5 5.8 6.2 6.2l1.3-1.4 2.2 1.1c-.4 1.7-1.5 2.6-3.2 2.5-4.4-.3-7.8-3.7-8.1-8.1-.1-1.7.8-2.8 2.5-3.2l1.1 2.2z" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 3rem var(--space-4) calc(8rem + env(safe-area-inset-bottom));
  color: #493940;
  background: #fad9df;
}

.contact-section__watermark {
  position: absolute;
  z-index: 0;
  right: -8rem;
  bottom: -8rem;
  width: clamp(17rem, 62vw, 31rem);
  height: auto;
  pointer-events: none;
}

.contact-section__container {
  position: relative;
  z-index: 1;
  width: min(100%, 64rem);
  margin-inline: auto;
}

.contact-section__header {
  max-width: 36rem;
  margin: 0 auto var(--space-6);
  text-align: center;
}

.contact-section__eyebrow {
  margin: 0 0 var(--space-3);
  color: #b62c51;
  font-size: 1.81rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

@media (max-width: 30rem) {
  .contact-section__eyebrow {
    font-size: clamp(1.1rem, 5.2vw, 1.35rem);
    letter-spacing: 0.18em;
  }
}

.contact-section__intro {
  margin: var(--space-2) auto 0;
  color: #493940;
  font-size: 0.95rem;
  line-height: 1.8;
}

.contact-section__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--space-6);
  row-gap: var(--space-2);
  align-items: start;
}

.contact-card {
  min-width: 0;
  border-bottom: 1px solid rgb(182 44 81 / 34%);
  color: #493940;
}

.contact-card__summary {
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: var(--space-2);
  padding: 0.85rem 0;
  border: 0;
  color: inherit;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.contact-card__identity {
  min-width: 0;
  flex: 1;
}

.contact-card__name,
.contact-card__role,
.contact-card__phone,
.contact-card__empty {
  margin: 0;
}

.contact-card__name {
  color: #b62c51;
  font-family: var(--font-display);
  overflow: hidden;
  font-size: clamp(0.88rem, 3.8vw, 1.1rem);
  letter-spacing: 0.04em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.contact-card__role {
  margin-top: 0.2rem;
  color: #493940;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-card__indicator {
  display: grid;
  width: 1.8rem;
  aspect-ratio: 1;
  place-items: center;
  flex: 0 0 auto;
  color: #b62c51;
  border: 1px solid rgb(182 44 81 / 42%);
  border-radius: 50%;
}

.contact-card__indicator svg {
  width: 0.86rem;
  height: 0.86rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.contact-card__summary[aria-expanded='true'] .contact-card__indicator {
  color: #fad9df;
  background: #b62c51;
}

.contact-card__summary:focus-visible {
  outline: 0;
  box-shadow: inset 0 0 0 1px #b62c51;
}

.contact-card__details {
  padding: 0 0 var(--space-3);
}

.contact-card__phone,
.contact-card__empty {
  color: #493940;
  font-size: clamp(0.68rem, 2.8vw, 0.82rem);
  font-variant-numeric: tabular-nums;
  text-align: left;
}

.contact-card__empty {
  font-style: italic;
}

.contact-card__actions {
  display: flex;
  justify-content: flex-start;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.contact-card__button {
  display: inline-flex;
  width: 2.25rem;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: 1px solid #b62c51;
  border-radius: 999px;
  color: #fad9df;
  background: #b62c51;
  text-decoration: none;
}

.contact-card__button svg {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.contact-card__button--primary {
  color: #b62c51;
  border-color: #b62c51;
  background: transparent;
}

.contact-card__button:focus-visible {
  outline: 2px solid #b62c51;
  outline-offset: 3px;
}

@media (min-width: 48rem) {
  .contact-section {
    padding-top: 4rem;
    padding-bottom: calc(7.5rem + env(safe-area-inset-bottom));
  }

  .contact-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-4);
  }
}

@media (min-width: 64rem) {
  .contact-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
