// src/services/api.js
import axios from 'axios'
import { BASE_URL } from '../config/apiEndpoints'
import { TOKEN_KEY } from '../config/constants'

const api = axios.create({ baseURL: BASE_URL, timeout: 15000, headers: { 'Content-Type': 'application/json' } })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) { localStorage.removeItem(TOKEN_KEY); window.location.href = '/login' }
    return Promise.reject(err)
  }
)
export default api
