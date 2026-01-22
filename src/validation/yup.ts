import { ValidationError } from 'yup'

export type YupFieldErrors<TFields extends string> = Partial<Record<TFields, string>>

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

