// src/server.ts
import express from 'express';
import { runMigrations } from './scripts/migrate';
import { seed } from './scripts/seed';
import dotenv from 'dotenv';
import logger from './utils/logger';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (_, res) => {
  logger.info('✅ Health check passed');
  res.json({ status: 'ok' });
});

async function startServer() {
  try {
    await runMigrations();
    await seed(); // Run seeder here

    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
