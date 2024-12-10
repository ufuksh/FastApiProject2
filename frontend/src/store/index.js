import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '' // Kullanıcı giriş yaptığında JWT token vs. burada saklanır.
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = ''
    }
  },
  actions: {},
  getters: {
    isAuthenticated: state => !!state.token
  }
})
