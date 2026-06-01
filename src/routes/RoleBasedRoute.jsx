// src/routes/RoleBasedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RoleBasedRoute({ allowedRoles, children }) {
  const { role } = useSelector(s => s.auth)
  if (!allowedRoles || allowedRoles.includes(role)) return children
  return <Navigate to="/401" replace />
}
