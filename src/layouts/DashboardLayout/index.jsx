// src/layouts/DashboardLayout/index.jsx
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar/Sidebar'
import Topbar  from '../../components/layout/Topbar/Topbar'
import './DashboardLayout.css'

export default function DashboardLayout() {
  const [collapsed,  setCollapsed]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="admin-root">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(p => !p)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={`admin-main ${collapsed ? 'sidebar-collapsed' : 'sidebar-open'}`}>
        <Topbar
          onMobileMenuClick={() => setMobileOpen(true)}
          onCollapseToggle={() => setCollapsed(p => !p)}
        />
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
