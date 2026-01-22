import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthError } from '../auth/localAuth'
import { useAuthStore } from '../store/authStore'
import { loginSchema } from '../validation/authSchemas'
import { getYupFieldErrors, type YupFieldErrors } from '../validation/yup'
import toast from 'react-hot-toast'

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
        <div>
          <label
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            className={`mt-2 w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 dark:bg-white/5 dark:text-slate-100 sm:px-4 sm:py-3 ${
              fieldErrors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-white/10'
            }`}
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
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          />
          {fieldErrors.email ? (
            <p
              id="email-error"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            className={`mt-2 w-full rounded-lg border bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 dark:bg-white/5 dark:text-slate-100 ${
              fieldErrors.password
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-white/10'
            }`}
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
            aria-invalid={fieldErrors.password ? true : undefined}
            aria-describedby={
              fieldErrors.password ? 'password-error' : undefined
            }
          />
          {fieldErrors.password ? (
            <p
              id="password-error"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {fieldErrors.password}
            </p>
          ) : null}
        </div>

        <button
          className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
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
