import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearSession,
  readSession,
  type AuthSession,
  writeSession,
} from './authStorage'
import { logIn, signUp } from './localAuth'

type AuthContextValue = {
  session: AuthSession | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => readSession())

  const login = useCallback(async (email: string, password: string) => {
    const nextSession = await logIn({ email, password })
    writeSession(nextSession)
    setSession(nextSession)
  }, [])

  const signup = useCallback(async (email: string, password: string) => {
    const nextSession = await signUp({ email, password })
    writeSession(nextSession)
    setSession(nextSession)
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: session != null,
      login,
      signup,
      logout,
    }),
    [login, logout, session, signup],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

