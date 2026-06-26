import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';
import { ENV } from '../config/env.js';

if (!ENV.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables.');
}

export const pool = new Pool({ connectionString: ENV.DATABASE_URL });

pool.on('connect', () => {
  console.log('Connected to database');
});

pool.on('error', (err) => {
  console.error('Error connecting to database', err);
});

export const db = drizzle(pool, { schema });
