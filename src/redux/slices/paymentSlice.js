// src/redux/slices/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit'
const initialState = { data: null, loading: false, error: null }
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setLoading: (s,a) => { s.loading = a.payload },
    setError:   (s,a) => { s.error   = a.payload },
    clearError: (s)   => { s.error   = null       },
  },
})
export const { setLoading, setError, clearError } = paymentSlice.actions
export default paymentSlice.reducer
