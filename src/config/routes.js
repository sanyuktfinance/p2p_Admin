// src/config/routes.js
export const ROUTES = {
  // Auth
  LOGIN:           '/login',
  FORGOT_PASSWORD: '/forgot-password',
  OTP_VERIFY:      '/otp-verify',

  // Dashboard
  DASHBOARD: '/dashboard',

  // Users
  USER_DETAILS:    '/users/details',
  USER_AUDIT_LOGS: '/users/audit-logs',
  ADD_USER:        '/users/add-user', 

  // Payments
  ALL_TRANSACTIONS:  '/payments/all',
  PENDING_PAYMENTS:  '/payments/pending',
  FAILED_PAYMENTS:   '/payments/failed',
  REFUND_REQUESTS:   '/payments/refunds',
  WALLET_MANAGEMENT: '/payments/wallet',

  // Loans
  LOAN_APPLICATIONS: '/loans/applications',
  LOAN_APPROVAL:     '/loans/approval',
  LOAN_REJECTED:     '/loans/rejected',
  ACTIVE_LOANS:      '/loans/active',
  CLOSED_LOANS:      '/loans/closed',
  EMI_MANAGEMENT:    '/loans/emi',
  RECOVERY_TRACKING: '/loans/recovery',

  // Accounts
  REVENUE_REPORTS:       '/accounts/revenue',
  PROFIT_ANALYTICS:      '/accounts/profit',
  GST_REPORTS:           '/accounts/gst',
  TDS_REPORTS:           '/accounts/tds',
  COMMISSION_TRACKING:   '/accounts/commission',
  FINANCIAL_STATEMENTS:  '/accounts/statements',

  // Permissions
  ROLE_MANAGEMENT:     '/permissions/roles',
  PERMISSION_MATRIX:   '/permissions/matrix',
  ADMIN_ACCESS:        '/permissions/access',
  ACTIVITY_MONITORING: '/permissions/activity',

  // Settings
  ADD_ROLE:              '/settings/add-role',
  ADD_ADMIN:             '/settings/add-admin',
  PLATFORM_SETTINGS:     '/settings/platform',
  SECURITY_SETTINGS:     '/settings/security',
  NOTIFICATION_SETTINGS: '/settings/notifications',
  API_CONFIGURATIONS:    '/settings/api',

  // Errors
  NOT_FOUND:   '/404',
  UNAUTHORIZED:'/401',
}
