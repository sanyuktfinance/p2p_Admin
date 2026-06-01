// src/components/layout/Sidebar/Sidebar.jsx
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  MdDashboard,
  MdPeople,
  MdPayment,
  MdAccountBalance,
  MdBarChart,
  MdAdminPanelSettings,
  MdSettings,
  MdPersonOutline,
  MdHistory,
  MdSwapHoriz,
  MdPending,
  MdCancel,
  MdRefresh,
  MdAccountBalanceWallet,
  MdDescription,
  MdCheckCircle,
  MdHighlightOff,
  MdTrendingUp,
  MdDone,
  MdCalendarToday,
  MdTrackChanges,
  MdMonetizationOn,
  MdShowChart,
  MdReceipt,
  MdArticle,
  MdListAlt,
  MdManageAccounts,
  MdGridView,
  MdLock,
  MdMonitor,
  MdGroupAdd,
  MdPersonAdd,
  MdTune,
  MdSecurity,
  MdNotifications,
  MdCode,
  MdKeyboardArrowDown,
  MdLogout,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/slices/authSlice'
import { SIDEBAR_MENU } from '../../../config/sidebar.js'
import { ROLES } from '../../../config/roles.js'
import { initials } from '../../../utils/helpers.js'
import './Sidebar.css'

// Map icon string → component
const ICON_MAP = {
  MdDashboard,
  MdPeople,
  MdPayment,
  MdAccountBalance,
  MdBarChart,
  MdAdminPanelSettings,
  MdSettings,
  MdPersonOutline,
  MdHistory,
  MdSwapHoriz,
  MdPending,
  MdCancel,
  MdRefresh,
  MdAccountBalanceWallet,
  MdDescription,
  MdCheckCircle,
  MdHighlightOff,
  MdTrendingUp,
  MdDone,
  MdCalendarToday,
  MdTrackChanges,
  MdMonetizationOn,
  MdShowChart,
  MdReceipt,
  MdArticle,
  MdListAlt,
  MdManageAccounts,
  MdGridView,
  MdLock,
  MdMonitor,
  MdGroupAdd,
  MdPersonAdd,
  MdTune,
  MdSecurity,
  MdNotifications,
  MdCode,
}

const Icon = ({ name, ...props }) => {
  const C = ICON_MAP[name]
  return C ? <C {...props} /> : null
}

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onMobileClose }) {
  const [openMenus, setOpenMenus] = useState({ users: true }) // users open by default like image
  const location  = useLocation()
  const dispatch  = useDispatch()
  const { role, user } = useSelector(s => s.auth)

  // Mock user for demo
  const currentUser = user || { name: 'Super Admin', role: 'super_admin' }
  const currentRole = role || ROLES.SUPER_ADMIN

  const toggleMenu = (id) => {
    if (collapsed) return
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Filter menu by role
  const visibleMenu = SIDEBAR_MENU.filter(item => {
    if (!item.allowedRoles) return true
    return item.allowedRoles.includes(currentRole)
  })

  const isChildActive = (children) =>
    children?.some(c => location.pathname === c.path)

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`sidebar-mobile-overlay ${mobileOpen ? 'show' : ''}`}
        onClick={onMobileClose}
      />

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>

        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <MdPeople size={18} />
          </div>
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-name">Master Admin</div>
            <div className="sidebar-brand-sub">Admin Panel</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {visibleMenu.map((item, idx) => {
            const hasChildren = item.children?.length > 0
            const isOpen      = openMenus[item.id]
            const isActive    = !hasChildren
              ? location.pathname === item.path
              : isChildActive(item.children)

            return (
              <div key={item.id} className="nav-item">
                {!hasChildren ? (
                  /* Single link */
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="nav-link-icon"><Icon name={item.icon} /></span>
                    <span className="nav-link-label">{item.label}</span>
                    <span className="nav-tooltip">{item.label}</span>
                  </NavLink>
                ) : (
                  /* Dropdown parent */
                  <>
                    <div
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => toggleMenu(item.id)}
                    >
                      <span className="nav-link-icon"><Icon name={item.icon} /></span>
                      <span className="nav-link-label">{item.label}</span>
                      <MdKeyboardArrowDown
                        className={`nav-link-chevron ${isOpen ? 'open' : ''}`}
                      />
                      <span className="nav-tooltip">{item.label}</span>
                    </div>

                    {/* Children */}
                    <div className={`nav-children ${isOpen ? 'open' : ''}`}>
                      {item.children
                        .filter(c => {
                          if (c.superOnly && currentRole !== ROLES.SUPER_ADMIN) return false
                          return true
                        })
                        .map(child => (
                          <NavLink
                            key={child.id}
                            to={child.path}
                            className={({ isActive }) =>
                              `nav-child-link ${isActive ? 'active' : ''}`
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))
                      }
                    </div>
                  </>
                )}

                {/* Divider after certain items */}
                {(item.id === 'dashboard') && <div className="nav-divider" />}
              </div>
            )
          })}
        </nav>

        {/* Footer — Profile */}
        <div className="sidebar-footer">
          <div className="sidebar-profile">
            <div className="sidebar-avatar">
              {initials(currentUser.name)}
            </div>
            <div className="sidebar-profile-info">
              <div className="sidebar-profile-name">{currentUser.name}</div>
              <div className="sidebar-profile-role">Administrator</div>
            </div>
            <MdKeyboardArrowDown className="sidebar-profile-chevron" />
          </div>
        </div>

      </aside>
    </>
  )
}
