import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/UserView.vue'), // Simplifies setting up the stores for this project, should be resolved properly
    },
  ],
})

export default router
