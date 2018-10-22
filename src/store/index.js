import Vue from 'vue'
import Vuex from 'vuex'
// import httpRequest from '@/utils/httpRequest'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  store: {
    loginName: '',
    registration_url: '',
    token: ''

  },
  actions: {
    ZW_LOGIN: function ({ commit }) {
      axios.post('/api/tokens', {
        'loginName': 'meishou',
        'password': 'meishou123'
      }).then(result => {
        console.log(result.data)
        const token = result.data['token']
        const agencyInfo = result.data['agencyInfo']

        const loginName = agencyInfo['loginName']
        const registrationUrl = agencyInfo['registration_url']
        commit('SET_TOKEN', { token: token })
        commit('SET_LOGIN_NAME', { loginName: loginName })
        commit('SET_REGISTER_URL', { registration_url: registrationUrl })
      })
    }
  },
  mutations: {
    SET_TOKEN: (state, { token }) => {
      state.token = token
    },
    SET_LOGIN_NAME: (state, { loginName }) => {
      state.loginName = loginName
    },
    SET_REGISTER_URL: (state, { registrationUrl }) => {
      state.registration_url = registrationUrl
    }
  },
  getters: {
    // openProjects: state => {
    //   return state.projects.filter(project => !project.completed)
    // }
  },
  modules: {

  },
  strict: process.env.NODE_ENV !== 'production'
})
