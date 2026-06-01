import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#F8FAFC',gap:16,fontFamily:'Inter,sans-serif'}}>
      <div style={{fontSize:80,fontWeight:800,color:'#E2E8F0'}}>404</div>
      <h2 style={{fontSize:24,fontWeight:700,color:'#0F172A'}}>Page Not Found</h2>
      <p style={{color:'#94A3B8',fontSize:14}}>The page you are looking for does not exist.</p>
      <Link to="/dashboard" style={{padding:'10px 24px',background:'#2563EB',color:'#fff',borderRadius:10,fontWeight:600,fontSize:14,textDecoration:'none'}}>Go to Dashboard</Link>
    </div>
  )
}
