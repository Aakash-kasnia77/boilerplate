import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function RequireAuth() {
  const isAuthenticated = useAuthStore((s) => s.session != null)
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: { pathname: `${location.pathname}${location.search}` } }}
      />
    )
  }

  return <Outlet />
}
