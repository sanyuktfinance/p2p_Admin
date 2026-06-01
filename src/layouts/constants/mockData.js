// src/constants/mockData.js

// ── Dashboard Stats ──────────────────────────
export const DASH_STATS = [
  { id:'lenders',   label:'Total Lender',   value:150, change:12.5, trend:'up', color:'blue',   icon:'lender'   },
  { id:'borrowers', label:'Total Borrower', value:320, change:8.7,  trend:'up', color:'green',  icon:'borrower' },
  { id:'admins',    label:'Total Admins',   value:15,  change:7.1,  trend:'up', color:'purple', icon:'admin'    },
  { id:'revenue',   label:'Revenue (₹L)',   value:84.2,change:15.3, trend:'up', color:'orange', icon:'revenue'  },
]

// ── User Overview Chart (last 7 days) ─────────
export const USER_OVERVIEW = [
  { date:'May 12', lenders:40, borrowers:68, admins:1 },
  { date:'May 13', lenders:60, borrowers:80, admins:2 },
  { date:'May 14', lenders:55, borrowers:73, admins:1 },
  { date:'May 15', lenders:65, borrowers:88, admins:3 },
  { date:'May 16', lenders:80, borrowers:92, admins:2 },
  { date:'May 17', lenders:72, borrowers:87, admins:2 },
  { date:'May 18', lenders:90, borrowers:97, admins:5 },
]

// ── User Distribution ─────────────────────────
export const USER_DISTRIBUTION = [
  { name:'Lenders',   value:150, pct:28.8, color:'#3B82F6' },
  { name:'Borrowers', value:320, pct:61.3, color:'#22C55E' },
  { name:'Admins',    value:15,  pct:9.9,  color:'#8B5CF6' },
]

// ── Revenue Chart ─────────────────────────────
export const REVENUE_DATA = [
  { month:'Jan', revenue:42, expenses:18 },
  { month:'Feb', revenue:55, expenses:22 },
  { month:'Mar', revenue:48, expenses:19 },
  { month:'Apr', revenue:70, expenses:28 },
  { month:'May', revenue:84, expenses:31 },
]

// ── Recent Transactions ───────────────────────
export const RECENT_TRANSACTIONS = [
  { id:'TXN-001', user:'Rahul Sharma',  type:'Wallet Add',   amount:25000,  status:'success', date:'2024-05-18' },
  { id:'TXN-002', user:'Priya Nair',    type:'EMI Credit',   amount:1240,   status:'success', date:'2024-05-18' },
  { id:'TXN-003', user:'Ankit Verma',   type:'Withdrawal',   amount:10000,  status:'pending', date:'2024-05-17' },
  { id:'TXN-004', user:'Sunita Mehta',  type:'Wallet Add',   amount:50000,  status:'success', date:'2024-05-17' },
  { id:'TXN-005', user:'Vikram Singh',  type:'EMI Credit',   amount:2100,   status:'failed',  date:'2024-05-16' },
  { id:'TXN-006', user:'Meera Joshi',   type:'Refund',       amount:5000,   status:'pending', date:'2024-05-16' },
]

// ── Recent Loan Requests ──────────────────────
export const RECENT_LOANS = [
  { id:'LON-001', borrower:'Ravi Kumar',    amount:50000,  tenure:'12 mo', status:'pending',  score:742, date:'2024-05-18' },
  { id:'LON-002', borrower:'Anjali Singh',  amount:25000,  tenure:'6 mo',  status:'approved', score:780, date:'2024-05-17' },
  { id:'LON-003', borrower:'Deepak Patel',  amount:100000, tenure:'24 mo', status:'rejected', score:620, date:'2024-05-17' },
  { id:'LON-004', borrower:'Kavita Rao',    amount:30000,  tenure:'9 mo',  status:'pending',  score:710, date:'2024-05-16' },
  { id:'LON-005', borrower:'Suresh Gupta',  amount:75000,  tenure:'18 mo', status:'approved', score:765, date:'2024-05-16' },
]

// ── Pending KYC ───────────────────────────────
export const PENDING_KYC = [
  { id:'KYC-001', name:'Manish Verma',   type:'Lender',   step:'Aadhaar', submitted:'2024-05-18' },
  { id:'KYC-002', name:'Neha Sharma',    type:'Borrower', step:'PAN',     submitted:'2024-05-17' },
  { id:'KYC-003', name:'Ajay Tiwari',    type:'Lender',   step:'Bank',    submitted:'2024-05-17' },
  { id:'KYC-004', name:'Pooja Mishra',   type:'Borrower', step:'eSign',   submitted:'2024-05-16' },
]

// ── Admin List ────────────────────────────────
export const ADMIN_LIST = [
  { id:1, name:'Super Admin MUSKAN',    email:'super@lenden.com', role:'super_admin',     status:'active',   lastLogin:'2024-05-18 09:23' },
  { id:2, name:'Arun Kumar',     email:'arun@lenden.com',  role:'admin',           status:'active',   lastLogin:'2024-05-18 08:45' },
  { id:3, name:'Finance Head',   email:'fin@lenden.com',   role:'finance_manager', status:'active',   lastLogin:'2024-05-17 17:30' },
  { id:4, name:'Loan Manager',   email:'loan@lenden.com',  role:'loan_manager',    status:'active',   lastLogin:'2024-05-17 14:12' },
  { id:5, name:'Support Lead',   email:'supp@lenden.com',  role:'support',         status:'inactive', lastLogin:'2024-05-15 11:00' },
]
