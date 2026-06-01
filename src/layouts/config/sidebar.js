// src/config/sidebar.js
import { ROUTES } from './routes'
import { ROLES }  from './roles'

// allowedRoles: null = everyone, array = only those roles
export const SIDEBAR_MENU = [
  {
    id:    'dashboard',
    label: 'Dashboard',
    icon:  'MdDashboard',
    path:  ROUTES.DASHBOARD,
    allowedRoles: null,
  },
  {
    id:    'users',
    label: 'User Module',
    icon:  'MdPeople',
    allowedRoles: null,
    children: [
      { id:'user-details',    label:'User Details',    path: ROUTES.USER_DETAILS,    icon:'MdPersonOutline' },
      { id:'user-audit-logs', label:'User Audit Logs', path: ROUTES.USER_AUDIT_LOGS, icon:'MdHistory'       },
       { id:'add-user',        label:'Add User',        path: ROUTES.ADD_USER,        icon:'MdPersonAdd'     },
    ],
  },
  {
    id:    'payments',
    label: 'Payment Module',
    icon:  'MdPayment',
    allowedRoles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FINANCE_MANAGER],
    children: [
      { id:'all-txn',    label:'All Transactions',  path: ROUTES.ALL_TRANSACTIONS,  icon:'MdSwapHoriz'    },
      { id:'pending-pay',label:'Pending Payments',  path: ROUTES.PENDING_PAYMENTS,  icon:'MdPending'      },
      { id:'failed-pay', label:'Failed Payments',   path: ROUTES.FAILED_PAYMENTS,   icon:'MdCancel'       },
      { id:'refunds',    label:'Refund Requests',   path: ROUTES.REFUND_REQUESTS,   icon:'MdRefresh'      },
      { id:'wallet-mgmt',label:'Wallet Management', path: ROUTES.WALLET_MANAGEMENT, icon:'MdAccountBalanceWallet' },
    ],
  },
  {
    id:    'loans',
    label: 'Loan Module',
    icon:  'MdAccountBalance',
    allowedRoles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.LOAN_MANAGER],
    children: [
      { id:'loan-app',   label:'Loan Applications', path: ROUTES.LOAN_APPLICATIONS, icon:'MdDescription'  },
      { id:'loan-appr',  label:'Loan Approval',     path: ROUTES.LOAN_APPROVAL,     icon:'MdCheckCircle'  },
      { id:'loan-rej',   label:'Loan Rejected',     path: ROUTES.LOAN_REJECTED,     icon:'MdHighlightOff' },
      { id:'active-loans',label:'Active Loans',     path: ROUTES.ACTIVE_LOANS,      icon:'MdTrendingUp'   },
      { id:'closed-loans',label:'Closed Loans',     path: ROUTES.CLOSED_LOANS,      icon:'MdDone'         },
      { id:'emi-mgmt',   label:'EMI Management',    path: ROUTES.EMI_MANAGEMENT,    icon:'MdCalendarToday'},
      { id:'recovery',   label:'Recovery Tracking', path: ROUTES.RECOVERY_TRACKING, icon:'MdTrackChanges' },
    ],
  },
  {
    id:    'accounts',
    label: 'Accounts Module',
    icon:  'MdBarChart',
    allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_MANAGER],
    children: [
      { id:'revenue',     label:'Revenue Reports',      path: ROUTES.REVENUE_REPORTS,      icon:'MdMonetizationOn' },
      { id:'profit',      label:'Profit Analytics',     path: ROUTES.PROFIT_ANALYTICS,     icon:'MdShowChart'      },
      { id:'gst',         label:'GST Reports',          path: ROUTES.GST_REPORTS,          icon:'MdReceipt'        },
      { id:'tds',         label:'TDS Reports',          path: ROUTES.TDS_REPORTS,          icon:'MdArticle'        },
      { id:'commission',  label:'Commission Tracking',  path: ROUTES.COMMISSION_TRACKING,  icon:'MdPercent'        },
      { id:'fin-stmt',    label:'Financial Statements', path: ROUTES.FINANCIAL_STATEMENTS, icon:'MdListAlt'        },
    ],
  },
  {
    id:    'permissions',
    label: 'Permission Module',
    icon:  'MdAdminPanelSettings',
    allowedRoles: [ROLES.SUPER_ADMIN],
    children: [
      { id:'role-mgmt',    label:'Role Management',      path: ROUTES.ROLE_MANAGEMENT,     icon:'MdManageAccounts' },
      { id:'perm-matrix',  label:'Permission Matrix',    path: ROUTES.PERMISSION_MATRIX,   icon:'MdGrid3x3'        },
      { id:'admin-access', label:'Admin Access Control', path: ROUTES.ADMIN_ACCESS,        icon:'MdLock'           },
      { id:'activity-mon', label:'Activity Monitoring',  path: ROUTES.ACTIVITY_MONITORING, icon:'MdMonitor'        },
    ],
  },
  {
    id:    'settings',
    label: 'Settings',
    icon:  'MdSettings',
    allowedRoles: null,
    children: [
      { id:'add-role',     label:'Add Role',               path: ROUTES.ADD_ROLE,              icon:'MdGroupAdd',   superOnly: true },
      { id:'add-admin',    label:'Add Admin',              path: ROUTES.ADD_ADMIN,             icon:'MdPersonAdd',  superOnly: true },
      { id:'platform-set', label:'Platform Settings',      path: ROUTES.PLATFORM_SETTINGS,     icon:'MdTune',       superOnly: true },
      { id:'security-set', label:'Security Settings',      path: ROUTES.SECURITY_SETTINGS,     icon:'MdSecurity',   superOnly: true },
      { id:'notif-set',    label:'Notification Settings',  path: ROUTES.NOTIFICATION_SETTINGS, icon:'MdNotifications' },
      { id:'api-config',   label:'API Configurations',     path: ROUTES.API_CONFIGURATIONS,    icon:'MdCode',       superOnly: true },
    ],
  },
]
