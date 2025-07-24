import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import logger from '../utils/logger';
import path from 'path';
import fs from 'fs';

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';
const dbDir = path.resolve(__dirname, '../db');
const dbPath = isTest ? ':memory:' : path.join(dbDir, 'database.sqlite');

// ✅ Ensure the directory exists
if (!isTest && !fs.existsSync(dbDir)) {
  logger.warn('SQLite DB file does not exist yet:', dbPath);
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error('Failed to connect to SQLite DB:', err.message);
  } else {
    logger.info(`Connected to DB at ${dbPath}`);
  }
});

export default db;
