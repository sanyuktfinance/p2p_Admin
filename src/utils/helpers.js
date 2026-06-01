// src/utils/helpers.js
export const truncate  = (str, n=30) => str.length > n ? str.slice(0, n) + '…' : str
export const initials  = name => name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)
export const sleep     = ms  => new Promise(r => setTimeout(r, ms))
