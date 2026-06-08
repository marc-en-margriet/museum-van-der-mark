import { ref, computed } from 'vue'
import data from '../data/data.json'

const STORAGE_KEY = 'museum-visited-items'

function loadFromStorage() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') }
  catch { return [] }
}

const visitedIds = ref(loadFromStorage())

export function useVisitedItems() {
  function markVisited(id) {
    if (!visitedIds.value.includes(id)) {
      visitedIds.value = [...visitedIds.value, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visitedIds.value))
    }
  }

  const visitedItems = computed(() => data.filter(i => visitedIds.value.includes(i.id)))
  const visitedCount = computed(() => visitedIds.value.length)
  const totalCount = data.length

  function resetProgress() {
    visitedIds.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  return { visitedItems, visitedCount, totalCount, markVisited, resetProgress }
}
