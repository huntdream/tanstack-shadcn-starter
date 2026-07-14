import { Link, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { getPublicDataFn } from '@/server/functions/public-data'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/')({
  loader: async () => {
    return getPublicDataFn({ data: {} })
  },
  head: () => ({
    meta: [{ title: `${m.nav_home()} · ${m.app_title()}` }],
  }),
  component: HomePage,
})

function HomePage() {
  const data = Route.useLoaderData()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          {m.home_heading()}
        </h1>
        <p className="text-muted-foreground text-lg">{m.home_subtitle()}</p>
      </div>

      <p className="text-sm">{m.home_server_data({ message: data.message })}</p>

      <div className="flex flex-wrap gap-3">
        <Button render={<Link to="/dashboard" />}>{m.home_cta()}</Button>
        <Button variant="outline" render={<Link to="/login" />}>
          {m.nav_login()}
        </Button>
      </div>
    </div>
  )
}
