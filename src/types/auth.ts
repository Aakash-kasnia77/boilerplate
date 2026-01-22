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

export type AuthErrorCode =
  | 'INVALID_EMAIL'
  | 'WEAK_PASSWORD'
  | 'EMAIL_IN_USE'
  | 'INVALID_CREDENTIALS'

export type AuthCredentials = {
  email: string
  password: string
}

