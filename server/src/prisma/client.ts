import { PrismaClient } from '@prisma/client'
import { env } from '../env'

export const prismaClient = new PrismaClient({
  datasources: { db: { url: env.DATABASE_URL } },
})
