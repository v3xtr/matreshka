import 'dotenv/config'
import { PrismaClient } from '../../../src/prisma/index.js'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing')
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
})
