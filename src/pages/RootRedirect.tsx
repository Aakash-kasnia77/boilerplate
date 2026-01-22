import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function RootRedirect() {
  const isAuthenticated = useAuthStore((s) => s.session != null)
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
}
