import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

(async () => {
  const db = await open({
    filename: path.resolve(__dirname, '../db/database.sqlite'),
    driver: sqlite3.Database,
  });

  const rows = await db.all('SELECT * FROM orders');
  console.log('📦 Seeded Orders:\n', rows);

  await db.close();
})();
