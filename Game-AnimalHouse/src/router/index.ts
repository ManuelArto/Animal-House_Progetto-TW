import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import { state } from '@/store'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/my_pets',
      name: 'my_pets',
      component: () => import('@/views/MyPetsView.vue')
    },
    {
      path: '/curiosita',
      name: 'curiosita',
      component: () => import('@/views/CuriositaView.vue')
    },
    {
      path: '/informazioni',
      name: 'informazioni',
      component: () => import('@/views/InformazioniView.vue')
    },
    {
      path: '/videos',
      name: 'videos',
      component: () => import('@/views/VideosView.vue')
    },
    {
      path: '/servizi',
      name: 'servizi',
      component: () => import('@/views/ServiziView.vue')
    },
    {
      path: '/negozio',
      name: 'negozio',
      component: () => import('@/views/ProdottiView.vue')
    },
    {
      path: '/games/quiz',
      name: 'quiz',
      component: () => import('@/views/games/QuizView.vue')
    },
  ]
})

router.beforeEach((to, from) => {
  window.scroll(0,0);
  state.isCollapseVisible = false
  return true
})

export default router
