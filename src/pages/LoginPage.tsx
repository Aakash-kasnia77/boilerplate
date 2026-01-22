import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AuthError } from '../auth/localAuth'
import { Button, TextField } from '../components/ui'
import { useAuthStore } from '../store/authStore'
import type { YupFieldErrors } from '../types/validation'
import { loginSchema } from '../validation/authSchemas'
import { getYupFieldErrors } from '../validation/yup'

type LocationState = {
  from?: {
    pathname: string
  }
}

type LoginFields = 'email' | 'password'

export default function LoginPage() {
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null
  const redirectTo = state?.from?.pathname ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<YupFieldErrors<LoginFields>>(
    {},
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFieldErrors({})

    let values: { email: string; password: string }
    try {
      values = await loginSchema.validate(
        { email, password },
        { abortEarly: false },
      )
    } catch (err) {
      const nextErrors = getYupFieldErrors<LoginFields>(err)
      if (nextErrors) {
        setFieldErrors(nextErrors)
        toast.error('Please fix the highlighted fields.')
        return
      }
      toast.error('Please check your details and try again.')
      return
    }

    setIsSubmitting(true)
    try {
      await login(values.email, values.password)
      toast.success('Signed in successfully.')
      navigate(redirectTo, { replace: true })
    } catch (err) {
      toast.error(
        err instanceof AuthError
          ? err.message
          : 'Unable to sign in. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <header className="mb-6 text-left">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          Welcome back. Enter your details to continue.
        </p>
      </header>

      <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit} noValidate>
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (fieldErrors.email) {
              setFieldErrors((prev) => ({ ...prev, email: undefined }))
            }
          }}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@company.com"
          required
          error={fieldErrors.email}
        />

        <TextField
          id="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (fieldErrors.password) {
              setFieldErrors((prev) => ({ ...prev, password: undefined }))
            }
          }}
          type="password"
          autoComplete="current-password"
          required
          error={fieldErrors.password}
        />

        <Button type="submit" fullWidth className="sm:py-3" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400 sm:mt-8">
        Don't have an account?{' '}
        <Link
          className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          to="/signup"
        >
          Create one
        </Link>
      </p>
    </>
  )
}
