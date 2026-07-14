import { createServerFn } from '@tanstack/react-start'

import { getAppSession } from '@/server/session'

export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await getAppSession()
    const { userId, email } = session.data

    if (!userId) {
      return null
    }

    return { userId, email: email ?? 'unknown@example.com' }
  },
)
