export type AuthUser = {
  email: string
}

export type AuthSession = {
  token: string
  user: AuthUser
}

export type StoredUser = {
  email: string
  passwordHash: string
  salt: string
  createdAt: string
}

const SESSION_KEY = 'boilerplate.session.v1'
const USERS_KEY = 'boilerplate.users.v1'

function getStorage(): Storage | null {
  try {
    if (typeof window === 'undefined') return null
    return window.localStorage
  } catch {
    return null
  }
}

function readJson<T>(key: string): T | null {
  const storage = getStorage()
  if (!storage) return null

  const raw = storage.getItem(key)
  if (!raw) return null

  try {
    return JSON.parse(raw) as T
  } catch {
    storage.removeItem(key)
    return null
  }
}

function writeJson<T>(key: string, value: T): void {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(key, JSON.stringify(value))
}

export function readSession(): AuthSession | null {
  return readJson<AuthSession>(SESSION_KEY)
}

export function writeSession(session: AuthSession): void {
  writeJson(SESSION_KEY, session)
}

export function clearSession(): void {
  const storage = getStorage()
  storage?.removeItem(SESSION_KEY)
}

export function readUsers(): StoredUser[] {
  return readJson<StoredUser[]>(USERS_KEY) ?? []
}

export function writeUsers(users: StoredUser[]): void {
  writeJson(USERS_KEY, users)
}

