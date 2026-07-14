export type AppErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'INTERNAL_ERROR'

export class AppError extends Error {
  readonly code: AppErrorCode
  readonly status: number
  readonly expose: boolean

  constructor(
    code: AppErrorCode,
    message: string,
    options?: { status?: number; expose?: boolean; cause?: unknown },
  ) {
    super(message, { cause: options?.cause })
    this.name = 'AppError'
    this.code = code
    this.status = options?.status ?? defaultStatusForCode(code)
    this.expose = options?.expose ?? code !== 'INTERNAL_ERROR'
  }
}

function defaultStatusForCode(code: AppErrorCode): number {
  switch (code) {
    case 'UNAUTHORIZED':
      return 401
    case 'FORBIDDEN':
      return 403
    case 'NOT_FOUND':
      return 404
    case 'VALIDATION_ERROR':
      return 400
    default:
      return 500
  }
}

export type ClientErrorPayload = {
  code: AppErrorCode
  message: string
}

export function toClientError(error: unknown): ClientErrorPayload {
  if (error instanceof AppError && error.expose) {
    return { code: error.code, message: error.message }
  }

  return {
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred',
  }
}

export function logServerError(error: unknown): void {
  if (error instanceof AppError && !error.expose) {
    console.error('[server]', error)
    return
  }

  if (error instanceof Error) {
    console.error('[server]', error)
    return
  }

  console.error('[server]', error)
}
