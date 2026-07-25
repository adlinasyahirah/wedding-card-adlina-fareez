<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { supabase } from '../lib/supabase'

interface GuestMessage {
  id: string | number
  name: string
  message: string
  submittedAt: string
}

interface GuestWishRow {
  id: string | number
  guest_name: string
  wishes: string
  created_at: string
}

const name = ref('')
const message = ref('')
const messages = ref<GuestMessage[]>([])
const hasSubmitted = ref(false)
const isLoading = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref('')

const canSubmit = computed(
  () => Boolean(name.value.trim() && message.value.trim()) && !isSubmitting.value,
)

function formatSubmittedAt(date: string): string {
  return new Intl.DateTimeFormat('ms-MY', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

async function loadMessages(): Promise<void> {
  isLoading.value = true
  errorMessage.value = ''

  const { data, error } = await supabase
    .from('guest_wishes')
    .select('id, guest_name, wishes, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    errorMessage.value = 'Ucapan tidak dapat dimuatkan. Sila cuba lagi sebentar.'
    console.error('Failed to load guest wishes:', error)
  } else {
    messages.value = (data as GuestWishRow[]).map((wish) => ({
      id: wish.id,
      name: wish.guest_name,
      message: wish.wishes,
      submittedAt: formatSubmittedAt(wish.created_at),
    }))
  }

  isLoading.value = false
}

onMounted(loadMessages)

async function submitMessage(): Promise<void> {
  if (!canSubmit.value) return

  isSubmitting.value = true
  hasSubmitted.value = false
  errorMessage.value = ''

  const { error } = await supabase.from('guest_wishes').insert({
    guest_name: name.value.trim(),
    wishes: message.value.trim(),
  })

  if (error) {
    errorMessage.value = 'Ucapan tidak dapat dihantar. Sila cuba lagi.'
    console.error('Failed to submit guest wish:', error)
    isSubmitting.value = false
    return
  }

  name.value = ''
  message.value = ''
  hasSubmitted.value = true
  isSubmitting.value = false
  await loadMessages()
}
</script>

<template>
  <section
    id="guestbook"
    v-reveal
    class="guestbook-section"
    aria-labelledby="guestbook-heading"
  >
    <div class="guestbook-section__container">
      <header class="guestbook-section__header">
        <p class="guestbook-section__eyebrow">Ucapan</p>
        <h2 id="guestbook-heading" class="guestbook-section__title">
          Titipkan Ucapan
        </h2>
        <p class="guestbook-section__intro">
          Kehadiran dan doa restu anda merupakan hadiah yang paling bermakna buat kami.
        </p>
      </header>

      <div class="guestbook-section__layout">
        <form class="guestbook-form" @submit.prevent="submitMessage">
          <div class="guestbook-form__field">
            <label for="guest-name">Nama</label>
            <input
              id="guest-name"
              v-model="name"
              type="text"
              name="name"
              maxlength="80"
              autocomplete="name"
              placeholder="Nama"
              required
            />
          </div>

          <div class="guestbook-form__field">
            <label for="guest-message">Ucapan</label>
            <textarea
              id="guest-message"
              v-model="message"
              name="message"
              rows="5"
              maxlength="500"
              placeholder="Tuliskan doa dan ucapan anda..."
              required
            ></textarea>
            <span class="guestbook-form__count">{{ message.length }}/500</span>
          </div>

          <button class="guestbook-form__button" type="submit" :disabled="!canSubmit">
            {{ isSubmitting ? 'Menghantar...' : 'Hantar Ucapan' }}
          </button>

          <p v-if="hasSubmitted" class="guestbook-form__status" role="status">
            Terima kasih. Ucapan anda telah dihantar.
          </p>

          <p v-if="errorMessage" class="guestbook-form__error" role="alert">
            {{ errorMessage }}
          </p>
        </form>

        <div class="guestbook-messages" aria-live="polite">
          <h3>Ucapan Tetamu</h3>

          <p v-if="isLoading" class="guestbook-messages__empty">
            Memuatkan ucapan...
          </p>

          <div v-else-if="messages.length" class="guestbook-messages__list">
            <article
              v-for="guestMessage in messages"
              :key="guestMessage.id"
              class="guest-message"
            >
              <p class="guest-message__text">“{{ guestMessage.message }}”</p>
              <footer>
                <strong>{{ guestMessage.name }}</strong>
                <time>{{ guestMessage.submittedAt }}</time>
              </footer>
            </article>
          </div>

          <p v-else class="guestbook-messages__empty">
            Tiada ucapan buat masa ini. Kami menantikan doa dan ucapan daripada anda.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.guestbook-section {
  padding: 5rem var(--space-4);
  color: var(--color-text);
  background:
    radial-gradient(circle at 85% 15%, rgb(235 186 208 / 24%), transparent 24rem),
    var(--color-cream-100);
}

.guestbook-section__container {
  width: min(100%, 68rem);
  margin-inline: auto;
}

.guestbook-section__header {
  max-width: 40rem;
  margin: 0 auto var(--space-12);
  text-align: center;
}

.guestbook-section__eyebrow {
  margin: 0 0 var(--space-3);
  color: var(--color-primary);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.guestbook-section__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 8vw, 2.8rem);
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.1;
  text-transform: uppercase;
}

.guestbook-section__intro {
  margin: var(--space-4) auto 0;
  color: var(--color-text-muted);
  line-height: 1.8;
}

.guestbook-section__layout {
  display: grid;
  gap: var(--space-8);
}

.guestbook-form,
.guestbook-messages {
  padding: var(--space-8) var(--space-6);
  border: 1px solid rgb(189 63 112 / 26%);
  border-radius: 0.35rem;
  background: rgb(255 255 255 / 58%);
}

.guestbook-form {
  display: grid;
  gap: var(--space-6);
  align-self: start;
}

.guestbook-form__field {
  display: grid;
  gap: var(--space-2);
}

.guestbook-form__field label {
  color: var(--color-primary);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.guestbook-form__field input,
.guestbook-form__field textarea {
  width: 100%;
  border: 0;
  border-bottom: 1px solid rgb(189 63 112 / 35%);
  border-radius: 0;
  outline: 0;
  color: var(--color-text);
  background: transparent;
}

.guestbook-form__field input {
  min-height: 3rem;
  padding: 0.7rem 0;
}

.guestbook-form__field textarea {
  padding: 0.8rem 0;
  resize: vertical;
  line-height: 1.6;
}

.guestbook-form__field input:focus,
.guestbook-form__field textarea:focus {
  border-color: var(--color-primary);
}

.guestbook-form__count {
  color: var(--color-text-muted);
  font-size: 0.68rem;
  text-align: right;
}

.guestbook-form__button {
  width: fit-content;
  min-height: 2.75rem;
  padding: 0.7rem 1.4rem;
  border: 1px solid var(--color-primary);
  border-radius: 999px;
  color: var(--color-white);
  background: var(--color-primary);
  cursor: pointer;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.guestbook-form__button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.guestbook-form__button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

.guestbook-form__status {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.8rem;
}

.guestbook-form__error {
  margin: 0;
  color: #a12626;
  font-size: 0.8rem;
}

.guestbook-messages h3 {
  margin: 0 0 var(--space-6);
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 400;
}

.guestbook-messages__list {
  display: grid;
  max-height: 30rem;
  gap: var(--space-4);
  overflow-y: auto;
  padding-right: var(--space-2);
}

.guest-message {
  padding: var(--space-4);
  border-left: 2px solid var(--color-primary);
  background: var(--color-cream-50);
}

.guest-message__text {
  margin: 0;
  line-height: 1.7;
  overflow-wrap: anywhere;
}

.guest-message footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
  margin-top: var(--space-4);
  color: var(--color-text-muted);
  font-size: 0.72rem;
}

.guest-message strong {
  color: var(--color-primary);
}

.guestbook-messages__empty {
  margin: 0;
  color: var(--color-text-muted);
  font-style: italic;
  line-height: 1.7;
}

@media (min-width: 48rem) {
  .guestbook-section {
    padding-block: 7rem;
  }

  .guestbook-section__layout {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  }

  .guestbook-form,
  .guestbook-messages {
    padding: var(--space-12);
  }
}
</style>
