import { useAuthStore } from '../store/authStore'

export default function DashboardPage() {
  const session = useAuthStore((s) => s.session)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          Signed in as{' '}
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {session?.user.email}
          </span>
          .
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
        <p className="text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          This is a protected route. Add your application modules here.
        </p>
      </div>
    </div>
  )
}
