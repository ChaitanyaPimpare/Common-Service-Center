import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Activity, LayoutDashboard, BriefcaseBusiness, CalendarDays, Users, Settings, ChevronLeft, ChevronRight, Menu, X, Bell, Search, LogOut, UserRound, ShieldCheck, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

const navGroups = [
  { label: 'WORKSPACE', items: [{ to: '/', label: 'Overview', icon: LayoutDashboard }, { to: '/services', label: 'Services', icon: BriefcaseBusiness }, { to: '/appointments', label: 'Appointments', icon: CalendarDays }] },
  { label: 'MANAGEMENT', items: [{ to: '/admin/services', label: 'Manage services', icon: Settings }, { to: '/admin/users', label: 'Users', icon: Users }] },
]
const titles = { '/': ['Overview', 'Your workspace at a glance'], '/services': ['Services', 'Browse available services'], '/appointments': ['Appointments', 'Create and track appointment requests'], '/admin/services': ['Manage services', 'Keep your service catalogue up to date'], '/admin/users': ['Users', 'User management workspace'], '/login': ['Sign in', 'Access your CSC workspace'], '/register': ['Create account', 'Join the CSC portal'] }
export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const current = titles[location.pathname] || ['Workspace', 'Common Service Center']
  const closeMobile = () => setMobileOpen(false)
  return <div className="app-shell">
    {mobileOpen && <button aria-label="Close navigation" className="mobile-scrim" onClick={closeMobile}/>}
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'sidebar-mobile-open' : ''}`}>
      <div className="brand-row"><div className="brand-mark"><Activity size={20}/></div>{!collapsed && <div className="brand-copy"><strong>csc<span>portal</span></strong><small>Service workspace</small></div>}<button className="icon-btn sidebar-collapse" aria-label="Toggle sidebar" onClick={() => setCollapsed(v => !v)}>{collapsed ? <PanelLeftOpen size={18}/> : <PanelLeftClose size={18}/>}</button><button className="icon-btn mobile-close" aria-label="Close menu" onClick={closeMobile}><X size={18}/></button></div>
      <div className="workspace-chip"><div className="workspace-avatar">C</div>{!collapsed && <div><strong>CSC Centre</strong><small>Workspace</small></div>}{!collapsed && <ChevronRight size={15} className="muted-icon"/>}</div>
      <nav className="side-nav" aria-label="Main navigation">{navGroups.map(group => <div className="nav-group" key={group.label}><p className="nav-caption">{!collapsed ? group.label : '···'}</p>{group.items.map(item => { const Icon = item.icon; return <NavLink key={item.to} to={item.to} end={item.to === '/'} title={collapsed ? item.label : undefined} onClick={closeMobile} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}><Icon size={18}/>{!collapsed && <span>{item.label}</span>}{item.to === '/appointments' && !collapsed && <span className="nav-count">4</span>}</NavLink> })}</div>)}</nav>
      <div className="sidebar-bottom"><div className="help-card">{!collapsed && <><div className="help-icon"><ShieldCheck size={17}/></div><strong>Need a hand?</strong><p>Get help with your workspace.</p><button onClick={() => window.open('mailto:support@example.com')}>Contact support <ChevronRight size={14}/></button></>}</div><button className="nav-link logout-link" onClick={() => navigate('/login')} title={collapsed ? 'Sign out' : undefined}><LogOut size={18}/>{!collapsed && <span>Sign out</span>}</button></div>
    </aside>
    <div className="main-column"><header className="topbar"><div className="topbar-left"><button className="icon-btn mobile-menu" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><div className="breadcrumb"><span>Workspace</span><ChevronRight size={14}/><strong>{current[0]}</strong></div></div><div className="topbar-actions"><label className="search-box"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search workspace" aria-label="Search workspace"/><kbd>⌘ K</kbd></label><button className="icon-btn notification-btn" aria-label="Notifications"><Bell size={18}/><i/></button><div className="profile-wrap"><button className="profile-button" onClick={() => setProfileOpen(v => !v)}><div className="profile-avatar">CP</div><div className="profile-text"><strong>Workspace Admin</strong><small>Administrator</small></div><ChevronLeft size={15} className={profileOpen ? 'rotate-down' : 'rotate-up'}/></button>{profileOpen && <div className="profile-menu"><button onClick={() => {setProfileOpen(false); navigate('/admin/users')}}><UserRound size={15}/> Account settings</button><button onClick={() => {setProfileOpen(false); navigate('/login')}}><LogOut size={15}/> Sign out</button></div>}</div></div></header>
      <main className="page-content"><div className="page-heading"><div><div className="eyebrow">CSC MANAGEMENT</div><h1>{current[0]}</h1><p>{current[1]}</p></div><div className="heading-date"><span className="status-dot"/> All systems operational</div></div>{children || <Outlet/>}</main><footer className="footer"><span>© 2026 CSC Portal</span><span>Built for simpler service management <span className="footer-heart">·</span></span></footer>
    </div>
  </div>
}
