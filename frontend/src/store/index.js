// src/store/index.js
import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    clearAuth(state) {
      state.token = ''
      state.user = null
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('http://localhost:8000/token', credentials)
        const token = response.data.access_token
        localStorage.setItem('token', token)
        commit('setToken', token)
        // Kullanıcı bilgilerini almak için ek bir istek yapın
        const userResponse = await axios.get('http://localhost:8000/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        commit('setUser', userResponse.data)
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    async fetchUser({ commit, state }) {
      if (state.token) {
        try {
          const userResponse = await axios.get('http://localhost:8000/users/me', {
            headers: {
              'Authorization': `Bearer ${state.token}`
            }
          })
          commit('setUser', userResponse.data)
        } catch (error) {
          console.error('Fetching user failed:', error)
          commit('clearAuth')
        }
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      commit('clearAuth')
    }
  },
  modules: {}
})
