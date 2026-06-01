// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit'
const initialState = { data: null, loading: false, error: null }
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (s,a) => { s.loading = a.payload },
    setError:   (s,a) => { s.error   = a.payload },
    clearError: (s)   => { s.error   = null       },
  },
})
export const { setLoading, setError, clearError } = userSlice.actions
export default userSlice.reducer
