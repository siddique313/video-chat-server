import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT) || 5432;
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
export const DB_NAME = process.env.DB_NAME || 'videochat';