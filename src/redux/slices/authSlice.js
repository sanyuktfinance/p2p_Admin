// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { TOKEN_KEY, ROLE_KEY } from '../../config/constants'

const initialState = {
  token:       localStorage.getItem(TOKEN_KEY) || null,
  user:        null,
  role:        localStorage.getItem(ROLE_KEY)  || null,
  loading:     false,
  error:       null,
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token           = action.payload.token
      state.user            = action.payload.user
      state.role            = action.payload.role
      state.isAuthenticated = true
      state.error           = null
      localStorage.setItem(TOKEN_KEY, action.payload.token)
      localStorage.setItem(ROLE_KEY,  action.payload.role)
    },
    logout: (state) => {
      state.token = null; state.user = null
      state.role  = null; state.isAuthenticated = false
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(ROLE_KEY)
    },
    setLoading: (s,a) => { s.loading = a.payload },
    setError:   (s,a) => { s.error   = a.payload },
  },
})
export const { loginSuccess, logout, setLoading, setError } = authSlice.actions
export default authSlice.reducer
