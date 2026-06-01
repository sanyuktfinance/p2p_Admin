// src/redux/slices/accountSlice.js
import { createSlice } from '@reduxjs/toolkit'
const initialState = { data: null, loading: false, error: null }
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setLoading: (s,a) => { s.loading = a.payload },
    setError:   (s,a) => { s.error   = a.payload },
    clearError: (s)   => { s.error   = null       },
  },
})
export const { setLoading, setError, clearError } = accountSlice.actions
export default accountSlice.reducer
