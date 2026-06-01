// src/config/apiEndpoints.js
// All API endpoints — replace BASE_URL when connecting backend
export const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.lendenclub.com/admin'

export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN:         '/auth/login',
    LOGOUT:        '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PW:     '/auth/forgot-password',
    VERIFY_OTP:    '/auth/verify-otp',
    ME:            '/auth/me',
  },
  // Dashboard
  DASHBOARD: {
    STATS:          '/dashboard/stats',
    USER_OVERVIEW:  '/dashboard/user-overview',
    REVENUE_CHART:  '/dashboard/revenue',
    RECENT_TXN:     '/dashboard/recent-transactions',
    RECENT_LOANS:   '/dashboard/recent-loans',
    PENDING_KYC:    '/dashboard/pending-kyc',
  },
  // Users
  USERS: {
    LIST:       '/users',
    DETAIL:     (id) => `/users/${id}`,
    AUDIT_LOGS: (id) => `/users/${id}/audit-logs`,
    BLOCK:      (id) => `/users/${id}/block`,
    DELETE:     (id) => `/users/${id}`,
  },
  // Payments
  PAYMENTS: {
    ALL:        '/payments',
    PENDING:    '/payments/pending',
    FAILED:     '/payments/failed',
    REFUNDS:    '/payments/refunds',
    WALLET:     '/payments/wallet',
  },
  // Loans
  LOANS: {
    APPLICATIONS: '/loans/applications',
    APPROVE:      (id) => `/loans/${id}/approve`,
    REJECT:       (id) => `/loans/${id}/reject`,
    ACTIVE:       '/loans/active',
    CLOSED:       '/loans/closed',
    EMI:          '/loans/emi',
    RECOVERY:     '/loans/recovery',
  },
  // Accounts
  ACCOUNTS: {
    REVENUE:    '/accounts/revenue',
    PROFIT:     '/accounts/profit',
    GST:        '/accounts/gst',
    TDS:        '/accounts/tds',
    COMMISSION: '/accounts/commission',
    STATEMENTS: '/accounts/statements',
  },
  // Settings
  SETTINGS: {
    ADD_ADMIN:    '/settings/admins',
    ADD_ROLE:     '/settings/roles',
    PLATFORM:     '/settings/platform',
    SECURITY:     '/settings/security',
    NOTIFICATIONS:'/settings/notifications',
    API_KEYS:     '/settings/api-keys',
  },
}
