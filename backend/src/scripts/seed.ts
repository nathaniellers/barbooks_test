// src/scripts/seed.ts
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import logger from '../utils/logger';

export async function seed() {
  const db = await open({
    filename: path.resolve(__dirname, '../db/database.sqlite'),
    driver: sqlite3.Database,
  });

  await db.exec(`
    INSERT INTO orders (product, qty, price) VALUES
      ('Apple', 10, 2.5),
      ('Banana', 5, 1.0),
      ('Apple', 7, 2.7),
      ('Orange', 8, 3.0);
  `);

  logger.info('✅ Seeding complete');
  await db.close();
}

// Allow CLI usage
if (require.main === module) {
  seed().catch(err => {
    logger.error('❌ Seeding failed:', err);
  });
}
