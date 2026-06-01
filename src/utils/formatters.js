// src/utils/formatters.js
export const fmtCurrency = n => '₹' + new Intl.NumberFormat('en-IN').format(n)
export const fmtDate     = d => new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })
export const fmtNumber   = n => new Intl.NumberFormat('en-IN').format(n)
export const fmtPct      = n => n + '%'
