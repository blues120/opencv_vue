import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login/login'
// import firstPage from '@/components/firstPage/firstPage'
// import seconldPage from '@/components/seconldPage/seconldPage'
// import thirdPage from '@/components/thirdPage/thirdPage'
// import question1 from '@/components/questions/question_1'
// import question2 from '@/components/questions/question_2'
// import question3 from '@/components/questions/question_3'
// import question4 from '@/components/questions/question_4'
// import question5 from '@/components/questions/question_5'
// import question6 from '@/components/questions/question_6'
// import question7 from '@/components/questions/question_7'
// import question8 from '@/components/questions/question_8'
// import question9 from '@/components/questions/question_9'
// import question10 from '@/components/questions/question_10'
// import question11 from '@/components/questions/question_11'
// import question12 from '@/components/questions/question_12'
// import question13 from '@/components/questions/question_13'

import login from '@/components/login'
import register from '@/components/register'
import forgetpassword from '@/components/forgetpassword'
import sysUserMain from '@/components/sysUserMain'

import applyrestore from '@/components/generator/tapplyrestore'
import user from '@/components/generator/tuser'
import project from '@/components/generator/tproject'
import userfile from '@/components/generator/tuserfile'

import applyrestoreDialog from '@/components/generator/tapplyrestore-add-or-update'
import userDialog from '@/components/generator/tuser-add-or-update'
import projectDialog from '@/components/generator/tproject-add-or-update'
import userfileDialog from '@/components/generator/tuserfile-add-or-update'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgetpassword',
      name: 'forgetpassword',
      component: forgetpassword
    },
    {
      path: '/sysUserMain',
      name: 'sysUserMain',
      component: sysUserMain
    },
    {
      path: '/applyrestore',
      name: 'applyrestore',
      component: applyrestore
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/project',
      name: 'project',
      component: project
    },
    {
      path: '/userfile',
      name: 'userfile',
      component: userfile
    },
    {
      path: '/applyrestoreDialog',
      name: 'applyrestoreDialog',
      component: applyrestoreDialog
    },
    {
      path: '/userDialog',
      name: 'userDialog',
      component: userDialog
    },
    {
      path: '/projectDialog',
      name: 'projectDialog',
      component: projectDialog
    },
    {
      path: '/userfileDialog',
      name: 'userfileDialog',
      component: userfileDialog
    }

  ]
})
