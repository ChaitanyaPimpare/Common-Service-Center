import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Search, Plus, Landmark, FileBadge, ReceiptText, Smartphone, GraduationCap, HeartPulse, BadgeCheck, WalletCards, ShieldCheck, Plane, FileText, LoaderCircle } from 'lucide-react'
import { apiRequest, money } from '../lib/api'
const seed = [
 {id:1,name:'PAN Card Assistance',description:'Support with new PAN applications, corrections and status checks.',price:150,category:'Documentation',icon:FileBadge,color:'violet'},
 {id:2,name:'Income Certificate',description:'Guidance for income certificate applications and required documents.',price:200,category:'Certificates',icon:Landmark,color:'blue'},
 {id:3,name:'Aadhaar Update Help',description:'Assistance with demographic updates and appointment preparation.',price:100,category:'Documentation',icon:BadgeCheck,color:'green'},
 {id:4,name:'Bill Payment Support',description:'Convenient support for electricity, water and utility bill payments.',price:50,category:'Payments',icon:ReceiptText,color:'amber'},
 {id:5,name:'Mobile Recharge',description:'Prepaid and DTH recharge assistance for major providers.',price:30,category:'Payments',icon:Smartphone,color:'pink'},
 {id:6,name:'Government Scheme Help',description:'Understand eligibility and prepare documents for public schemes.',price:100,category:'Citizen services',icon:ShieldCheck,color:'blue'},
 {id:7,name:'Education Form Support',description:'Application and form-filling support for education-related services.',price:120,category:'Education',icon:GraduationCap,color:'violet'},
 {id:8,name:'Health Scheme Assistance',description:'Help navigating health scheme registrations and applications.',price:100,category:'Citizen services',icon:HeartPulse,color:'green'},
 {id:9,name:'Banking Service Guidance',description:'Guidance for basic banking and financial inclusion services.',price:100,category:'Finance',icon:WalletCards,color:'amber'},
 {id:10,name:'Travel Document Help',description:'Assistance preparing forms and documentation for travel services.',price:250,category:'Documentation',icon:Plane,color:'pink'},
 {id:11,name:'Residence Certificate',description:'Application guidance for residence and domicile certificates.',price:200,category:'Certificates',icon:FileText,color:'blue'},
 {id:12,name:'Other Citizen Services',description:'Personalized guidance for common digital citizen service requests.',price:100,category:'Citizen services',icon:Landmark,color:'violet'},
]
export default function Services({admin=false,onToast}) {
 const [services,setServices]=useState(seed),[query,setQuery]=useState(''),[loading,setLoading]=useState(false),[error,setError]=useState('')
 useEffect(()=>{let live=true;setLoading(true);apiRequest('/api/services').then(data=>{if(live&&Array.isArray(data)&&data.length)setServices(data.map((s,i)=>({...s,icon:seed[i%seed.length].icon,color:seed[i%seed.length].color}))) }).catch(()=>{}).finally(()=>live&&setLoading(false));return()=>{live=false}},[])
 const filtered=services.filter(s=>`${s.name} ${s.description} ${s.category||''}`.toLowerCase().includes(query.toLowerCase()))
 const remove=async id=>{try{await apiRequest(`/admin/services/${id}`,{method:'DELETE'});setServices(old=>old.filter(s=>s.id!==id));onToast?.({message:'Service deleted successfully'})}catch(e){setError('Could not delete this service. Check that the Spring Boot backend is running and your account has admin access.')}}
 return <div className="content-stack"><div className="toolbar-card"><label className="large-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search services by name or category..."/></label><div className="toolbar-meta">{loading&&<LoaderCircle size={15} className="spin"/>}<span>{filtered.length} services available</span></div>{admin&&<Link className="btn btn-primary" to="/admin/services/new"><Plus size={16}/> Add service</Link>}</div>{error&&<div className="inline-error">{error}</div>}<div className="service-grid">{filtered.map((s,i)=>{const Icon=s.icon||seed[i%seed.length].icon;return <article className="service-card" key={s.id??s.name}><div className="service-card-top"><span className={`service-icon ${s.color||'blue'}`}><Icon size={20}/></span><span className="service-category">{s.category||'Citizen services'}</span>{admin&&<button className="row-menu" onClick={()=>remove(s.id)} aria-label={`Delete ${s.name}`}>×</button>}</div><h3>{s.name}</h3><p>{s.description}</p><div className="service-card-bottom"><div><small>Service fee</small><strong>{money(s.price)}</strong></div><Link to="/appointments" className="service-open" aria-label={`Book ${s.name}`}><ArrowUpRight size={17}/></Link></div></article>})}</div>{!filtered.length&&<div className="panel empty-state">No services found. Try another search term.</div>}</div>
}
