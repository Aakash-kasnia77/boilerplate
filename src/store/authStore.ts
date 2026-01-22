import { create } from 'zustand'
import { clearSession, readSession, type AuthSession, writeSession } from '../auth/authStorage'
import { logIn, signUp } from '../auth/localAuth'

type AuthStore = {
  session: AuthSession | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: readSession(),
  login: async (email: string, password: string) => {
    const nextSession = await logIn({ email, password })
    writeSession(nextSession)
    set({ session: nextSession })
  },
  signup: async (email: string, password: string) => {
    const nextSession = await signUp({ email, password })
    writeSession(nextSession)
    set({ session: nextSession })
  },
  logout: () => {
    clearSession()
    set({ session: null })
  },
}))

