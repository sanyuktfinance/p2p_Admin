// src/redux/slices/loanSlice.js
import { createSlice } from '@reduxjs/toolkit'
const initialState = { data: null, loading: false, error: null }
const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setLoading: (s,a) => { s.loading = a.payload },
    setError:   (s,a) => { s.error   = a.payload },
    clearError: (s)   => { s.error   = null       },
  },
})
export const { setLoading, setError, clearError } = loanSlice.actions
export default loanSlice.reducer
