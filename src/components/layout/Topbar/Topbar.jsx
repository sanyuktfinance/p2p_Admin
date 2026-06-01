// src/components/layout/Topbar/Topbar.jsx
import React from 'react'
import { MdMenu, MdSearch, MdNotifications, MdCalendarToday, MdKeyboardArrowDown } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { initials } from '../../../utils/helpers'
import './Topbar.css'

export default function Topbar({ onMobileMenuClick, onCollapseToggle }) {
  const { user, role } = useSelector(s => s.auth)
  const currentUser = user || { name: 'Master Admin' }

  return (
    <header className="topbar">
      {/* Left */}
      <div className="topbar-left">
        {/* Mobile menu */}
        <button className="topbar-menu-btn" onClick={onMobileMenuClick}>
          <MdMenu />
        </button>
        {/* Desktop collapse toggle */}
        <button className="topbar-hamburger hide-mobile" onClick={onCollapseToggle}>
          <MdMenu />
        </button>
        {/* Search */}
        <div className="topbar-search">
          <MdSearch className="topbar-search-icon" />
          <input placeholder="Search..." />
        </div>
      </div>

      {/* Right */}
      <div className="topbar-right">
        {/* Date Range */}
        <div className="topbar-date">
          <MdCalendarToday className="topbar-date-icon" />
          <span>May 12, 2024 - May 18, 2024</span>
          <MdKeyboardArrowDown className="topbar-date-chevron" />
        </div>

        {/* Notifications */}
        <button className="topbar-icon-btn">
          <MdNotifications />
          <span className="topbar-notif-dot" />
        </button>

        {/* Profile */}
        <div className="topbar-profile">
          <div className="topbar-profile-avatar">{initials(currentUser.name)}</div>
          <span className="topbar-profile-name">{currentUser.name}</span>
          <MdKeyboardArrowDown className="topbar-profile-chevron" />
        </div>
      </div>
    </header>
  )
}
