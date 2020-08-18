import * as dotenv from 'dotenv'
import { DatabaseType } from 'typeorm'
dotenv.config()

export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = process.env.PORT || 8000
export const CORS_WHITELIST = process.env.CORS_WHITELIST.split(',') || []

export const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret-k3y'

export const DB_TYPE = process.env.DB_TYPE as DatabaseType
export const DB_URL = process.env.DB_URL
