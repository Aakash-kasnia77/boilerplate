import { createSalt, createSessionToken, hashPassword } from './authCrypto'
import { readUsers, writeUsers } from './authStorage'
import type { AuthCredentials, AuthErrorCode, AuthSession, StoredUser } from '../types/auth'

export class AuthError extends Error {
  readonly code: AuthErrorCode

  constructor(code: AuthErrorCode, message: string) {
    super(message)
    this.code = code
  }
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function assertStrongPassword(password: string): void {
  if (password.length < 8) {
    throw new AuthError('WEAK_PASSWORD', 'Password must be at least 8 characters.')
  }
}

function findUser(users: StoredUser[], email: string): StoredUser | undefined {
  const normalized = normalizeEmail(email)
  return users.find((u) => normalizeEmail(u.email) === normalized)
}

export async function signUp({ email, password }: AuthCredentials): Promise<AuthSession> {
  const normalizedEmail = normalizeEmail(email)
  if (!isValidEmail(normalizedEmail)) {
    throw new AuthError('INVALID_EMAIL', 'Enter a valid email address.')
  }
  assertStrongPassword(password)

  const users = readUsers()
  if (findUser(users, normalizedEmail)) {
    throw new AuthError('EMAIL_IN_USE', 'An account with this email already exists.')
  }

  const salt = createSalt()
  const passwordHash = await hashPassword(password, salt)
  const createdAt = new Date().toISOString()

  const nextUsers: StoredUser[] = [
    ...users,
    { email: normalizedEmail, passwordHash, salt, createdAt },
  ]
  writeUsers(nextUsers)

  return {
    token: createSessionToken(),
    user: { email: normalizedEmail },
  }
}

export async function logIn({ email, password }: AuthCredentials): Promise<AuthSession> {
  const normalizedEmail = normalizeEmail(email)
  if (!isValidEmail(normalizedEmail)) {
    throw new AuthError('INVALID_EMAIL', 'Enter a valid email address.')
  }

  const users = readUsers()
  const user = findUser(users, normalizedEmail)
  if (!user) {
    throw new AuthError('INVALID_CREDENTIALS', 'Email or password is incorrect.')
  }

  const passwordHash = await hashPassword(password, user.salt)
  if (passwordHash !== user.passwordHash) {
    throw new AuthError('INVALID_CREDENTIALS', 'Email or password is incorrect.')
  }

  return {
    token: createSessionToken(),
    user: { email: normalizedEmail },
  }
}
