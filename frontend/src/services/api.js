import axios from 'axios'
import store from '../store'

// FastAPI backend'inizin IP adresi ve portu
const api = axios.create({
  baseURL: 'http://35.158.119.153:8000',  // IP adresinizi buraya girin
  headers: {
    'Content-Type': 'application/json'
  }
})

// Her isteğe Authorization header'ı ekle
api.interceptors.request.use(
  config => {
    const token = store.state.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
