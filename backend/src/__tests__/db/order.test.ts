import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { Database } from 'sqlite';
import fs from 'fs';

let db: Database;

beforeAll(async () => {
  db = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });

  const schemaPath = path.resolve(__dirname, '../../db/schemas/orders.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  await db.exec(schema);

  await db.exec(`
    INSERT INTO orders (product, qty, price) VALUES
      ('TestProduct', 3, 10.0),
      ('TestProduct2', 1, 5.0);
  `);
});

afterAll(async () => {
  await db.close();
});

test('should fetch orders from the in-memory db', async () => {
  const rows = await db.all('SELECT * FROM orders');
  expect(rows.length).toBe(2);
  expect(rows[0]).toHaveProperty('product', 'TestProduct');
});
