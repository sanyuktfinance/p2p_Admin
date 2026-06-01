import { Link } from 'react-router-dom'
export default function Unauthorized() {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#F8FAFC',gap:16,fontFamily:'Inter,sans-serif'}}>
      <div style={{fontSize:80,fontWeight:800,color:'#FEE2E2',color:'#FCA5A5'}}>401</div>
      <h2 style={{fontSize:24,fontWeight:700,color:'#0F172A'}}>Unauthorized Access</h2>
      <p style={{color:'#94A3B8',fontSize:14}}>You do not have permission to access this page.</p>
      <Link to="/dashboard" style={{padding:'10px 24px',background:'#2563EB',color:'#fff',borderRadius:10,fontWeight:600,fontSize:14,textDecoration:'none'}}>Back to Dashboard</Link>
    </div>
  )
}
