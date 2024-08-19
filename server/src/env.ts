import path from 'node:path'
import { z } from 'zod'
import { config } from 'dotenv'

config({ path: path.resolve('./.env') })

const portSchema = z.number().int().min(0).max(2 ** 16 - 1)

const envSchema = z.object({
  HOST: z.string(),
  PORT: z.preprocess(arg => arg !== '' ? Number(arg) : undefined, portSchema),
  DATABASE_URL: z.string().url(),
  URLBASE: z.string(),
  JWT_SECRET: z.string(),
  MAIL_ACCOUNT: z.string(),
  MAIL_PASSWORD: z.string(),
  REJECT_UNAUTHORIZED: z.string().transform(arg => arg.toLowerCase() === 'true'),
  AWS_BUCKET_NAME: z.string(),
  AWS_BUCKET_REGION: z.string(),
  AWS_PUBLIC_KEY: z.string(),
  AWS_SECRET_KEY: z.string(),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(result.error.format(), null, 4),
  )
  process.exit(1)
}

export const env = result.data
