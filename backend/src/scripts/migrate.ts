// scripts/migrate.ts
import fs from 'fs';
import path from 'path';
import { Database } from 'sqlite3';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

export const runMigrations = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const dbPath = process.env.DB_PATH || './src/db/database.sqlite';
    const db = new Database(dbPath);
    const schemasDir = path.resolve(__dirname, '../db/schemas'); // ✅ Remove the extra "src"

    if (!fs.existsSync(schemasDir)) {
      logger.error(`Schema directory not found at ${schemasDir}`);
      return reject(new Error('Schema directory not found'));
    }

    const files = fs.readdirSync(schemasDir).filter(f => f.endsWith('.sql'));
    let remaining = files.length;

    if (remaining === 0) {
      logger.warn('No schema files found.');
      db.close(() => resolve());
      return;
    }

    files.forEach(file => {
      const schema = fs.readFileSync(path.join(schemasDir, file), 'utf-8');
      db.exec(schema, err => {
        if (err) {
          logger.error(`Failed running ${file}:`, err.message);
          return reject(err);
        } else {
          logger.info(`Executed ${file} successfully`);
          if (--remaining === 0) {
            db.close(() => {
              logger.info('Database connection closed after migrations.');
              resolve();
            });
          }
        }
      });
    });
  });
};

// Allow CLI usage
if (require.main === module) {
  runMigrations()
    .then(() => logger.info('Migrations completed.'))
    .catch(err => {
      logger.error('Migration failed:', err);
      process.exit(1);
    });
}
