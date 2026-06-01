// src/pages/Users/UserAuditLogs/index.jsx
import React, { useState, useMemo } from 'react'
import { MdSearch, MdFilterList, MdFileDownload, MdSecurity, MdPerson, MdHistory, MdWarning, MdInfo, MdCheckCircle } from 'react-icons/md'
import { AUDIT_LOGS } from '../../../constants/usersMockData'
import { fmtCurrency } from '../../../utils/formatters'
import '../shared/Users.css'
import './UserAuditLogs.css'
import './UserAuditLogs.css'

const SEVERITY_CONFIG = {
  high:   { label:'High',   bg:'#FEE2E2', color:'#DC2626', icon:'🔴' },
  medium: { label:'Medium', bg:'#FEF3C7', color:'#D97706', icon:'🟡' },
  low:    { label:'Low',    bg:'#DCFCE7', color:'#16A34A', icon:'🟢' },
}

const USER_TYPE_CONFIG = {
  admin:    { bg:'#EDE9FE', color:'#7C3AED', label:'Admin'    },
  lender:   { bg:'#DBEAFE', color:'#2563EB', label:'Lender'   },
  borrower: { bg:'#DCFCE7', color:'#16A34A', label:'Borrower' },
}

export default function UserAuditLogsPage() {
  const [search,       setSearch]       = useState('')
  const [severity,     setSeverity]     = useState('all')
  const [userType,     setUserType]     = useState('all')
  const [page,         setPage]         = useState(1)
  const PER = 8

  const filtered = useMemo(() => AUDIT_LOGS.filter(log => {
    const q = search.toLowerCase()
    const matchSearch = log.userName.toLowerCase().includes(q) || log.action.toLowerCase().includes(q) || log.id.toLowerCase().includes(q) || log.details.toLowerCase().includes(q)
    const matchSeverity = severity === 'all' || log.severity === severity
    const matchType     = userType === 'all'  || log.userType === userType
    return matchSearch && matchSeverity && matchType
  }), [search, severity, userType])

  const total = filtered.length
  const pages = Math.ceil(total / PER)
  const paged = filtered.slice((page - 1) * PER, page * PER)

  const stats = [
    { label:'Total Logs',     val: AUDIT_LOGS.length,                                       icon:'📋', cls:'usc-blue'   },
    { label:'High Severity',  val: AUDIT_LOGS.filter(l=>l.severity==='high').length,         icon:'🔴', cls:'usc-red'    },
    { label:'Medium',         val: AUDIT_LOGS.filter(l=>l.severity==='medium').length,       icon:'🟡', cls:'usc-orange' },
    { label:'Low',            val: AUDIT_LOGS.filter(l=>l.severity==='low').length,          icon:'🟢', cls:'usc-green'  },
    { label:'Admin Actions',  val: AUDIT_LOGS.filter(l=>l.userType==='admin').length,        icon:'🛡️', cls:'usc-purple' },
    { label:'User Actions',   val: AUDIT_LOGS.filter(l=>l.userType!=='admin').length,        icon:'👥', cls:'usc-blue'   },
  ]

  return (
    <div className="users-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">User Audit Logs</h1>
          <p className="page-subtitle">Complete activity trail — all user and admin actions across the platform</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-export"><MdFileDownload size={16}/> Export Logs</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:14 }}>
        {stats.map((s,i) => (
          <div key={i} className="user-stat-card">
            <div className={`user-stat-icon ${s.cls}`} style={{fontSize:22}}>{s.icon}</div>
            <div><div className="user-stat-val">{s.val}</div><div className="user-stat-label">{s.label}</div></div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="users-toolbar">
        <div className="toolbar-row">
          <div className="toolbar-search" style={{flex:1}}>
            <MdSearch className="toolbar-search-icon"/>
            <input placeholder="Search by user, action, details..." value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}}/>
          </div>
          <div className="toolbar-filter">
            <MdWarning size={15}/>
            <select value={severity} onChange={e=>{setSeverity(e.target.value);setPage(1)}}>
              <option value="all">All Severity</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="toolbar-filter">
            <MdPerson size={15}/>
            <select value={userType} onChange={e=>{setUserType(e.target.value);setPage(1)}}>
              <option value="all">All User Types</option>
              <option value="admin">Admin</option>
              <option value="lender">Lender</option>
              <option value="borrower">Borrower</option>
            </select>
          </div>
          <button className="btn-export"><MdFileDownload size={15}/> Export</button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="users-table-card">
        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Action</th>
                <th>Details</th>
                <th>IP Address</th>
                <th>Severity</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={8}>
                  <div className="empty-state">
                    <div className="empty-state-icon"><MdHistory style={{fontSize:48,color:'#CBD5E1'}}/></div>
                    <div className="empty-state-title">No audit logs found</div>
                    <div className="empty-state-sub">Try adjusting your search or filters</div>
                  </div>
                </td></tr>
              ) : paged.map(log => {
                const sev  = SEVERITY_CONFIG[log.severity]
                const utyp = USER_TYPE_CONFIG[log.userType]
                return (
                  <tr key={log.id}>
                    <td>
                      <span style={{fontFamily:'monospace',fontSize:11,background:'#F1F5F9',padding:'2px 6px',borderRadius:6,color:'#475569'}}>
                        {log.id}
                      </span>
                    </td>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar avatar-blue" style={{width:32,height:32,fontSize:11}}>
                          {log.userName.split(' ').map(w=>w[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <div className="user-name" style={{fontSize:13}}>{log.userName}</div>
                          <div className="user-id">{log.userId}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        background: utyp.bg, color: utyp.color,
                        borderRadius:999, padding:'3px 10px',
                        fontSize:11, fontWeight:700
                      }}>
                        {utyp.label}
                      </span>
                    </td>
                    <td>
                      <div className="audit-action-cell">
                        <span className="audit-action-label">{log.action}</span>
                        <span className="audit-target">{log.target}</span>
                      </div>
                    </td>
                    <td>
                      <div className="audit-details" title={log.details}>{log.details}</div>
                    </td>
                    <td>
                      <span style={{fontFamily:'monospace',fontSize:11,color:'var(--text-muted)'}}>{log.ip}</span>
                    </td>
                    <td>
                      <span style={{
                        background: sev.bg, color: sev.color,
                        borderRadius:999, padding:'3px 10px',
                        fontSize:11, fontWeight:700,
                        display:'inline-flex', alignItems:'center', gap:4
                      }}>
                        {sev.icon} {sev.label}
                      </span>
                    </td>
                    <td>
                      <div style={{fontSize:12,color:'var(--text-muted)',whiteSpace:'nowrap'}}>
                        {log.timestamp.split(' ')[0]}
                        <div style={{fontSize:11,marginTop:1}}>{log.timestamp.split(' ')[1]}</div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span className="table-info">
            Showing {Math.min((page-1)*PER+1, total)}–{Math.min(page*PER, total)} of {total} logs
          </span>
          <div className="pagination">
            <button className="page-btn" onClick={()=>setPage(p=>p-1)} disabled={page===1}>‹</button>
            {Array.from({length:pages},(_,i)=>i+1).map(p=>(
              <button key={p} className={`page-btn ${p===page?'active':''}`} onClick={()=>setPage(p)}>{p}</button>
            ))}
            <button className="page-btn" onClick={()=>setPage(p=>p+1)} disabled={page===pages||pages===0}>›</button>
          </div>
        </div>
      </div>
    </div>
  )
}
