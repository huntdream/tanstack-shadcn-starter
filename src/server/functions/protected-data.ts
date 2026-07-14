import { createServerFn } from '@tanstack/react-start'
import { setResponseHeaders } from '@tanstack/react-start/server'

import { authMiddleware } from '@/server/middleware/auth'

export const getProtectedDataFn = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    setResponseHeaders(
      new Headers({
        'Cache-Control': 'private, no-store',
        Vary: 'Cookie',
      }),
    )

    return {
      email: context.session.email ?? 'unknown@example.com',
      fetchedAt: new Date().toISOString(),
    }
  })
