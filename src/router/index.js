import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
