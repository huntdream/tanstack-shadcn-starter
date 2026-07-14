import { useSession } from '@tanstack/react-start/server'

import { getServerEnv } from '@/env.server'

export type SessionData = {
  userId?: string
  email?: string
}

const SESSION_NAME =
  process.env.NODE_ENV === 'production' ? '__Host-app-session' : 'app-session'

export async function getAppSession() {
  const env = getServerEnv()

  return useSession<SessionData>({
    name: SESSION_NAME,
    password: env.SESSION_SECRET,
    cookie: {
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    },
  })
}

export async function destroySession() {
  const session = await getAppSession()
  await session.clear()
}

export async function rotateSession(data: SessionData) {
  const session = await getAppSession()
  await session.clear()
  await session.update(data)
}
