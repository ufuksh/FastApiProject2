// src/services/api.js
import axios from 'axios'
import store from '../store'

const api = axios.create({
  baseURL: 'http://localhost:8000',  // FastAPI backend'inizin URL'si
  headers: {
    'Content-Type': 'application/json'
  }
})

// Her isteğe Authorization header'ı ekle
api.interceptors.request.use(config => {
  const token = store.state.token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default api
