import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AuthError } from '../auth/localAuth'
import { Button, TextField } from '../components/ui'
import { useAuthStore } from '../store/authStore'
import type { YupFieldErrors } from '../types/validation'
import { signupSchema } from '../validation/authSchemas'
import { getYupFieldErrors } from '../validation/yup'

type SignupFields = 'email' | 'password' | 'confirmPassword'

export default function SignupPage() {
  const signup = useAuthStore((s) => s.signup)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<YupFieldErrors<SignupFields>>(
    {},
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFieldErrors({})

    let values: { email: string; password: string; confirmPassword: string }
    try {
      values = await signupSchema.validate(
        { email, password, confirmPassword },
        { abortEarly: false },
      )
    } catch (err) {
      const nextErrors = getYupFieldErrors<SignupFields>(err)
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
      await signup(values.email, values.password)
      toast.success('Account created successfully.')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      toast.error(
        err instanceof AuthError
          ? err.message
          : 'Unable to create account. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <header className="mb-6 text-left">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Create account
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          Use a work email and a strong password (8+ characters).
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
          autoComplete="new-password"
          required
          minLength={8}
          error={fieldErrors.password}
        />

        <TextField
          id="confirmPassword"
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            if (fieldErrors.confirmPassword) {
              setFieldErrors((prev) => ({
                ...prev,
                confirmPassword: undefined,
              }))
            }
          }}
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          error={fieldErrors.confirmPassword}
        />

        <Button type="submit" fullWidth className="sm:py-3" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400 sm:mt-8">
        Already have an account?{' '}
        <Link
          className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          to="/login"
        >
          Sign in
        </Link>
      </p>
    </>
  )
}
