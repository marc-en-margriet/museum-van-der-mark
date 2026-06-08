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
        <p class="progress-label">{{ visitedCount }} van {{ totalCount }} items ontdekt</p>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: (visitedCount / totalCount * 100) + '%' }"/>
        </div>
      </div>

      <div class="card-list">
        <RouterLink v-for="item in visitedItems" :key="item.id"
                    :to="`/x/${item.id}`" class="mini-card">
          <p class="mini-period">{{ item.period }}</p>
          <p class="mini-translation">{{ item.translation }}</p>
          <p class="mini-name">{{ item.name }}</p>
        </RouterLink>
      </div>
    </section>

    <footer>
      <p>&copy; 2026 Museum Van der Mark</p>
    </footer>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useVisitedItems } from '../composables/useVisitedItems'

const { visitedItems, visitedCount, totalCount } = useVisitedItems()
</script>

<style scoped>
header {
  padding: 1.5rem 3rem;
  border-bottom: 1px solid #e0ddd8;
  display: flex;
  justify-content: center;
}

.logo {
  height: 120px;
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

.progress-label {
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-bottom: 0.6rem;
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
  gap: 0.5rem;
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
