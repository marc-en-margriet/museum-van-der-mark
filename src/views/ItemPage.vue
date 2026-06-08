<template>
  <div class="scene" v-if="item" @click="flip">
    <div class="card" :class="{ flipped }">

      <div class="card-face card-front">
        <p class="period">{{ item.period }}</p>
        <div class="card-main">
          <h1 class="translation" lang="nl">{{ item.translation }}</h1>
          <p class="name">{{ item.name }}</p>
        </div>
        <button class="play-btn" @click.stop="flip" aria-label="Afspelen">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>

      <div class="card-face card-back">
        <audio ref="audioEl" :src="`/audio/${item.id}.mp3`" @canplay="onCanPlay" @ended="onEnded" />

        <div class="player" @click.stop>
          <button class="play-btn-sm" @click="togglePlay" :aria-label="playing ? 'Pauzeren' : 'Afspelen'">
            <svg v-if="playing" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <div class="progress-bar" @click="seek">
            <div class="progress-fill" :style="{ width: progress + '%' }" />
          </div>
          <span class="time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
        </div>

        <p class="description" lang="nl">{{ item.description }}</p>

        <button class="back-btn" @click.stop="flip" aria-label="Terug">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import data from '../data/data.json'

const route = useRoute()
const router = useRouter()

const item = computed(() => {
  const found = data.find(i => i.id === route.params.id)
  if (!found) router.replace('/404')
  return found
})

const flipped = ref(false)
const audioEl = ref(null)
const playing = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = computed(() => duration.value ? (currentTime.value / duration.value) * 100 : 0)

function flip() {
  flipped.value = !flipped.value
  if (flipped.value) {
    playTimeout = setTimeout(() => {
      if (audioEl.value) audioEl.value.play().then(() => { playing.value = true })
    }, 1000)
  } else {
    clearTimeout(playTimeout)
    if (audioEl.value) {
      audioEl.value.pause()
      audioEl.value.currentTime = 0
      playing.value = false
    }
  }
}

function onCanPlay() {
  duration.value = audioEl.value.duration
}

function onEnded() {
  playing.value = false
}

function togglePlay() {
  if (!audioEl.value) return
  if (playing.value) {
    audioEl.value.pause()
    playing.value = false
  } else {
    audioEl.value.play()
    playing.value = true
  }
}

function seek(e) {
  if (!audioEl.value) return
  const rect = e.currentTarget.getBoundingClientRect()
  audioEl.value.currentTime = ((e.clientX - rect.left) / rect.width) * duration.value
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

let rafId
function tick() {
  if (audioEl.value) {
    currentTime.value = audioEl.value.currentTime
    duration.value = audioEl.value.duration || 0
  }
  rafId = requestAnimationFrame(tick)
}
rafId = requestAnimationFrame(tick)

let playTimeout = null
onUnmounted(() => {
  cancelAnimationFrame(rafId)
  clearTimeout(playTimeout)
})

watch(() => route.params.id, () => {
  flipped.value = false
  playing.value = false
  currentTime.value = 0
  duration.value = 0
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
})
</script>

<style scoped>
.scene {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100dvh;
  padding: 2rem;
  cursor: pointer;
  perspective: 1200px;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border: 1px solid #d6d0c8;
  border-radius: 4px;
  background: #faf9f7;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem;
  overflow: hidden;
}

.card-back {
  transform: rotateY(180deg);
  cursor: default;
}

/* Front */
.period {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #999;
}

.card-main {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  overflow: hidden;
}

.translation {
  font-size: 1.75rem;
  font-weight: normal;
  line-height: 1.35;
  color: #1a1a1a;
  overflow-wrap: break-word;
  hyphens: auto;
  text-wrap: pretty;
}

.name {
  font-size: 0.95rem;
  font-style: italic;
  color: #777;
}

.play-btn {
  align-self: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: none;
  background: #1a1a1a;
  color: #faf9f7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.play-btn:hover {
  background: #333;
}

.back-btn {
  align-self: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: none;
  background: #1a1a1a;
  color: #faf9f7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;
}

.back-btn:hover {
  background: #333;
}

/* Back */
.player {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: #f0ede8;
  border-radius: 4px;
  margin-bottom: 1.75rem;
  cursor: default;
}

.play-btn-sm {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background: #1a1a1a;
  color: #faf9f7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.play-btn-sm:hover {
  background: #333;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: #ccc;
  border-radius: 2px;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background: #1a1a1a;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.time {
  flex-shrink: 0;
  font-size: 0.75rem;
  color: #666;
  font-variant-numeric: tabular-nums;
}

.description {
  font-size: 0.95rem;
  line-height: 1.85;
  color: #333;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  overflow-wrap: break-word;
  hyphens: auto;
  text-wrap: pretty;
}
</style>
