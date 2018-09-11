import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import root from '@/components/root/root'
import home from '@/components/home/home'
import mine from '@/components/mine/mine'

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
    },
    {
      path: '/root',
      name: 'root',
      component: root,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        }, {
          path: '/mine',
          name: 'mine',
          component: mine
        }
      ]
    }

  ]
})
