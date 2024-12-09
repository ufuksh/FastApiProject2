// src/plugins/axios.js
import axios from 'axios'
import store from '../store'

const axiosInstance = axios.create({
  baseURL: 'http://<BACKEND_URL>', // Backend URL'inizi buraya ekleyin
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
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

export default axiosInstance
