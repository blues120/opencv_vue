import Vue from 'vue'
import Vuex from 'vuex'
// import httpRequest from '@/utils/httpRequest'
import axios from 'axios'
// import Tools from '../utils/Tools.js'
// import qs from 'qs'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  store: {
    loginName: '',
    registration_url: '',
    token: '',
    faceDetectRes: true,
    faceId: '',
    toneDetectRes: true,
    toneId: '',
    questions: [],
    faceHeadImage: '',
    tongHeadImage: '',
    userId: 0

  },
  actions: {
    ZW_LOGIN: function ({ commit }) {
      return new Promise((resolve, reject) => {
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
          return resolve(loginName)
        }, error => {
          return reject(error)
        })
      })
    },
    ZW_UPLOAD_FACE: function ({ commit }, file) {
      return new Promise((resolve, reject) => {
        let param = new FormData() // 创建form对象

        param.append('photo', file) // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
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
            commit('SET_FACE_IMG', {
              'faceHeadImage': ''
            })
            return resolve(detectRes)
          }, error => {
            return reject(error)
          })
      })
    },
    ZW_UPLOAD_TONGUE: function ({ commit }, file) {
      return new Promise((resolve, reject) => {
        let param = new FormData() // 创建form对象

        param.append('photo', file) // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        console.log(param.get('photo')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data', 'X-ZHIYUN-API-TOKEN': this.state.token}
        }
        // 添加请求头
        axios.post('/api/photos/tongue', param, config)
          .then(response => {
            console.log(response.data)
            const detectRes = response.data['detectRes']
            const id = response.data['id']
            commit('SET_TONG_DETECT_RES', { tongDetectRes: detectRes })
            commit('SET_TONG_ID', { tongueId: id })
            commit('SET_TONG_IMG', {
              'tongHeadImage': ''
            })
            return resolve(detectRes)
          }, error => {
            return reject(error)
          })
      })
    },
    ZW_GET_QUESTIONS: function ({ commit }) {
      return new Promise((resolve, reject) => {
        let config = {
          headers: {'X-ZHIYUN-API-TOKEN': this.state.token}
        }
        axios.get('/api/questions', config).then(result => {
          console.log(result.data)
          const questions = result.data.data
          commit('SET_QUESTIONS', { questions: questions })
          return resolve(questions)
        }, error => {
          return reject(error)
        })
      })
    },
    ZW_EXAMINATIONS: function ({ commit }) {
      return new Promise((resolve, reject) => {
        var tempArray = []
        for (let i = 0; i < this.state.questions.length; i++) {
          var tempObjc = this.state.questions[i]
          var newObjc = {}
          newObjc['id'] = tempObjc['id'] + ''
          newObjc['answer'] = tempObjc['answer']
          tempArray.push(newObjc)
        }
        console.log(tempArray)
        let config = {
          headers: {'X-ZHIYUN-API-TOKEN': this.state.token}
        }
        let that = this
        console.log(that.state.faceId)
        console.log(that.state.tongId)
        console.log(that.state.questions)
        axios.post('/api/examinations', {
          'face_result_id': that.state.faceId + '',
          'tongue_result_id': that.state.tongId + '',
          'answers': tempArray
        }, config).then(result => {
          console.log(result.data)

          return resolve(result.data)
        }, error => {
          return reject(error)
        })
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
    SET_FACE_ID: (state, { faceId }) => {
      state.faceId = faceId
    },
    SET_TONG_DETECT_RES: (state, { tongDetectRes }) => {
      state.tongDetectRes = tongDetectRes
    },
    SET_TONG_ID: (state, { tongueId }) => {
      state.tongId = tongueId
    },
    SET_QUESTIONS: (state, { questions }) => {
      state.questions = questions
    },
    REPAIR_QUESTIONS: (state, objc) => {
      var aObjc = state.questions[objc.index]
      aObjc['answer'] = objc.answer
      state.questions[objc.index] = aObjc
    },
    SET_FACE_IMG: (state, { faceHeadImage }) => {
      state.faceHeadImage = faceHeadImage
    },
    SET_TONG_IMG: (state, { tongHeadImage }) => {
      state.tongHeadImage = tongHeadImage
    },
    SET_USER_ID: (state, { userId }) => {
      state.userId = userId
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
