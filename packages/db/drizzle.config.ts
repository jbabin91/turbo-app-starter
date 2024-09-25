import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
  dialect: 'postgresql',
  out: './src/drizzle/migrations',
  schema: './src/schema',
  strict: true,
  verbose: true,
});
