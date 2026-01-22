import { Link, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function AppLayout() {
  const session = useAuthStore((s) => s.session)
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="min-h-dvh w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-slate-950/60">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link
            to="/dashboard"
            className="text-base font-semibold text-indigo-600 hover:underline dark:text-indigo-400 sm:text-lg"
          >
            Boilerplate
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-600 dark:text-slate-400 sm:inline">
              {session?.user.email}
            </span>
            <button
              type="button"
              onClick={() => {
                logout()
                toast.success('Signed out.')
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  )
}
