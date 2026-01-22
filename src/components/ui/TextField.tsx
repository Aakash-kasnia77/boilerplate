import type { InputHTMLAttributes } from 'react'

function cx(...parts: Array<string | undefined | null | false>): string {
  return parts.filter(Boolean).join(' ')
}

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  id: string
  label: string
  error?: string
  className?: string
}

export function TextField({ id, label, error, className, ...props }: TextFieldProps) {
  const inputClassName = cx(
    'mt-2 w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 dark:bg-white/5 dark:text-slate-100 sm:px-4 sm:py-3',
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/40'
      : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-white/10',
    className,
  )

  return (
    <div>
      <label
        className="text-sm font-medium text-slate-700 dark:text-slate-200"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className={inputClassName}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}

