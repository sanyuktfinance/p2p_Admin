// src/pages/Users/UserDetails/index.jsx
import React, { useState, useMemo } from 'react'
import {
  MdSearch, MdFilterList, MdFileDownload, MdPersonAdd,
  MdVisibility, MdEdit, MdBlock, MdDelete, MdClose,
  MdPeople, MdPersonOutline, MdShield, MdTrendingUp,
  MdVerified, MdWarning, MdCheckCircle, MdCancel,
  MdSwapVert,
} from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import { ADMINS, LENDERS, BORROWERS, USER_STATS } from '../../../constants/usersMockData'
import { fmtCurrency, fmtDate } from '../../../utils/formatters'
import '../shared/Users.css'
import './UserDetails.css'

const getAvatarColor = (name) => {
  const colors = ['avatar-blue','avatar-green','avatar-purple','avatar-orange','avatar-gray']
  return colors[name.charCodeAt(0) % colors.length]
}

const ROLE_LABELS = {
  super_admin:'Super Admin', admin:'Admin',
  finance_manager:'Finance', loan_manager:'Loan Mgr', support:'Support',
}

function UserStatsRow() {
  const stats = [
    { icon:'👥', label:'Total Users',     val:USER_STATS.totalUsers,     cls:'usc-blue'   },
    { icon:'💰', label:'Total Lenders',   val:USER_STATS.totalLenders,   cls:'usc-green'  },
    { icon:'🏦', label:'Total Borrowers', val:USER_STATS.totalBorrowers, cls:'usc-purple' },
    { icon:'🛡️', label:'Total Admins',    val:USER_STATS.totalAdmins,    cls:'usc-orange' },
    { icon:'⚠️', label:'KYC Pending',     val:USER_STATS.kycPending,     cls:'usc-red'    },
    { icon:'📈', label:'Active Today',    val:USER_STATS.activeToday,    cls:'usc-green'  },
  ]
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:14}}>
      {stats.map((s,i) => (
        <motion.div key={i} className={'user-stat-card'} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
          <div className={'user-stat-icon '+s.cls} style={{fontSize:22}}>{s.icon}</div>
          <div><div className="user-stat-val">{s.val}</div><div className="user-stat-label">{s.label}</div></div>
        </motion.div>
      ))}
    </div>
  )
}

function AdminsTable({ search, statusFilter, onView }) {
  const [page, setPage] = useState(1)
  const PER = 5
  const filtered = useMemo(() => ADMINS.filter(a => {
    const q = search.toLowerCase()
    return (a.name.toLowerCase().includes(q)||a.email.toLowerCase().includes(q)||a.id.toLowerCase().includes(q))
      && (statusFilter==='all'||a.status===statusFilter)
  }), [search,statusFilter])
  const pages = Math.ceil(filtered.length/PER)
  const paged = filtered.slice((page-1)*PER, page*PER)
  return (
    <div className="users-table-card">
      <div className="users-table-wrap">
        <table className="users-table">
          <thead><tr>
            <th>Admin</th><th>Role</th><th>Phone</th><th>Status</th>
            <th>2FA</th><th>Last Login</th><th>Actions</th>
          </tr></thead>
          <tbody>
            {paged.length===0
              ? <tr><td colSpan={7}><div className="empty-state"><div className="empty-state-icon">👤</div><div className="empty-state-title">Noo admins found</div></div></td></tr>
              : paged.map(a => (
                <tr key={a.id}>
                  <td><div className="user-cell">
                    <div className={'user-avatar '+getAvatarColor(a.name)}>{a.avatar}</div>
                    <div><div className="user-name">{a.name}</div><div className="user-email">{a.email}</div><div className="user-id">{a.id}</div></div>
                  </div></td>
                  <td><span className={'role-badge role-'+a.role}>{ROLE_LABELS[a.role]}</span></td>
                  <td style={{fontFamily:'monospace',fontSize:12}}>{a.phone}</td>
                  <td><span className={'status-badge status-'+a.status}>{a.status}</span></td>
                  <td><span style={{color:a.twoFA?'#16A34A':'#94A3B8',fontSize:12,fontWeight:600}}>{a.twoFA?'✓ ON':'✗ OFF'}</span></td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{a.lastLogin}</td>
                  <td><div className="action-btns">
                    <button className="action-btn view" onClick={()=>onView({...a,userType:'admin'})} title="View"><MdVisibility/></button>
                    <button className="action-btn edit" title="Edit"><MdEdit/></button>
                    <button className="action-btn block" title="Block"><MdBlock/></button>
                    <button className="action-btn delete" title="Delete"><MdDelete/></button>
                  </div></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span className="table-info">Showing {Math.min((page-1)*PER+1,filtered.length)}–{Math.min(page*PER,filtered.length)} of {filtered.length}</span>
        <div className="pagination">
          <button className="page-btn" onClick={()=>setPage(p=>p-1)} disabled={page===1}>‹</button>
          {Array.from({length:pages},(_,i)=>i+1).map(p=><button key={p} className={'page-btn '+(p===page?'active':'')} onClick={()=>setPage(p)}>{p}</button>)}
          <button className="page-btn" onClick={()=>setPage(p=>p+1)} disabled={page===pages||pages===0}>›</button>
        </div>
      </div>
    </div>
  )
}

function LendersTable({ search, statusFilter, onView }) {
  const [page, setPage] = useState(1)
  const PER = 5
  const filtered = useMemo(() => LENDERS.filter(l => {
    const q = search.toLowerCase()
    return (l.name.toLowerCase().includes(q)||l.email.toLowerCase().includes(q)||l.id.toLowerCase().includes(q))
      && (statusFilter==='all'||l.status===statusFilter)
  }), [search,statusFilter])
  const pages = Math.ceil(filtered.length/PER)
  const paged = filtered.slice((page-1)*PER, page*PER)
  return (
    <div className="users-table-card">
      <div className="users-table-wrap">
        <table className="users-table">
          <thead><tr>
            <th>Lender</th><th>Location</th><th>Invested</th>
            <th>Portfolio</th><th>XIRR</th><th>KYC</th><th>Status</th><th>Actions</th>
          </tr></thead>
          <tbody>
            {paged.length===0
              ? <tr><td colSpan={8}><div className="empty-state"><div className="empty-state-icon">💰</div><div className="empty-state-title">No lenders found</div></div></td></tr>
              : paged.map(l=>(
                <tr key={l.id}>
                  <td><div className="user-cell">
                    <div className={'user-avatar '+getAvatarColor(l.name)}>{l.avatar}</div>
                    <div><div className="user-name">{l.name}</div><div className="user-email">{l.email}</div><div className="user-id">{l.id}</div></div>
                  </div></td>
                  <td style={{fontSize:12}}>{l.city}, {l.state}</td>
                  <td style={{fontWeight:700,color:'var(--text-primary)',fontSize:13}}>{fmtCurrency(l.totalInvested)}</td>
                  <td style={{fontWeight:700,color:'#16A34A',fontSize:13}}>{fmtCurrency(l.currentPortfolio)}</td>
                  <td style={{fontWeight:700,color:l.xirr>=12?'#16A34A':l.xirr>=10?'#D97706':'#94A3B8',fontSize:13}}>{l.xirr>0?l.xirr+'%':'—'}</td>
                  <td><span className={'kyc-badge kyc-'+l.kycStatus}>{l.kycStatus}</span></td>
                  <td><span className={'status-badge status-'+l.status}>{l.status}</span></td>
                  <td><div className="action-btns">
                    <button className="action-btn view" onClick={()=>onView({...l,userType:'lender'})} title="View"><MdVisibility/></button>
                    <button className="action-btn edit" title="Edit"><MdEdit/></button>
                    <button className="action-btn block" title="Block"><MdBlock/></button>
                  </div></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span className="table-info">Showing {Math.min((page-1)*PER+1,filtered.length)}–{Math.min(page*PER,filtered.length)} of {filtered.length}</span>
        <div className="pagination">
          <button className="page-btn" onClick={()=>setPage(p=>p-1)} disabled={page===1}>‹</button>
          {Array.from({length:pages},(_,i)=>i+1).map(p=><button key={p} className={'page-btn '+(p===page?'active':'')} onClick={()=>setPage(p)}>{p}</button>)}
          <button className="page-btn" onClick={()=>setPage(p=>p+1)} disabled={page===pages||pages===0}>›</button>
        </div>
      </div>
    </div>
  )
}

function BorrowersTable({ search, statusFilter, onView }) {
  const [page, setPage] = useState(1)
  const PER = 5
  const filtered = useMemo(() => BORROWERS.filter(b => {
    const q = search.toLowerCase()
    return (b.name.toLowerCase().includes(q)||b.email.toLowerCase().includes(q)||b.id.toLowerCase().includes(q))
      && (statusFilter==='all'||b.status===statusFilter)
  }), [search,statusFilter])
  const pages = Math.ceil(filtered.length/PER)
  const paged = filtered.slice((page-1)*PER, page*PER)
  const sc = s => s>=750?'#16A34A':s>=700?'#D97706':s>=650?'#EA580C':'#DC2626'
  return (
    <div className="users-table-card">
      <div className="users-table-wrap">
        <table className="users-table">
          <thead><tr>
            <th>Borrower</th><th>Location</th><th>Active Loan</th>
            <th>Credit Score</th><th>Repayment %</th><th>NPA</th><th>KYC</th><th>Status</th><th>Actions</th>
          </tr></thead>
          <tbody>
            {paged.length===0
              ? <tr><td colSpan={9}><div className="empty-state"><div className="empty-state-icon">🏦</div><div className="empty-state-title">No borrowers found</div></div></td></tr>
              : paged.map(b=>(
                <tr key={b.id}>
                  <td><div className="user-cell">
                    <div className={'user-avatar '+getAvatarColor(b.name)}>{b.avatar}</div>
                    <div><div className="user-name">{b.name}</div><div className="user-email">{b.email}</div><div className="user-id">{b.id}</div></div>
                  </div></td>
                  <td style={{fontSize:12}}>{b.city}, {b.state}</td>
                  <td style={{fontWeight:700,fontSize:13}}>{b.activeLoanAmount>0?fmtCurrency(b.activeLoanAmount):'—'}</td>
                  <td>
                    <div className="credit-score-cell">
                      <span style={{fontWeight:800,color:sc(b.creditScore),fontSize:14}}>{b.creditScore}</span>
                      <div className="score-bar-wrap"><div className="score-bar" style={{width:((b.creditScore-300)/550*100)+'%',background:sc(b.creditScore)}}/></div>
                    </div>
                  </td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <div className="repay-bar-wrap"><div className="repay-bar" style={{width:b.repaymentRate+'%',background:b.repaymentRate>=95?'#16A34A':b.repaymentRate>=80?'#D97706':'#DC2626'}}/></div>
                      <span style={{fontSize:12,fontWeight:600,minWidth:36}}>{b.repaymentRate>0?b.repaymentRate+'%':'—'}</span>
                    </div>
                  </td>
                  <td>
                    {b.npaLoans>0
                      ? <span style={{background:'#FEE2E2',color:'#DC2626',borderRadius:999,padding:'3px 8px',fontSize:11,fontWeight:700}}>{b.npaLoans} NPA</span>
                      : <span style={{background:'#DCFCE7',color:'#16A34A',borderRadius:999,padding:'3px 8px',fontSize:11,fontWeight:700}}>Clean</span>
                    }
                  </td>
                  <td><span className={'kyc-badge kyc-'+b.kycStatus}>{b.kycStatus}</span></td>
                  <td><span className={'status-badge status-'+b.status}>{b.status}</span></td>
                  <td><div className="action-btns">
                    <button className="action-btn view" onClick={()=>onView({...b,userType:'borrower'})} title="View"><MdVisibility/></button>
                    <button className="action-btn edit" title="Edit"><MdEdit/></button>
                    <button className="action-btn block" title="Block"><MdBlock/></button>
                  </div></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span className="table-info">Showing {Math.min((page-1)*PER+1,filtered.length)}–{Math.min(page*PER,filtered.length)} of {filtered.length}</span>
        <div className="pagination">
          <button className="page-btn" onClick={()=>setPage(p=>p-1)} disabled={page===1}>‹</button>
          {Array.from({length:pages},(_,i)=>i+1).map(p=><button key={p} className={'page-btn '+(p===page?'active':'')} onClick={()=>setPage(p)}>{p}</button>)}
          <button className="page-btn" onClick={()=>setPage(p=>p+1)} disabled={page===pages||pages===0}>›</button>
        </div>
      </div>
    </div>
  )
}

function UserDetailModal({ user, onClose }) {
  if (!user) return null
  const isLender=user.userType==='lender', isBorrower=user.userType==='borrower', isAdmin=user.userType==='admin'
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        <div className="modal-header">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div className={'user-avatar '+getAvatarColor(user.name)} style={{width:44,height:44,fontSize:16,borderRadius:'50%'}}>{user.avatar}</div>
            <div><div className="modal-title">{user.name}</div><div style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>{user.id} · {user.userType.toUpperCase()}</div></div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span className={'status-badge status-'+user.status}>{user.status}</span>
            <button className="modal-close" onClick={onClose}><MdClose/></button>
          </div>
        </div>
        <div className="modal-body">
          <div className="detail-section">
            <div className="detail-section-title">Basic Information</div>
            <div className="detail-grid">
              <div className="detail-field"><label>Full Name</label><div className="detail-field-val">{user.name}</div></div>
              <div className="detail-field"><label>Email</label><div className="detail-field-val">{user.email}</div></div>
              <div className="detail-field"><label>Phone</label><div className="detail-field-val">{user.phone}</div></div>
              <div className="detail-field"><label>Joined</label><div className="detail-field-val">{fmtDate(user.joinDate)}</div></div>
              {user.city && <div className="detail-field"><label>Location</label><div className="detail-field-val">{user.city}, {user.state}</div></div>}
              {user.dob  && <div className="detail-field"><label>Date of Birth</label><div className="detail-field-val">{fmtDate(user.dob)}</div></div>}
            </div>
          </div>

          {isAdmin && (
            <div className="detail-section">
              <div className="detail-section-title">Admin Details</div>
              <div className="detail-grid">
                <div className="detail-field"><label>Role</label><div className="detail-field-val"><span className={'role-badge role-'+user.role}>{ROLE_LABELS[user.role]}</span></div></div>
                <div className="detail-field"><label>2FA Enabled</label><div className="detail-field-val" style={{color:user.twoFA?'#16A34A':'#DC2626'}}>{user.twoFA?'Yes':'No'}</div></div>
                <div className="detail-field"><label>Total Actions</label><div className="detail-field-val">{user.actionsCount?.toLocaleString()}</div></div>
                <div className="detail-field"><label>Last Login</label><div className="detail-field-val">{user.lastLogin}</div></div>
                <div className="detail-field"><label>Permissions</label><div className="detail-field-val">{user.permissions?.join(', ')}</div></div>
              </div>
            </div>
          )}

          {isLender && (
            <div className="detail-section">
              <div className="detail-section-title">Portfolio Summary</div>
              <div className="detail-grid">
                <div className="detail-field"><label>Total Invested</label><div className="detail-field-val" style={{fontWeight:700}}>{fmtCurrency(user.totalInvested)}</div></div>
                <div className="detail-field"><label>Portfolio Value</label><div className="detail-field-val" style={{color:'#16A34A',fontWeight:700}}>{fmtCurrency(user.currentPortfolio)}</div></div>
                <div className="detail-field"><label>Total Earned</label><div className="detail-field-val" style={{color:'#16A34A'}}>{fmtCurrency(user.totalEarned)}</div></div>
                <div className="detail-field"><label>XIRR p.a.</label><div className="detail-field-val" style={{color:'#16A34A',fontWeight:700}}>{user.xirr>0?user.xirr+'%':'—'}</div></div>
                <div className="detail-field"><label>Active Loans</label><div className="detail-field-val">{user.activeLoans}</div></div>
                <div className="detail-field"><label>Wallet Balance</label><div className="detail-field-val">{fmtCurrency(user.walletBalance)}</div></div>
                <div className="detail-field"><label>KYC Status</label><div className="detail-field-val"><span className={'kyc-badge kyc-'+user.kycStatus}>{user.kycStatus}</span></div></div>
                <div className="detail-field"><label>Risk Profile</label><div className="detail-field-val" style={{textTransform:'capitalize'}}>{user.riskProfile||'—'}</div></div>
              </div>
            </div>
          )}

          {isBorrower && (
            <div className="detail-section">
              <div className="detail-section-title">Loan Summary</div>
              <div className="detail-grid">
                <div className="detail-field"><label>Credit Score</label><div className="detail-field-val" style={{fontWeight:800,fontSize:20,color:user.creditScore>=750?'#16A34A':user.creditScore>=700?'#D97706':'#DC2626'}}>{user.creditScore}</div></div>
                <div className="detail-field"><label>Repayment Rate</label><div className="detail-field-val" style={{color:'#16A34A',fontWeight:700}}>{user.repaymentRate>0?user.repaymentRate+'%':'—'}</div></div>
                <div className="detail-field"><label>Total Loans</label><div className="detail-field-val">{user.loanCount}</div></div>
                <div className="detail-field"><label>Active Loan</label><div className="detail-field-val" style={{fontWeight:700}}>{fmtCurrency(user.activeLoanAmount)}</div></div>
                <div className="detail-field"><label>Total Borrowed</label><div className="detail-field-val">{fmtCurrency(user.totalBorrowed)}</div></div>
                <div className="detail-field"><label>Total Repaid</label><div className="detail-field-val" style={{color:'#16A34A'}}>{fmtCurrency(user.totalRepaid)}</div></div>
                <div className="detail-field"><label>NPA Loans</label><div className="detail-field-val" style={{color:user.npaLoans>0?'#DC2626':'#16A34A'}}>{user.npaLoans}</div></div>
                <div className="detail-field"><label>Monthly Income</label><div className="detail-field-val">{fmtCurrency(user.monthlyIncome)}</div></div>
                <div className="detail-field"><label>Employment</label><div className="detail-field-val" style={{textTransform:'capitalize'}}>{user.employmentType?.replace('_',' ')}</div></div>
                <div className="detail-field"><label>KYC Status</label><div className="detail-field-val"><span className={'kyc-badge kyc-'+user.kycStatus}>{user.kycStatus}</span></div></div>
              </div>
            </div>
          )}

          <div style={{display:'flex',gap:10,marginTop:8,flexWrap:'wrap'}}>
            <button style={{padding:'10px 20px',background:'var(--blue-600)',color:'#fff',border:'none',borderRadius:10,fontWeight:600,fontSize:13,cursor:'pointer',fontFamily:'var(--font)'}}>Edit Profile</button>
            {user.status==='active'
              ? <button style={{padding:'10px 20px',background:'#FEE2E2',color:'#DC2626',border:'1px solid #FECACA',borderRadius:10,fontWeight:600,fontSize:13,cursor:'pointer',fontFamily:'var(--font)'}}>Suspend User</button>
              : <button style={{padding:'10px 20px',background:'#DCFCE7',color:'#16A34A',border:'1px solid #BBF7D0',borderRadius:10,fontWeight:600,fontSize:13,cursor:'pointer',fontFamily:'var(--font)'}}>Activate User</button>
            }
            <button style={{padding:'10px 20px',background:'#fff',border:'1px solid var(--border)',borderRadius:10,fontWeight:600,fontSize:13,cursor:'pointer',fontFamily:'var(--font)',color:'var(--text-secondary)'}}>View Audit Logs</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UserDetailsPage() {
  const [activeTab,    setActiveTab]    = useState('all')
  const [search,       setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState(null)

  const tabs = [
    {id:'all',label:'All Users',count:USER_STATS.totalUsers},
    {id:'lender',label:'Lenders',count:USER_STATS.totalLenders},
    {id:'borrower',label:'Borrowers',count:USER_STATS.totalBorrowers},
    {id:'admin',label:'Admins',count:USER_STATS.totalAdmins},
  ]

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage all platform users — Admins, Lenders &amp; Borrowers</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-export"><MdFileDownload size={16}/> Export CSV</button>
          <button className="btn-primary"><MdPersonAdd size={16}/> Add User</button>
        </div>
      </div>

      <UserStatsRow />

      <div className="users-toolbar">
        <div className="users-type-tabs">
          {tabs.map(t => (
            <button key={t.id} className={'users-type-tab '+(activeTab===t.id?'active':'')}
              onClick={()=>{setActiveTab(t.id);setSearch('');setStatusFilter('all')}}>
              {t.label}<span className="tab-count">{t.count}</span>
            </button>
          ))}
        </div>
        <div className="toolbar-row">
          <div className="toolbar-search">
            <MdSearch className="toolbar-search-icon"/>
            <input placeholder={'Search '+(activeTab==='all'?'users':activeTab+'s')+'...'} value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <div className="toolbar-filter">
            <MdFilterList size={16}/>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <button className="btn-export"><MdFileDownload size={15}/> Export</button>
        </div>
      </div>

      {(activeTab==='all'||activeTab==='lender') && (
        <div>
          {activeTab==='all' && <div className="section-label-row"><span className="section-label-text">🟢 Lenders</span></div>}
          <LendersTable search={search} statusFilter={statusFilter} onView={setSelectedUser}/>
        </div>
      )}
      {(activeTab==='all'||activeTab==='borrower') && (
        <div>
          {activeTab==='all' && <div className="section-label-row"><span className="section-label-text">🔵 Borrowers</span></div>}
          <BorrowersTable search={search} statusFilter={statusFilter} onView={setSelectedUser}/>
        </div>
      )}
      {(activeTab==='all'||activeTab==='admin') && (
        <div>
          {activeTab==='all' && <div className="section-label-row"><span className="section-label-text">🟣 Admins</span></div>}
          <AdminsTable search={search} statusFilter={statusFilter} onView={setSelectedUser}/>
        </div>
      )}

      {selectedUser && <UserDetailModal user={selectedUser} onClose={()=>setSelectedUser(null)}/>}
    </div>
  )
}
