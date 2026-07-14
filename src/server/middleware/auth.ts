import { createMiddleware } from '@tanstack/react-start'

import { AppError } from '@/lib/errors'
import { getAppSession } from '@/server/session'
import type { SessionData } from '@/server/session'

export type AuthContext = {
  session: SessionData
}

export const authMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const appSession = await getAppSession()
    const session = appSession.data

    if (!session.userId) {
      throw new AppError('UNAUTHORIZED', 'Authentication required', {
        status: 401,
      })
    }

    return next({
      context: {
        session,
      } satisfies AuthContext,
    })
  },
)
