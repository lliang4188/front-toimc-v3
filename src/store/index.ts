import { UserInfo } from '@/common/interface'
import { createLogger, createStore } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {} as UserInfo,
    isHide: false,
    ws: null,
    num: 0
  },
  mutations: {
    // initWebSocket (state, config) {
    //   state.ws = new WebSocketClient(config)
    //   state.ws.init()
    // },
    setSid (state, value) {
      state.sid = value
    },
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    // 设置用户信息
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      // 存储用户信息
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置登录信息
    setIsLogin (state, value) {
      state.isLogin = value
    },
    // 设置container的状态
    setHide (state, value) {
      state.isHide = value
    },
    setMessage (state, value) {
      state.num = value
    }
  },
  getters: {
    uid: (state) => state.userInfo ? state.userInfo._id : ''
  },
  actions: {
    message ({ commit }, msg) {
      commit('setMessage', msg)
    }
  },
  plugins: debug ? [createLogger()] : []

})
