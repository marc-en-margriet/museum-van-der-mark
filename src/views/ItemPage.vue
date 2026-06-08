<template>
  <div class="item-page">
    <div v-if="item" class="item-content">
      <p class="item-period">{{ item.period }}</p>
      <h1 class="item-translation">{{ item.translation }}</h1>
      <p class="item-name">{{ item.name }}</p>
      <p class="item-description">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import data from '../data/data.json'

const route = useRoute()
const router = useRouter()

const item = computed(() => {
  const found = data.find(i => i.id === route.params.id)
  if (!found) {
    router.replace('/404')
  }
  return found
})
</script>

<style scoped>
.item-page {
  max-width: 640px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.item-period {
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 1rem;
}

.item-translation {
  font-size: 2rem;
  font-weight: normal;
  line-height: 1.3;
  margin-bottom: 1.5rem;
}

.item-name {
  font-size: 1rem;
  color: #555;
  font-style: italic;
}

.item-description {
  margin-top: 2rem;
  font-size: 1rem;
  line-height: 1.8;
  color: #333;
}
</style>
