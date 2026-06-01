// src/utils/validators.js
export const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
export const isPhone = v => /^[6-9]\d{9}$/.test(v)
export const isPAN   = v => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v)
