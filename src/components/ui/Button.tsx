import type { ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'
export type ButtonSize = 'sm' | 'md'

type ButtonStyleProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
}

function cx(...parts: Array<string | undefined | null | false>): string {
  return parts.filter(Boolean).join(' ')
}

export function buttonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: ButtonStyleProps): string {
  const base =
    'inline-flex items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950'

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500',
    secondary:
      'border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10',
    danger: 'bg-red-600 text-white shadow-sm hover:bg-red-500',
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-2 text-sm font-medium',
    md: 'px-4 py-2.5 text-sm font-semibold',
  }

  return cx(base, variants[variant], sizes[size], fullWidth && 'w-full', className)
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps

export function Button({
  variant,
  size,
  fullWidth,
  className,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...props}
    />
  )
}

export type ButtonLinkProps = Omit<LinkProps, 'className'> & ButtonStyleProps

export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...props}
    />
  )
}

