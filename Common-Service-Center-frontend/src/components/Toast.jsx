import { CheckCircle2, XCircle, X } from 'lucide-react'
export default function Toast({ toast, onClose }) {
  if (!toast) return null
  const Icon = toast.type === 'error' ? XCircle : CheckCircle2
  return <div role="status" className={`toast ${toast.type === 'error' ? 'toast-error' : ''}`}><Icon size={18}/><span>{toast.message}</span><button aria-label="Dismiss notification" onClick={onClose}><X size={16}/></button></div>
}
