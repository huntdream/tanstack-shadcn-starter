import { createMiddleware } from '@tanstack/react-start'

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

export const securityHeadersMiddleware = createMiddleware().server(
  async ({ next }) => {
    const result = await next()
    const headers = new Headers(result.response.headers)

    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(key, value)
    }

    return {
      ...result,
      response: new Response(result.response.body, {
        status: result.response.status,
        statusText: result.response.statusText,
        headers,
      }),
    }
  },
)
