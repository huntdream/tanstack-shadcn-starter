import {
  createCsrfMiddleware,
  createMiddleware,
  createStart,
} from '@tanstack/react-start'

import { securityHeadersMiddleware } from '@/server/middleware/security-headers'

function getTrustedOrigin(request: Request): string {
  return process.env.APP_ORIGIN ?? new URL(request.url).origin
}

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
  origin: (_origin, ctx) => {
    const trusted = getTrustedOrigin(ctx.request)
    const requestOrigin = ctx.request.headers.get('origin')

    if (!requestOrigin) {
      return true
    }

    return requestOrigin === trusted
  },
})

const requestLogger = createMiddleware().server(async ({ next, request }) => {
  const startedAt = Date.now()
  const result = await next()
  const durationMs = Date.now() - startedAt

  if (process.env.NODE_ENV !== 'production') {
    console.info(`${request.method} ${request.url} ${durationMs}ms`)
  } else {
    console.info(
      JSON.stringify({
        level: 'info',
        method: request.method,
        url: request.url,
        durationMs,
      }),
    )
  }

  return result
})

export const startInstance = createStart(() => ({
  requestMiddleware: [requestLogger, securityHeadersMiddleware, csrfMiddleware],
}))
