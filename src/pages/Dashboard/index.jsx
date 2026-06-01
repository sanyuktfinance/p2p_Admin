// src/pages/Dashboard/index.jsx
// Exact match to uploaded dashboard image
// Dark navy sidebar + white cards + blue/green/purple stats
// Line chart (Users Overview) + Donut (User Distribution) + Total Users card

import React, { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from 'recharts'
import {
  MdPeople, MdPersonOutline, MdShield, MdBarChart,
  MdTrendingUp, MdKeyboardArrowDown, MdCalendarToday,
} from 'react-icons/md'
import {
  DASH_STATS, USER_OVERVIEW, USER_DISTRIBUTION,
  RECENT_TRANSACTIONS, RECENT_LOANS, PENDING_KYC,
} from '../../constants/mockData'
import { fmtCurrency, fmtDate } from '../../utils/formatters'
import './Dashboard.css'

// ── Mini Sparkline ─────────────────────────────────────
function Sparkline({ data, color }) {
  return (
    <ResponsiveContainer width="100%" height={50}>
      <AreaChart data={data} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={color} stopOpacity={0.15} />
            <stop offset="95%" stopColor={color} stopOpacity={0.0}  />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#spark-${color})`}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// Sparkline data per stat
const SPARK_DATA = {
  lenders:   [38,45,40,60,55,62,70,65,78,82,90,88].map(v=>({value:v})),
  borrowers: [65,70,80,73,88,85,90,87,93,96,94,97].map(v=>({value:v})),
  admins:    [8,9,10,10,11,12,12,13,14,14,15,15].map(v=>({value:v})),
  revenue:   [40,48,52,58,62,68,72,75,78,80,82,84].map(v=>({value:v})),
}
const SPARK_COLORS = {
  lenders:'#3B82F6', borrowers:'#22C55E', admins:'#8B5CF6', revenue:'#F97316',
}

// ── Custom Tooltip ─────────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background:'#fff', border:'1px solid #E2E8F0', borderRadius:10,
      padding:'10px 14px', boxShadow:'0 4px 12px rgba(0,0,0,0.10)',
      fontSize:12,
    }}>
      <div style={{fontWeight:700, marginBottom:6, color:'#0F172A'}}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{color:p.color, display:'flex', gap:8, alignItems:'center'}}>
          <span style={{width:8,height:8,borderRadius:'50%',background:p.color,display:'inline-block'}}/>
          <span style={{color:'#475569'}}>{p.name}:</span>
          <b>{p.value}</b>
        </div>
      ))}
    </div>
  )
}

// ── Donut Custom Label ─────────────────────────────────
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180
  const r  = innerRadius + (outerRadius - innerRadius) * 0.5
  const x  = cx + r * Math.cos(-midAngle * RADIAN)
  const y  = cy + r * Math.sin(-midAngle * RADIAN)
  const pct = (percent * 100).toFixed(1)
  if (pct < 5) return null
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={12} fontWeight={700}>
      {pct}%
    </text>
  )
}

// ── Stat Card ──────────────────────────────────────────
function StatCard({ stat, delay }) {
  const icons = {
    lender:   <MdPersonOutline />,
    borrower: <MdPeople />,
    admin:    <MdShield />,
    revenue:  <MdBarChart />,
  }
  const iconClass = `stat-card-icon-wrap stat-icon-${stat.color}`
  const valueClass = `stat-card-value stat-value-${stat.color}`

  return (
    <div className={`stat-card anim-fadeUp d-${delay}`}>
      <div className="stat-card-top">
        <div>
          <div className="stat-card-label">{stat.label}</div>
          <div className={valueClass}>
            {stat.id === 'revenue' ? `${stat.value}L` : stat.value}
          </div>
        </div>
        <div className={iconClass}>{icons[stat.icon]}</div>
      </div>
      <div className="stat-card-bottom">
        <div className="stat-card-change up">
          <MdTrendingUp className="stat-change-arrow" />
          {stat.change}%
          <span className="stat-change-text">from last week</span>
        </div>
        <div className="stat-sparkline">
          <Sparkline
            data={SPARK_DATA[stat.id]}
            color={SPARK_COLORS[stat.id]}
          />
        </div>
      </div>
    </div>
  )
}

// ── Users Overview Chart ───────────────────────────────
function UsersOverviewChart() {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">Users Overview</div>
        <div className="chart-period-select">
          This Week
          <MdKeyboardArrowDown className="chart-period-chevron" />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={USER_OVERVIEW} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E2E8F0"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 120]}
            ticks={[0, 20, 40, 60, 80, 100]}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 12, color: '#475569' }}
            iconType="circle"
            iconSize={8}
          />
          <Line
            type="monotone" dataKey="lenders" name="Lenders"
            stroke="#3B82F6" strokeWidth={2.5}
            dot={{ fill: '#3B82F6', r: 4, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone" dataKey="borrowers" name="Borrowers"
            stroke="#22C55E" strokeWidth={2.5}
            dot={{ fill: '#22C55E', r: 4, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone" dataKey="admins" name="Admins"
            stroke="#8B5CF6" strokeWidth={2.5}
            dot={{ fill: '#8B5CF6', r: 4, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── User Distribution Donut ────────────────────────────
function UserDistributionChart() {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">User Distribution</div>
      </div>
      <div className="donut-wrap">
        <div className="donut-chart-area">
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie
                data={USER_DISTRIBUTION}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {USER_DISTRIBUTION.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, n) => [v + ' users', n]}
                contentStyle={{
                  background: '#fff', border: '1px solid #E2E8F0',
                  borderRadius: 10, fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend — exact match to image */}
        <div className="donut-legend">
          {USER_DISTRIBUTION.map(d => (
            <div key={d.name} className="donut-legend-item">
              <span className="donut-legend-dot" style={{ background: d.color }} />
              <span className="donut-legend-label">{d.name}</span>
              <div>
                <div className="donut-legend-count">{d.value}</div>
                <div className="donut-legend-pct">{d.pct}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Total Users Card ───────────────────────────────────
function TotalUsersCard() {
  const total = USER_DISTRIBUTION.reduce((s, d) => s + d.value, 0)
  return (
    <div className="dash-total-users-card anim-fadeUp">
      <div className="total-users-icon">
        <MdBarChart />
      </div>
      <div className="total-users-info">
        <div className="total-users-label">Total Users</div>
        <div className="total-users-value">{total}</div>
      </div>
      <div>
        <div className="total-users-change">
          <MdTrendingUp />
          10.2%
        </div>
        <div className="total-users-change-label" style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
          from last week
        </div>
      </div>
    </div>
  )
}

// ── Main Dashboard Page ────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="dash-header">
        <div className="dash-header-left">
          <h1 className="dash-title">Dashboard</h1>
          <p className="dash-subtitle">Welcome back, Super Admin!</p>
        </div>
        <div className="dash-date-picker">
          <MdCalendarToday className="dash-date-icon" />
          May 12, 2024 - May 18, 2024
          <MdKeyboardArrowDown className="dash-date-chevron" />
        </div>
      </div>

      {/* Stat Cards — 3 columns like image */}
      <div className="dash-stats-grid">
        {DASH_STATS.slice(0, 3).map((stat, i) => (
          <StatCard key={stat.id} stat={stat} delay={i + 1} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="dash-charts-row">
        <UsersOverviewChart />
        <UserDistributionChart />
      </div>

      {/* Total Users Card — full width like image */}
      <TotalUsersCard />

    </div>
  )
}
