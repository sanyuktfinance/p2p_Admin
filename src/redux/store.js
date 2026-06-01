// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer       from './slices/authSlice'
import dashboardReducer  from './slices/dashboardSlice'
import userReducer       from './slices/userSlice'
import paymentReducer    from './slices/paymentSlice'
import loanReducer       from './slices/loanSlice'
import accountReducer    from './slices/accountSlice'
import permissionReducer from './slices/permissionSlice'
import settingReducer    from './slices/settingSlice'

export const store = configureStore({
  reducer: {
    auth:       authReducer,
    dashboard:  dashboardReducer,
    users:      userReducer,
    payments:   paymentReducer,
    loans:      loanReducer,
    accounts:   accountReducer,
    permissions:permissionReducer,
    settings:   settingReducer,
  },
})
