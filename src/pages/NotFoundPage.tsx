import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-dvh w-full items-start justify-center bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 sm:py-10 md:items-center md:py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          The page you are looking for does not exist.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 sm:w-auto"
            to="/"
          >
            Go home
          </Link>
          <Link
            className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10 sm:w-auto"
            to="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
