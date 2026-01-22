import { ValidationError } from 'yup'
import type { YupFieldErrors } from '../types/validation'

export function getYupFieldErrors<TFields extends string>(
  err: unknown,
): YupFieldErrors<TFields> | null {
  if (!(err instanceof ValidationError)) return null

  const fieldErrors: YupFieldErrors<TFields> = {}
  for (const issue of err.inner) {
    const path = issue.path as TFields | undefined
    if (!path) continue
    if (fieldErrors[path]) continue
    fieldErrors[path] = issue.message
  }

  if (!Object.keys(fieldErrors).length) return null
  return fieldErrors
}
