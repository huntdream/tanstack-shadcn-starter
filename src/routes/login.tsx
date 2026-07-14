import { Link, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/login')({
  head: () => ({
    meta: [{ title: `${m.login_title()} · ${m.app_title()}` }],
  }),
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-3xl font-semibold">{m.login_title()}</h1>
      <p className="text-muted-foreground">{m.login_description()}</p>
      <Button variant="outline" render={<Link to="/" />}>
        {m.login_back()}
      </Button>
    </div>
  )
}
