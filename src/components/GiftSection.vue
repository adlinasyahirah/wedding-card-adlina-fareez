<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { wedding } from '../data/wedding'

const copyStatus = ref<'idle' | 'copied' | 'error'>('idle')
let statusTimer: number | undefined

const hasGiftDetails = computed(() =>
  Boolean(
    wedding.gift.bankName ||
      wedding.gift.accountName ||
      wedding.gift.accountNumber ||
      wedding.gift.qrImage,
  ),
)

async function copyAccountNumber(): Promise<void> {
  if (!wedding.gift.accountNumber) return

  window.clearTimeout(statusTimer)

  try {
    await navigator.clipboard.writeText(wedding.gift.accountNumber)
    copyStatus.value = 'copied'
  } catch {
    copyStatus.value = 'error'
  }

  statusTimer = window.setTimeout(() => {
    copyStatus.value = 'idle'
  }, 2_500)
}

onBeforeUnmount(() => {
  window.clearTimeout(statusTimer)
})
</script>

<template>
  <section v-reveal class="gift-section" aria-labelledby="gift-heading">
    <div class="gift-section__container">
      <header class="gift-section__header">
        <p class="gift-section__eyebrow">Tanda Kasih</p>
        <h2 id="gift-heading" class="gift-section__title">Hadiah Perkahwinan</h2>
        <p class="gift-section__intro">
          Kehadiran dan doa restu anda merupakan hadiah yang paling bermakna buat kami.
        </p>
      </header>

      <div v-if="hasGiftDetails" class="gift-card">
        <div v-if="wedding.gift.qrImage" class="gift-card__qr-wrap">
          <img
            class="gift-card__qr"
            :src="wedding.gift.qrImage"
            alt="Kod QR hadiah perkahwinan"
            loading="lazy"
          />
          <p>Imbas untuk hadiah digital</p>
        </div>

        <div class="gift-card__details">
          <p class="gift-card__label">Pemindahan Bank</p>
          <h3 class="gift-card__bank">
            {{ wedding.gift.bankName || 'Maklumat bank' }}
          </h3>

          <dl class="gift-card__list">
            <div v-if="wedding.gift.accountName">
              <dt>Nama Pemegang Akaun</dt>
              <dd>{{ wedding.gift.accountName }}</dd>
            </div>
            <div v-if="wedding.gift.accountNumber">
              <dt>Nombor Akaun</dt>
              <dd class="gift-card__account">
                <span>{{ wedding.gift.accountNumber }}</span>
                <button type="button" @click="copyAccountNumber">
                  {{ copyStatus === 'copied' ? 'Disalin' : 'Salin' }}
                </button>
              </dd>
            </div>
          </dl>

          <p v-if="copyStatus === 'error'" class="gift-card__status" role="status">
            Tidak dapat menyalin. Sila salin nombor akaun secara manual.
          </p>
          <p v-else-if="copyStatus === 'copied'" class="gift-card__status" role="status">
            Nombor akaun telah disalin.
          </p>
        </div>
      </div>

      <div v-else class="gift-section__empty">
        <span aria-hidden="true">♡</span>
        <p>Doa dan kehadiran anda sudah cukup bermakna buat kami.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gift-section {
  position: relative;
  overflow: hidden;
  padding: 5rem var(--space-4);
  color: var(--color-cream-50);
  background:
    radial-gradient(circle at 85% 15%, rgb(216 195 165 / 14%), transparent 22rem),
    #3e372f;
}

.gift-section__container {
  width: min(100%, 56rem);
  margin-inline: auto;
}

.gift-section__header {
  max-width: 38rem;
  margin: 0 auto var(--space-12);
  text-align: center;
}

.gift-section__eyebrow {
  margin: 0 0 var(--space-3);
  color: var(--color-champagne);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.gift-section__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.35rem, 10vw, 3.9rem);
  font-weight: 400;
  line-height: 1.1;
}

.gift-section__intro {
  margin: var(--space-4) auto 0;
  color: rgb(253 251 247 / 72%);
  font-size: 0.95rem;
  line-height: 1.8;
}

.gift-card {
  display: grid;
  overflow: hidden;
  border: 1px solid rgb(216 195 165 / 38%);
  background: rgb(255 255 255 / 5%);
}

.gift-card__qr-wrap {
  display: grid;
  padding: var(--space-8);
  color: var(--color-text-muted);
  background: var(--color-champagne);
  text-align: center;
  place-content: center;
}

.gift-card__qr {
  width: min(100%, 14rem);
  aspect-ratio: 1;
  margin-inline: auto;
  padding: var(--space-3);
  object-fit: contain;
  background: var(--color-white);
}

.gift-card__qr-wrap p {
  margin: var(--space-4) 0 0;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.gift-card__details {
  align-self: center;
  padding: var(--space-8) var(--space-6);
}

.gift-card__label {
  margin: 0 0 var(--space-3);
  color: var(--color-champagne);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.gift-card__bank {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 9vw, 3rem);
  font-weight: 400;
  line-height: 1.15;
}

.gift-card__list {
  display: grid;
  gap: var(--space-6);
  margin: var(--space-8) 0 0;
}

.gift-card__list > div {
  padding-top: var(--space-4);
  border-top: 1px solid rgb(216 195 165 / 24%);
}

.gift-card__list dt {
  margin-bottom: var(--space-2);
  color: rgb(253 251 247 / 60%);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.gift-card__list dd {
  margin: 0;
  line-height: 1.6;
}

.gift-card__account {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  font-variant-numeric: tabular-nums;
}

.gift-card__account button {
  flex: none;
  padding: 0.55rem 1rem;
  border: 1px solid var(--color-champagne);
  border-radius: 999px;
  color: var(--color-champagne);
  background: transparent;
  cursor: pointer;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.gift-card__account button:focus-visible {
  outline: 2px solid var(--color-champagne);
  outline-offset: 3px;
}

.gift-card__status {
  margin: var(--space-4) 0 0;
  color: var(--color-champagne);
  font-size: 0.76rem;
}

.gift-section__empty {
  display: grid;
  min-height: 17rem;
  padding: var(--space-8);
  border: 1px solid rgb(216 195 165 / 32%);
  color: rgb(253 251 247 / 72%);
  text-align: center;
  place-content: center;
}

.gift-section__empty span {
  color: var(--color-champagne);
  font-family: var(--font-display);
  font-size: 3.5rem;
  line-height: 1;
}

.gift-section__empty p {
  max-width: 25rem;
  margin: var(--space-4) auto 0;
  font-style: italic;
  line-height: 1.75;
}

@media (min-width: 48rem) {
  .gift-section {
    padding-block: 7rem;
  }

  .gift-card:has(.gift-card__qr-wrap) {
    grid-template-columns: minmax(18rem, 0.85fr) minmax(0, 1.15fr);
  }

  .gift-card__details {
    padding: var(--space-12);
  }
}
</style>
