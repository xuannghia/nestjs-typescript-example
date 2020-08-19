import * as dotenv from 'dotenv'
import { DatabaseType } from 'typeorm'
dotenv.config()

export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = process.env.PORT || 8000
export const CORS_WHITELIST = process.env.CORS_WHITELIST.split(',') || []

export const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret-k3y'
export const SESSION_SECRET = process.env.SESSION_SECRET || 's3ssi0n-secret-k3y'
export const MAX_AGE = process.env.MAX_AGE || 60000

export const DB_TYPE = process.env.DB_TYPE as DatabaseType
export const DB_URL = process.env.DB_URL

export const REDIS_URL = process.env.REDIS_URL
