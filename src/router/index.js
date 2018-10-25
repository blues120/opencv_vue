import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login/login'
import firstPage from '@/components/firstPage/firstPage'
import seconldPage from '@/components/seconldPage/seconldPage'
import thirdPage from '@/components/thirdPage/thirdPage'
import question1 from '@/components/questions/question_1'
import question2 from '@/components/questions/question_2'
import question3 from '@/components/questions/question_3'
import question4 from '@/components/questions/question_4'
import question5 from '@/components/questions/question_5'
import question6 from '@/components/questions/question_6'
import question7 from '@/components/questions/question_7'
import question8 from '@/components/questions/question_8'
import question9 from '@/components/questions/question_9'
import question10 from '@/components/questions/question_10'
import question11 from '@/components/questions/question_11'
import question12 from '@/components/questions/question_12'
import question13 from '@/components/questions/question_13'

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
      path: '/question1',
      name: 'question1',
      component: question1
    },
    {
      path: '/question2',
      name: 'question2',
      component: question2
    },
    {
      path: '/question3',
      name: 'question3',
      component: question3
    },
    {
      path: '/question4',
      name: 'question4',
      component: question4
    },
    {
      path: '/question5',
      name: 'question5',
      component: question5
    },
    {
      path: '/question6',
      name: 'question6',
      component: question6
    },
    {
      path: '/question7',
      name: 'question7',
      component: question7
    },
    {
      path: '/question8',
      name: 'question8',
      component: question8
    },
    {
      path: '/question9',
      name: 'question9',
      component: question9
    },
    {
      path: '/question10',
      name: 'question10',
      component: question10
    },
    {
      path: '/question11',
      name: 'question11',
      component: question11
    },
    {
      path: '/question12',
      name: 'question12',
      component: question12
    },
    {
      path: '/question13',
      name: 'question13',
      component: question13
    }

  ]
})
