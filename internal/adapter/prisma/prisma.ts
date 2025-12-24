import 'dotenv/config'
import { PrismaClient } from '../../../src/prisma/index.js'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

if (!process.env.DATABASE_URL){
    throw new Error("DATABASE_URL is missing")
}

console.log(process.env.DATABASE_URL)

const pool = new Pool({
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    host: process.env.DATABASE_HOST as string,
    database: process.env.DATABASE_NAME as string,
    port: Number(process.env.DATABASE_PORT)
})

export const prisma = new PrismaClient({
    adapter: new PrismaPg(pool)
})
