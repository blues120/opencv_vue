import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import root from '@/components/root/root'
import home from '@/components/home/home'
import mine from '@/components/mine/mine'
import CardSold from '@/components/home/CardSold'
import firstPage from '@/components/firstPage/firstPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'firstPage',
      component: firstPage
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
    },
    {
      path: '/CardSold',
      name: 'CardSold',
      component: CardSold
    }

  ]
})
