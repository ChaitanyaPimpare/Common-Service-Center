import { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Services from './pages/Services.jsx'
import Appointments from './pages/Appointments.jsx'
import Auth from './pages/Auth.jsx'
import UsersPage from './pages/Users.jsx'
import Toast from './components/Toast.jsx'

export default function App(){const [toast,setToast]=useState(null);const location=useLocation();const notify=message=>{setToast(message);window.setTimeout(()=>setToast(null),3500)};const auth=location.pathname==='/login'||location.pathname==='/register';return <>{auth?<Routes><Route path="/login" element={<Auth mode="login" onToast={notify}/>}/><Route path="/register" element={<Auth mode="register" onToast={notify}/>}/></Routes>:<AppLayout><Routes><Route path="/" element={<Dashboard/>}/><Route path="/services" element={<Services/>}/><Route path="/appointments" element={<Appointments onToast={notify}/>}/><Route path="/admin/services" element={<Services admin onToast={notify}/>}/><Route path="/admin/services/new" element={<Navigate to="/admin/services" replace/>}/><Route path="/admin/users" element={<UsersPage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></AppLayout>}<Toast toast={toast} onClose={()=>setToast(null)}/></>}
