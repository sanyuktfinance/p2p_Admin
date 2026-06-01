import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../redux/slices/authSlice'
import { ROLES } from '../../../config/roles'
import { ROUTES } from '../../../config/routes'
import './Login.css'

export default function LoginPage() {
  const [form, setForm]     = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')
  const dispatch  = useDispatch()
  const navigate  = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill all fields'); return }
    setLoading(true); setError('')
    // Mock auth — replace with real API
    setTimeout(() => {
      dispatch(loginSuccess({
        token: 'mock_admin_jwt_token',
        role:  ROLES.SUPER_ADMIN,
        user:  { name: 'Super Admin', email: form.email },
      }))
      navigate(ROUTES.DASHBOARD)
    }, 1200)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">
            <span>LA</span>
          </div>
          <div className="login-brand-text">
            <div className="login-brand-name">LenDen Admin</div>
            <div className="login-brand-sub">Super Admin Panel</div>
          </div>
        </div>
        <h2 className="login-title">Welcome back</h2>
        <p className="login-sub">Sign in to your admin account</p>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-field">
            <label>Email Address</label>
            <input type="email" placeholder="super@lenden.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="login-input" />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input type="password" placeholder="••••••••"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className="login-input" />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="login-spinner" /> : 'Sign In'}
          </button>
        </form>
        <p className="login-hint">Demo: any email + any password</p>
      </div>
    </div>
  )
}
