import { createRouter, createWebHistory } from 'vue-router'
import FileTD from '../views/FileTD.vue'
import Home from '../views/Home.vue'
import ChartRoom from '../views/ChatRoom.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      component: Home
    },
    {
      path: '/filetd',
      component: FileTD
    },
    {
      path: '/chat',
      component: ChartRoom
    }

  ]
})

export default router
