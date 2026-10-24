import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: connectionString || 'postgres://postgres:postgres@localhost:5432/besties_db',
  ssl: process.env.NODE_ENV === 'production' || (connectionString && connectionString.includes('neon.tech')) ? { rejectUnauthorized: false } : false
});

// Helper for query execution
export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}
