<template>
  <main>
    <header>
      <img src="/logo.png" alt="Museum Van der Mark" class="logo" />
    </header>

    <section class="empty" v-if="visitedCount === 0">
      <p>Welkom in het Museum Van der Mark. Een antropologische studie naar de leefwijze van Homo sapiens. Samengesteld door M&amp;M Erfgoedonderzoek</p>
    </section>

    <section class="visited" v-if="visitedCount > 0">
      <div class="progress-block">
        <div class="progress-header">
          <p class="progress-label">{{ visitedCount }} van {{ totalCount }} items ontdekt</p>
          <button class="reset-btn" @click="handleReset" title="Opnieuw beginnen">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
          </button>
        </div>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: (visitedCount / totalCount * 100) + '%' }"/>
        </div>
      </div>

      <div class="card-list">
        <RouterLink v-for="item in visitedItems" :key="item.id"
                    :to="`/x/${item.id}`" class="mini-card">
          <p class="mini-period">Periode: {{ item.period }}</p>
          <p class="mini-translation">{{ item.translation }}</p>
          <p class="mini-name">{{ item.name }}</p>
        </RouterLink>
      </div>
    </section>

    <footer>
      <p>&copy; 12-06-2026 Museum Van der Mark</p>
    </footer>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useVisitedItems } from '../composables/useVisitedItems'

const { visitedItems, visitedCount, totalCount, resetProgress } = useVisitedItems()

function handleReset() {
  if (confirm('Weet je zeker dat je opnieuw wil beginnen? Je voortgang gaat verloren.')) {
    resetProgress()
  }
}
</script>

<style scoped>
header {
  padding: 1.5rem 3rem;
  border-bottom: 1px solid #e0ddd8;
  display: flex;
  justify-content: center;
}

.logo {
  height: 150px;
  width: auto;
}

footer {
  padding: 2rem 3rem;
  border-top: 1px solid #e0ddd8;
  font-size: 0.8rem;
  opacity: 0.4;
  text-align: center;
}

.empty {
  padding: 4rem 3rem;
  text-align: center;
  font-size: 1.125rem;
  line-height: 1.7;
  opacity: 0.6;
  max-width: 560px;
  margin: 0 auto;
}

.visited {
  padding: 1.5rem 2rem 1rem;
}

.progress-block {
  margin-bottom: 2rem;
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}

.reset-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #3E4A3A;
  opacity: 0.45;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}

.reset-btn:hover {
  opacity: 0.8;
}

.reset-btn svg {
  width: 1.1rem;
  height: 1.1rem;
}

.progress-label {
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.55;
}

.progress-track {
  height: 3px;
  background: #D1C6AC;
  border-radius: 2px;
}

.progress-fill {
  height: 100%;
  background: #3E4A3A;
  border-radius: 2px;
  transition: width 0.4s ease;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mini-card {
  padding: 1.25rem;
  background: #3E4A3A;
  border-radius: 4px;
  text-decoration: none;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: opacity 0.2s;
}

.mini-card:hover {
  opacity: 0.85;
}

.mini-period {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.mini-translation {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #ffffff;
  overflow-wrap: break-word;
  hyphens: auto;
}

.mini-name {
  font-size: 0.75rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-top: auto;
}
</style>
