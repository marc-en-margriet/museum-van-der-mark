import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './views/HomePage.vue'
import ItemPage from './views/ItemPage.vue'
import NotFoundPage from './views/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/x/:id', component: ItemPage },
    { path: '/404', component: NotFoundPage },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
  ],
})

createApp(App).use(router).mount('#app')
