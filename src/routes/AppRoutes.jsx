// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute  from './ProtectedRoute'
import DashboardLayout from '../layouts/DashboardLayout'

// Auth
import LoginPage        from '../pages/Auth/Login'
import ForgotPassword   from '../pages/Auth/ForgotPassword'
import OTPVerify        from '../pages/Auth/OTPVerify'

// Dashboard
import DashboardPage    from '../pages/Dashboard'

// Users
import UserDetails      from '../pages/Users/UserDetails'
import UserAuditLogs    from '../pages/Users/UserAuditLogs'
// import AddUser          from '../pages/Users/AddUser' 


// Payments
import AllTransactions  from '../pages/Payments/AllTransactions'
import PendingPayments  from '../pages/Payments/PendingPayments'
import FailedPayments   from '../pages/Payments/FailedPayments'
import RefundRequests   from '../pages/Payments/RefundRequests'
import WalletManagement from '../pages/Payments/WalletManagement'

// Loans
import LoanApplications from '../pages/Loans/LoanApplications'
import LoanApproval     from '../pages/Loans/LoanApproval'
import LoanRejected     from '../pages/Loans/LoanRejected'
import ActiveLoans      from '../pages/Loans/ActiveLoans'
import ClosedLoans      from '../pages/Loans/ClosedLoans'
import EMIManagement    from '../pages/Loans/EMIManagement'
import RecoveryTracking from '../pages/Loans/RecoveryTracking'

// Accounts
import RevenueReports      from '../pages/Accounts/RevenueReports'
import ProfitAnalytics     from '../pages/Accounts/ProfitAnalytics'
import GSTReports          from '../pages/Accounts/GSTReports'
import TDSReports          from '../pages/Accounts/TDSReports'
import CommissionTracking  from '../pages/Accounts/CommissionTracking'
import FinancialStatements from '../pages/Accounts/FinancialStatements'

// Permissions
import RoleManagement     from '../pages/Permissions/RoleManagement'
import PermissionMatrix   from '../pages/Permissions/PermissionMatrix'
import AdminAccessControl from '../pages/Permissions/AdminAccessControl'
import ActivityMonitoring from '../pages/Permissions/ActivityMonitoring'

// Settings
import AddRole              from '../pages/Settings/AddRole' 
import AddAdmin             from '../pages/Settings/AddAdmin'
import PlatformSettings     from '../pages/Settings/PlatformSettings'
import SecuritySettings     from '../pages/Settings/SecuritySettings'
import NotificationSettings from '../pages/Settings/NotificationSettings'
import APIConfigurations    from '../pages/Settings/APIConfigurations'

// Errors
import NotFound     from '../pages/Errors/NotFound'
import Unauthorized from '../pages/Errors/Unauthorized'

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Auth */}
      <Route path="/login"           element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verify"      element={<OTPVerify />} />

      {/* Protected Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/"          element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Users */}
          <Route path="/users/details"    element={<UserDetails />} />
          <Route path="/users/audit-logs" element={<UserAuditLogs />} />
         {/* <Route path="/users/add-user"   element={<AddUser />} />  */}

          {/* Payments */}
          <Route path="/payments/all"     element={<AllTransactions />} />
          <Route path="/payments/pending" element={<PendingPayments />} />
          <Route path="/payments/failed"  element={<FailedPayments />} />
          <Route path="/payments/refunds" element={<RefundRequests />} />
          <Route path="/payments/wallet"  element={<WalletManagement />} />

          {/* Loans */}
          <Route path="/loans/applications" element={<LoanApplications />} />
          <Route path="/loans/approval"     element={<LoanApproval />} />
          <Route path="/loans/rejected"     element={<LoanRejected />} />
          <Route path="/loans/active"       element={<ActiveLoans />} />
          <Route path="/loans/closed"       element={<ClosedLoans />} />
          <Route path="/loans/emi"          element={<EMIManagement />} />
          <Route path="/loans/recovery"     element={<RecoveryTracking />} />

          {/* Accounts */}
          <Route path="/accounts/revenue"    element={<RevenueReports />} />
          <Route path="/accounts/profit"     element={<ProfitAnalytics />} />
          <Route path="/accounts/gst"        element={<GSTReports />} />
          <Route path="/accounts/tds"        element={<TDSReports />} />
          <Route path="/accounts/commission" element={<CommissionTracking />} />
          <Route path="/accounts/statements" element={<FinancialStatements />} />

          {/* Permissions */}
          <Route path="/permissions/roles"    element={<RoleManagement />} />
          <Route path="/permissions/matrix"   element={<PermissionMatrix />} />
          <Route path="/permissions/access"   element={<AdminAccessControl />} />
          <Route path="/permissions/activity" element={<ActivityMonitoring />} />

          {/* Settings */}
          <Route path="/settings/add-role"      element={<AddRole />} /> 
          <Route path="/settings/add-admin"     element={<AddAdmin />} />
          <Route path="/settings/platform"      element={<PlatformSettings />} />
          <Route path="/settings/security"      element={<SecuritySettings />} />
          <Route path="/settings/notifications" element={<NotificationSettings />} />
          <Route path="/settings/api"           element={<APIConfigurations />} />
        </Route>
      </Route>

      {/* Errors */}
      <Route path="/401" element={<Unauthorized />} />
      <Route path="*"    element={<NotFound />} />

    </Routes>
  )
}
