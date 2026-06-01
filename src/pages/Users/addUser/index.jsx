// src/pages/Users/AddUser/index.jsx
import React, { useState, useMemo } from 'react'
import {
  MdPersonAdd, MdClose, MdCheckCircle, MdCancel,
  MdVisibility, MdEdit, MdBlock, MdDelete,
  MdSearch, MdFilterList, MdFileDownload,
  MdPeople, MdShield, MdAdminPanelSettings,
  MdEmail, MdPhone, MdLock, MdBusiness,
  MdKeyboardArrowDown, MdVerified, MdWarning,
  MdSwapVert, MdMoreVert, MdRefresh,
} from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import '../shared/Users.css'
import './AddUser.css'

// ── Mock Data ──────────────────────────────────────────
const ROLES_CONFIG = [
  {
    value: 'super_admin',
    label: 'Super Admin',
    badge: 'role-super',
    desc: 'Full system access — all modules, settings, and user management.',
    color: '#7C3AED',
    bg: '#F5F3FF',
    permissions: ['Dashboard','Users','Payments','Loans','Accounts','Permissions','Settings'],
  },
  {
    value: 'admin',
    label: 'Admin',
    badge: 'role-admin',
    desc: 'Broad access — users, loans, and payment management.',
    color: '#2563EB',
    bg: '#EFF6FF',
    permissions: ['Dashboard','Users','Payments','Loans'],
  },
  {
    value: 'finance_manager',
    label: 'Finance Manager',
    badge: 'role-finance',
    desc: 'Access to accounts, revenue, GST, TDS reports.',
    color: '#16A34A',
    bg: '#F0FDF4',
    permissions: ['Dashboard','Accounts','Payments'],
  },
  {
    value: 'loan_manager',
    label: 'Loan Manager',
    badge: 'role-loan',
    desc: 'Manage loan applications, approvals, EMI, recovery.',
    color: '#F97316',
    bg: '#FFF7ED',
    permissions: ['Dashboard','Loans'],
  },
  {
    value: 'support',
    label: 'Support',
    badge: 'role-support',
    desc: 'View-only access to users and support tickets.',
    color: '#64748B',
    bg: '#F8FAFC',
    permissions: ['Dashboard','Users (View only)'],
  },
]

const DEPARTMENTS = [
  'Technology', 'Finance', 'Operations', 'Risk & Compliance',
  'Customer Support', 'Sales', 'Legal', 'Human Resources',
]

const INITIAL_USERS = [
  {
    id:'USR-001', name:'Ravi Kumar',     email:'ravi@lenden.com',     phone:'9876543210',
    role:'admin',           dept:'Technology',      status:'active',   avatar:'RK',
    createdAt:'2024-01-10', lastLogin:'2024-05-18 09:23', twoFA:true,
  },
  {
    id:'USR-002', name:'Priya Sharma',   email:'priya@lenden.com',    phone:'9823456789',
    role:'finance_manager', dept:'Finance',          status:'active',   avatar:'PS',
    createdAt:'2024-02-15', lastLogin:'2024-05-17 17:30', twoFA:false,
  },
  {
    id:'USR-003', name:'Vikram Singh',   email:'vikram@lenden.com',   phone:'9834567890',
    role:'loan_manager',    dept:'Operations',       status:'active',   avatar:'VS',
    createdAt:'2024-03-01', lastLogin:'2024-05-17 14:12', twoFA:true,
  },
  {
    id:'USR-004', name:'Sneha Patel',    email:'sneha@lenden.com',    phone:'9845678901',
    role:'support',         dept:'Customer Support', status:'inactive', avatar:'SP',
    createdAt:'2024-03-20', lastLogin:'2024-05-15 11:00', twoFA:false,
  },
  {
    id:'USR-005', name:'Arun Mehta',     email:'arun@lenden.com',     phone:'9812345678',
    role:'admin',           dept:'Risk & Compliance',status:'active',   avatar:'AM',
    createdAt:'2024-04-05', lastLogin:'2024-05-18 08:45', twoFA:true,
  },
  {
    id:'USR-006', name:'Deepak Joshi',   email:'deepak@lenden.com',   phone:'9856789012',
    role:'support',         dept:'Sales',            status:'suspended',avatar:'DJ',
    createdAt:'2024-04-12', lastLogin:'2024-05-10 09:00', twoFA:false,
  },
  {
    id:'USR-007', name:'Anita Rao',      email:'anita@lenden.com',    phone:'9867890123',
    role:'finance_manager', dept:'Finance',          status:'active',   avatar:'AR',
    createdAt:'2024-04-22', lastLogin:'2024-05-16 15:20', twoFA:true,
  },
]

const AVATAR_COLORS = ['avatar-blue','avatar-green','avatar-purple','avatar-orange','avatar-gray']
const getAvatarColor = (name) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]

const ROLE_MAP = Object.fromEntries(ROLES_CONFIG.map(r => [r.value, r]))

const FORM_EMPTY = {
  firstName:'', lastName:'', email:'', phone:'', role:'', department:'',
  password:'', confirmPassword:'', sendInvite:true, twoFA:false,
}

// ── Stat Cards ─────────────────────────────────────────
function StatsRow({ users }) {
  const stats = [
    { icon:'👥', label:'Total Users',     val: users.length,                              cls:'usc-blue'   },
    { icon:'🟢', label:'Active',          val: users.filter(u=>u.status==='active').length, cls:'usc-green'  },
    { icon:'🔴', label:'Inactive',        val: users.filter(u=>u.status!=='active').length, cls:'usc-orange' },
    { icon:'🛡️', label:'Super Admins',   val: users.filter(u=>u.role==='super_admin').length, cls:'usc-purple'},
    { icon:'🔐', label:'2FA Enabled',     val: users.filter(u=>u.twoFA).length,           cls:'usc-green'  },
    { icon:'📁', label:'Departments',     val: new Set(users.map(u=>u.dept)).size,         cls:'usc-blue'   },
  ]
  return (
    <div className="au-stats-grid">
      {stats.map((s,i) => (
        <motion.div key={i} className="user-stat-card"
          initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
          <div className={'user-stat-icon '+s.cls}>{s.icon}</div>
          <div>
            <div className="user-stat-val">{s.val}</div>
            <div className="user-stat-label">{s.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ── Add User Modal ─────────────────────────────────────
function AddUserModal({ onClose, onAdd }) {
  const [form, setForm]     = useState(FORM_EMPTY)
  const [errors, setErrors] = useState({})
  const [step, setStep]     = useState(1) // 1=details, 2=role, 3=confirm
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const selectedRole = ROLES_CONFIG.find(r => r.value === form.role)

  const set = (k, v) => {
    setForm(p => ({...p, [k]: v}))
    if (errors[k]) setErrors(p => ({...p, [k]: ''}))
  }

  const validate1 = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim())  e.lastName  = 'Last name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = 'Valid 10-digit phone required'
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const validate2 = () => {
    const e = {}
    if (!form.role)       e.role       = 'Please select a role'
    if (!form.department) e.department = 'Please select a department'
    if (!form.sendInvite) {
      if (!form.password || form.password.length < 8) e.password = 'Min 8 characters'
      if (form.password !== form.confirmPassword)     e.confirmPassword = 'Passwords do not match'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step === 1 && validate1()) setStep(2)
    if (step === 2 && validate2()) setStep(3)
  }

  const submit = () => {
    setLoading(true)
    setTimeout(() => {
      const initials = (form.firstName[0]+form.lastName[0]).toUpperCase()
      onAdd({
        id: 'USR-' + String(Date.now()).slice(-3),
        name: form.firstName+' '+form.lastName,
        email: form.email,
        phone: form.phone,
        role: form.role,
        dept: form.department,
        status: 'active',
        avatar: initials,
        createdAt: new Date().toISOString().slice(0,10),
        lastLogin: '—',
        twoFA: form.twoFA,
      })
      setLoading(false)
      setSuccess(true)
      setTimeout(onClose, 1800)
    }, 900)
  }

  return (
    <div className="au-modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <motion.div className="au-modal"
        initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}}
        exit={{opacity:0,scale:0.95,y:20}} transition={{duration:0.22}}>

        {/* Header */}
        <div className="au-modal-header">
          <div>
            <div className="au-modal-title">
              <MdPersonAdd size={20}/> Add New User
            </div>
            <div className="au-modal-sub">Fill in the details to create and assign a user role</div>
          </div>
          <button className="au-modal-close" onClick={onClose}><MdClose size={20}/></button>
        </div>

        {/* Step Bar */}
        <div className="au-steps">
          {['User Details','Role & Access','Confirm'].map((s,i) => (
            <div key={i} className={`au-step ${step===i+1?'active':''} ${step>i+1?'done':''}`}>
              <div className="au-step-circle">{step>i+1 ? '✓' : i+1}</div>
              <div className="au-step-label">{s}</div>
            </div>
          ))}
          <div className="au-step-line"/>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div key="success" className="au-success"
              initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}}>
              <div className="au-success-icon">✅</div>
              <div className="au-success-title">User Created!</div>
              <div className="au-success-sub">{form.firstName} {form.lastName} has been added successfully.</div>
            </motion.div>
          ) : (
            <motion.div key={step} className="au-modal-body"
              initial={{opacity:0,x:30}} animate={{opacity:1,x:0}}
              exit={{opacity:0,x:-30}} transition={{duration:0.18}}>

              {/* ── STEP 1: User Details ── */}
              {step === 1 && (
                <div className="au-form-grid">
                  <div className="au-field-group">
                    <div className="au-field">
                      <label className="au-label">First Name <span className="req">*</span></label>
                      <input className={`au-input ${errors.firstName?'error':''}`}
                        placeholder="e.g. Ravi"
                        value={form.firstName} onChange={e=>set('firstName',e.target.value)}/>
                      {errors.firstName && <div className="au-error">{errors.firstName}</div>}
                    </div>
                    <div className="au-field">
                      <label className="au-label">Last Name <span className="req">*</span></label>
                      <input className={`au-input ${errors.lastName?'error':''}`}
                        placeholder="e.g. Kumar"
                        value={form.lastName} onChange={e=>set('lastName',e.target.value)}/>
                      {errors.lastName && <div className="au-error">{errors.lastName}</div>}
                    </div>
                  </div>
                  <div className="au-field">
                    <label className="au-label">Email Address <span className="req">*</span></label>
                    <div className="au-input-icon-wrap">
                      <MdEmail className="au-input-icon"/>
                      <input className={`au-input with-icon ${errors.email?'error':''}`}
                        placeholder="user@lenden.com" type="email"
                        value={form.email} onChange={e=>set('email',e.target.value)}/>
                    </div>
                    {errors.email && <div className="au-error">{errors.email}</div>}
                  </div>
                  <div className="au-field">
                    <label className="au-label">Phone Number <span className="req">*</span></label>
                    <div className="au-input-icon-wrap">
                      <MdPhone className="au-input-icon"/>
                      <input className={`au-input with-icon ${errors.phone?'error':''}`}
                        placeholder="10-digit mobile" type="tel" maxLength={10}
                        value={form.phone} onChange={e=>set('phone',e.target.value.replace(/\D/,''))}/>
                    </div>
                    {errors.phone && <div className="au-error">{errors.phone}</div>}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Role & Access ── */}
              {step === 2 && (
                <div className="au-form-grid">
                  <div className="au-field">
                    <label className="au-label">Select Role <span className="req">*</span></label>
                    <div className="au-role-cards">
                      {ROLES_CONFIG.map(r => (
                        <div key={r.value}
                          className={`au-role-card ${form.role===r.value?'selected':''}`}
                          onClick={()=>set('role',r.value)}
                          style={form.role===r.value?{borderColor:r.color,background:r.bg}:{}}>
                          <div className="au-role-top">
                            <span className={'role-badge '+r.badge}>{r.label}</span>
                            {form.role===r.value && <span className="au-role-check">✓</span>}
                          </div>
                          <div className="au-role-desc">{r.desc}</div>
                          <div className="au-role-perms">
                            {r.permissions.map(p=>(
                              <span key={p} className="au-perm-chip">{p}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.role && <div className="au-error">{errors.role}</div>}
                  </div>

                  <div className="au-field">
                    <label className="au-label">Department <span className="req">*</span></label>
                    <div className="au-select-wrap">
                      <select className={`au-select ${errors.department?'error':''}`}
                        value={form.department} onChange={e=>set('department',e.target.value)}>
                        <option value="">— Select Department —</option>
                        {DEPARTMENTS.map(d=><option key={d}>{d}</option>)}
                      </select>
                      <MdKeyboardArrowDown className="au-select-icon"/>
                    </div>
                    {errors.department && <div className="au-error">{errors.department}</div>}
                  </div>

                  <div className="au-field">
                    <label className="au-label">Password Setup</label>
                    <div className="au-toggle-row">
                      <div className="au-toggle-info">
                        <div className="au-toggle-title">Send Invite Email</div>
                        <div className="au-toggle-sub">User sets their own password via invite link</div>
                      </div>
                      <label className="au-toggle">
                        <input type="checkbox" checked={form.sendInvite}
                          onChange={e=>set('sendInvite',e.target.checked)}/>
                        <span className="au-toggle-slider"/>
                      </label>
                    </div>
                  </div>

                  {!form.sendInvite && (
                    <motion.div className="au-field-group"
                      initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}}>
                      <div className="au-field">
                        <label className="au-label">Password <span className="req">*</span></label>
                        <div className="au-input-icon-wrap">
                          <MdLock className="au-input-icon"/>
                          <input className={`au-input with-icon ${errors.password?'error':''}`}
                            type="password" placeholder="Min 8 characters"
                            value={form.password} onChange={e=>set('password',e.target.value)}/>
                        </div>
                        {errors.password && <div className="au-error">{errors.password}</div>}
                      </div>
                      <div className="au-field">
                        <label className="au-label">Confirm Password <span className="req">*</span></label>
                        <div className="au-input-icon-wrap">
                          <MdLock className="au-input-icon"/>
                          <input className={`au-input with-icon ${errors.confirmPassword?'error':''}`}
                            type="password" placeholder="Re-enter password"
                            value={form.confirmPassword} onChange={e=>set('confirmPassword',e.target.value)}/>
                        </div>
                        {errors.confirmPassword && <div className="au-error">{errors.confirmPassword}</div>}
                      </div>
                    </motion.div>
                  )}

                  <div className="au-toggle-row" style={{background:'var(--bg-main)',borderRadius:10,padding:'12px 16px'}}>
                    <div className="au-toggle-info">
                      <div className="au-toggle-title">Enable Two-Factor Auth (2FA)</div>
                      <div className="au-toggle-sub">Require OTP verification at every login</div>
                    </div>
                    <label className="au-toggle">
                      <input type="checkbox" checked={form.twoFA}
                        onChange={e=>set('twoFA',e.target.checked)}/>
                      <span className="au-toggle-slider"/>
                    </label>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Confirm ── */}
              {step === 3 && (
                <div className="au-confirm">
                  <div className="au-confirm-avatar">
                    {(form.firstName[0]||'?')+(form.lastName[0]||'?')}
                  </div>
                  <div className="au-confirm-name">{form.firstName} {form.lastName}</div>
                  <div className="au-confirm-email">{form.email}</div>
                  <div className="au-confirm-grid">
                    <div className="au-confirm-item"><span>Phone</span><strong>{form.phone}</strong></div>
                    <div className="au-confirm-item">
                      <span>Role</span>
                      <strong><span className={'role-badge '+(selectedRole?.badge||'')}>{selectedRole?.label}</span></strong>
                    </div>
                    <div className="au-confirm-item"><span>Department</span><strong>{form.department}</strong></div>
                    <div className="au-confirm-item"><span>Password</span><strong>{form.sendInvite?'Invite Email':'Manual Set'}</strong></div>
                    <div className="au-confirm-item"><span>2FA</span><strong>{form.twoFA?'Enabled':'Disabled'}</strong></div>
                    <div className="au-confirm-item"><span>Status</span><strong><span className="status-badge status-active">active</span></strong></div>
                  </div>
                  {selectedRole && (
                    <div className="au-confirm-perms">
                      <div className="au-confirm-perms-title">Access Modules</div>
                      <div className="au-role-perms">
                        {selectedRole.permissions.map(p=>(
                          <span key={p} className="au-perm-chip">{p}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        {!success && (
          <div className="au-modal-footer">
            <button className="au-btn-ghost" onClick={step===1?onClose:()=>setStep(s=>s-1)}>
              {step===1?'Cancel':'← Back'}
            </button>
            <div style={{display:'flex',gap:10}}>
              {step < 3
                ? <button className="au-btn-primary" onClick={next}>Continue →</button>
                : <button className="au-btn-primary" onClick={submit} disabled={loading}>
                    {loading?<span className="au-spinner"/>:'✓ Create User'}
                  </button>
              }
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// ── Users Table ────────────────────────────────────────
function UsersTable({ users, onEdit, onBlock, onDelete }) {
  const PER = 6
  const [page, setPage] = useState(1)
  const pages = Math.ceil(users.length/PER)
  const paged = users.slice((page-1)*PER, page*PER)

  return (
    <div className="users-table-card">
      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th><th>Role</th><th>Department</th>
              <th>Phone</th><th>Status</th><th>2FA</th>
              <th>Created</th><th>Last Login</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length===0
              ? <tr><td colSpan={9}>
                  <div className="empty-state">
                    <div className="empty-state-icon">👤</div>
                    <div className="empty-state-title">No users found</div>
                  </div>
                </td></tr>
              : paged.map(u => (
                <motion.tr key={u.id}
                  initial={{opacity:0}} animate={{opacity:1}}>
                  <td>
                    <div className="user-cell">
                      <div className={'user-avatar '+getAvatarColor(u.name)}>{u.avatar}</div>
                      <div>
                        <div className="user-name">{u.name}</div>
                        <div className="user-email">{u.email}</div>
                        <div className="user-id">{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={'role-badge '+(ROLE_MAP[u.role]?.badge||'role-support')}>
                      {ROLE_MAP[u.role]?.label||u.role}
                    </span>
                  </td>
                  <td><span className="au-dept-chip">{u.dept}</span></td>
                  <td style={{fontFamily:'monospace',fontSize:12}}>{u.phone}</td>
                  <td><span className={'status-badge status-'+u.status}>{u.status}</span></td>
                  <td>
                    <span style={{color:u.twoFA?'#16A34A':'#94A3B8',fontSize:12,fontWeight:600}}>
                      {u.twoFA?'✓ ON':'✗ OFF'}
                    </span>
                  </td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{u.createdAt}</td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{u.lastLogin}</td>
                  <td>
                    <div className="action-btns">
                      <button className="action-btn view" title="Edit" onClick={()=>onEdit(u)}>
                        <MdEdit/>
                      </button>
                      <button className="action-btn block" title={u.status==='active'?'Block':'Unblock'} onClick={()=>onBlock(u.id)}>
                        <MdBlock/>
                      </button>
                      <button className="action-btn delete" title="Delete" onClick={()=>onDelete(u.id)}>
                        <MdDelete/>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <div className="users-pagination">
          <div className="pagination-info">
            Showing {(page-1)*PER+1}–{Math.min(page*PER,users.length)} of {users.length} users
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>‹</button>
            {Array.from({length:pages},(_,i)=>(
              <button key={i} className={`pg-btn ${page===i+1?'active':''}`} onClick={()=>setPage(i+1)}>{i+1}</button>
            ))}
            <button className="pg-btn" disabled={page===pages} onClick={()=>setPage(p=>p+1)}>›</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────
export default function AddUserPage() {
  const [users, setUsers]         = useState(INITIAL_USERS)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch]       = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = useMemo(() => users.filter(u => {
    const q = search.toLowerCase()
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q)
    const matchRole   = roleFilter==='all' || u.role===roleFilter
    const matchStatus = statusFilter==='all' || u.status===statusFilter
    return matchSearch && matchRole && matchStatus
  }), [users, search, roleFilter, statusFilter])

  const addUser   = (u)  => setUsers(p=>[u,...p])
  const blockUser = (id) => setUsers(p=>p.map(u=>u.id===id
    ? {...u, status: u.status==='active'?'suspended':'active'} : u))
  const deleteUser = (id) => setUsers(p=>p.filter(u=>u.id!==id))

  return (
    <div className="users-page">

      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Add users, assign roles and manage access across the platform</p>
        </div>
        <div className="page-header-actions">
          <button className="users-btn-outline">
            <MdFileDownload size={16}/> Export
          </button>
          <button className="users-btn-primary" onClick={()=>setShowModal(true)}>
            <MdPersonAdd size={16}/> Add New User
          </button>
        </div>
      </div>

      {/* Stats */}
      <StatsRow users={users}/>

      {/* Toolbar */}
      <div className="users-toolbar">
        <div className="users-toolbar-row">
          <div className="users-search-wrap">
            <MdSearch className="users-search-icon" size={18}/>
            <input className="users-search-input"
              placeholder="Search by name, email or ID..."
              value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            <div className="au-select-wrap" style={{width:170}}>
              <select className="au-select" value={roleFilter} onChange={e=>setRoleFilter(e.target.value)}>
                <option value="all">All Roles</option>
                {ROLES_CONFIG.map(r=><option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
              <MdKeyboardArrowDown className="au-select-icon"/>
            </div>
            <div className="au-select-wrap" style={{width:150}}>
              <select className="au-select" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              <MdKeyboardArrowDown className="au-select-icon"/>
            </div>
            <button className="users-btn-outline" style={{padding:'8px 12px'}}
              onClick={()=>{setSearch('');setRoleFilter('all');setStatusFilter('all')}}>
              <MdRefresh size={16}/>
            </button>
          </div>
        </div>
        <div className="au-toolbar-meta">
          <span>{filtered.length} user{filtered.length!==1?'s':''} found</span>
          <span className="au-toolbar-sep">•</span>
          <span>{users.filter(u=>u.status==='active').length} active</span>
        </div>
      </div>

      {/* Table */}
      <UsersTable users={filtered} onEdit={()=>{}} onBlock={blockUser} onDelete={deleteUser}/>

      {/* Modal */}
      <AnimatePresence>
        {showModal && <AddUserModal onClose={()=>setShowModal(false)} onAdd={addUser}/>}
      </AnimatePresence>
    </div>
  )
}
