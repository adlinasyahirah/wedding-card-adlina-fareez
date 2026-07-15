<script setup lang="ts">
import { wedding } from '../data/wedding'
import ContactCard from './ContactCard.vue'
</script>

<template>
  <section id="contact" v-reveal class="contact-section" aria-labelledby="contact-heading">
    <div class="contact-section__container">
      <header class="contact-section__header">
        <p class="contact-section__eyebrow">Hubungi Kami</p>
        <h2 id="contact-heading" class="contact-section__title">Ada Pertanyaan?</h2>
        <p class="contact-section__intro">
          Hubungi wakil keluarga kami sekiranya anda memerlukan bantuan mengenai majlis.
        </p>
      </header>

      <div class="contact-section__grid">
        <ContactCard :contact="wedding.contacts.bride" />
        <ContactCard :contact="wedding.contacts.groom" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 5rem var(--space-4) 7rem;
  color: var(--color-text);
  background:
    radial-gradient(circle at 50% 100%, rgb(216 195 165 / 30%), transparent 28rem),
    var(--color-cream-50);
}

.contact-section__container {
  width: min(100%, 52rem);
  margin-inline: auto;
}

.contact-section__header {
  max-width: 36rem;
  margin: 0 auto var(--space-12);
  text-align: center;
}

.contact-section__eyebrow {
  margin: 0 0 var(--space-3);
  color: var(--color-gold);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.contact-section__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 11vw, 4rem);
  font-weight: 400;
  line-height: 1.1;
}

.contact-section__intro {
  margin: var(--space-4) auto 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.8;
}

.contact-section__grid {
  display: grid;
  gap: var(--space-4);
}

@media (min-width: 48rem) {
  .contact-section {
    padding-block: 7rem 9rem;
  }

  .contact-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-6);
  }
}
</style>
