import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function RootRedirect() {
  const { isAuthenticated } = useAuth()
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
}

