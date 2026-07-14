import { createFileRoute } from '@tanstack/react-router'

import { getProtectedDataFn } from '@/server/functions/protected-data'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/_authenticated/dashboard')({
  loader: async () => {
    return getProtectedDataFn()
  },
  head: () => ({
    meta: [{ title: `${m.dashboard_title()} · ${m.app_title()}` }],
  }),
  component: DashboardPage,
})

function DashboardPage() {
  const { user } = Route.useRouteContext()
  const protectedData = Route.useLoaderData()

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">{m.dashboard_title()}</h1>
      <p className="text-muted-foreground">{m.dashboard_description()}</p>
      <p>{m.dashboard_user({ email: user.email || protectedData.email })}</p>
    </div>
  )
}
