import { useAuth } from '../auth/AuthContext'

export default function DashboardPage() {
  const { session } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Signed in as{' '}
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {session?.user.email}
          </span>
          .
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          This is a protected route. Add your application modules here.
        </p>
      </div>
    </div>
  )
}

