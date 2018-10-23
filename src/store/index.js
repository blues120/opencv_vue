import Vue from 'vue'
import Vuex from 'vuex'
// import httpRequest from '@/utils/httpRequest'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  store: {
    loginName: '',
    registration_url: '',
    token: '',
    faceDetectRes: true,
    faceId: '',
    toneDetectRes: true,
    toneId: ''

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
    },
    ZW_UPLOAD_FACE: function ({ commit }, file) {
      let param = new FormData() // 创建form对象

      param.append('photo', file) // 通过append向form对象添加数据
      param.append('chunk', '0') // 添加form表单中其他数据
      console.log('hhah')
      console.log(param.get('photo')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data', 'X-ZHIYUN-API-TOKEN': this.state.token}
      }
      // 添加请求头
      axios.post('/api/photos/face', param, config)
        .then(response => {
          console.log(response.data)
          const detectRes = response.data['detectRes']
          const id = response.data['id']
          commit('SET_FACE_DETECT_RES', { faceDetectRes: detectRes })
          commit('SET_FACE_ID', { faceId: id })
          if (detectRes === true) {
            this.$router.push({'name': 'login'})
          }
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
    },
    SET_FACE_DETECT_RES: (state, { faceDetectRes }) => {
      state.faceDetectRes = faceDetectRes
    },
    SET_FACE_ID: (state, { id }) => {
      state.faceId = id
    },
    SET_TONG_DETECT_RES: (state, { faceDetectRes }) => {
      state.tongDetectRes = faceDetectRes
    },
    SET_TONG_ID: (state, { id }) => {
      state.tongId = id
    }
  },
  getters: {
    // faceDetectRes: state => {
    //   return state.faceDetectRes
    // }
    // openProjects: state =>  {
    //   return state.projects.filter(project => !project.completed)
    // }
  },
  modules: {

  },
  strict: process.env.NODE_ENV !== 'production'
})
