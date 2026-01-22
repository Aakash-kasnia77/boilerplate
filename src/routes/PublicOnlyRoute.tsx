import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function PublicOnlyRoute() {
  const isAuthenticated = useAuthStore((s) => s.session != null)
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <Outlet />
}
