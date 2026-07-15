<script setup lang="ts">
import { computed } from 'vue'
import type { Parents } from '../types/wedding'

interface Props {
  familyLabel: string
  parents: Parents
}

const props = defineProps<Props>()

const hasParents = computed(() =>
  Boolean(props.parents.father.trim() || props.parents.mother.trim()),
)
</script>

<template>
  <article class="parents-card">
    <div class="parents-card__ornament" aria-hidden="true">✦</div>
    <p class="parents-card__family">{{ familyLabel }}</p>

    <div v-if="hasParents" class="parents-card__names">
      <p v-if="parents.father">{{ parents.father }}</p>
      <span v-if="parents.father && parents.mother" aria-label="dan">&amp;</span>
      <p v-if="parents.mother">{{ parents.mother }}</p>
    </div>

    <p v-else class="parents-card__placeholder">
      Maklumat keluarga akan dikemas kini.
    </p>
  </article>
</template>

<style scoped>
.parents-card {
  position: relative;
  padding: var(--space-12) var(--space-6);
  border: 1px solid rgb(168 134 82 / 28%);
  background: rgb(255 255 255 / 48%);
  text-align: center;
}

.parents-card::before,
.parents-card::after {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-color: var(--color-gold);
  content: '';
  opacity: 0.45;
}

.parents-card::before {
  top: 0.6rem;
  left: 0.6rem;
  border-top: 1px solid;
  border-left: 1px solid;
}

.parents-card::after {
  right: 0.6rem;
  bottom: 0.6rem;
  border-right: 1px solid;
  border-bottom: 1px solid;
}

.parents-card__ornament {
  margin-bottom: var(--space-4);
  color: var(--color-gold);
  font-size: 0.75rem;
}

.parents-card__family {
  margin: 0 0 var(--space-6);
  color: var(--color-gold);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.parents-card__names {
  display: grid;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 6vw, 1.8rem);
  line-height: 1.3;
}

.parents-card__names p {
  margin: 0;
}

.parents-card__names span {
  color: var(--color-gold);
  font-size: 0.82em;
  font-style: italic;
}

.parents-card__placeholder {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-style: italic;
}
</style>
