import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { getCurrentUserFn } from '@/server/functions/current-user'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const user = await getCurrentUserFn()

    if (!user) {
      throw redirect({ to: '/login' })
    }

    return { user }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return <Outlet />
}
