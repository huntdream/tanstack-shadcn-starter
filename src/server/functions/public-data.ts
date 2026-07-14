import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

import { AppError, logServerError, toClientError } from '@/lib/errors'

const publicDataSchema = z.object({
  name: z.string().min(1).max(64).optional(),
})

export const getPublicDataFn = createServerFn({ method: 'GET' })
  .validator(zodValidator({ schema: publicDataSchema }))
  .handler(async ({ data }) => {
    try {
      return {
        message: data.name
          ? `Hello, ${data.name}!`
          : 'TanStack Start server function is working.',
        generatedAt: new Date().toISOString(),
      }
    } catch (error) {
      logServerError(error)
      throw new AppError('INTERNAL_ERROR', toClientError(error).message)
    }
  })
