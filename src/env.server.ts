import { z } from 'zod'

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  SESSION_SECRET: z
    .string()
    .min(32, 'SESSION_SECRET must be at least 32 characters'),
  APP_ORIGIN: z.string().url().optional(),
  PORT: z.coerce.number().int().positive().default(3000),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

let cachedEnv: ServerEnv | null = null

export function getServerEnv(): ServerEnv {
  if (cachedEnv) {
    return cachedEnv
  }

  const parsed = serverEnvSchema.safeParse(process.env)

  if (!parsed.success) {
    console.error(
      'Invalid server environment variables:',
      parsed.error.flatten().fieldErrors,
    )
    throw new Error('Invalid server environment configuration')
  }

  if (parsed.data.NODE_ENV === 'production' && !parsed.data.APP_ORIGIN) {
    throw new Error('APP_ORIGIN is required in production')
  }

  cachedEnv = parsed.data
  return cachedEnv
}
