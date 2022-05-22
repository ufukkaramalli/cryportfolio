import Vue from 'vue'
import VueRouter from 'vue-router'
import * as StaticComponents from '@/router/staticLazyLoad'

const Home = resolve => {
  require.ensure(['@/views/Home.vue'], () => {
    resolve(require('@/views/Home.vue'))
  })
}

const Portfolio = resolve => {
  require.ensure(['@/views/Portfolio.vue'], () => {
    resolve(require('@/views/Portfolio.vue'))
  })
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      Navigation: StaticComponents.Navigation,
      Footer: StaticComponents.Footer
    }
  },
  {
    path: '/Portfolio',
    name: 'Portfolio',
    components: {
      default: Portfolio,
      Navigation: StaticComponents.Navigation,
      Footer: StaticComponents.Footer
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
