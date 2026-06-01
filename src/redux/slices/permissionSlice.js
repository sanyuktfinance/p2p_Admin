// src/redux/slices/permissionSlice.js
import { createSlice } from '@reduxjs/toolkit'
const initialState = { data: null, loading: false, error: null }
const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setLoading: (s,a) => { s.loading = a.payload },
    setError:   (s,a) => { s.error   = a.payload },
    clearError: (s)   => { s.error   = null       },
  },
})
export const { setLoading, setError, clearError } = permissionSlice.actions
export default permissionSlice.reducer
