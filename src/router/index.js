import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login/login'
import firstPage from '@/components/firstPage/firstPage'
import seconldPage from '@/components/seconldPage/seconldPage'
import thirdPage from '@/components/thirdPage/thirdPage'
import questionOne from '@/components/questions/question_1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'firstPage',
      component: firstPage
    },
    {
      path: '/seconldPage',
      name: 'seconldPage',
      component: seconldPage
    },
    {
      path: '/thirdPage',
      name: 'thirdPage',
      component: thirdPage
    },
    {
      path: '/questionOne',
      name: 'questionOne',
      component: questionOne
    }

  ]
})
