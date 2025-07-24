// src/routes/health.ts
import { Router } from 'express';
import sqlite3 from 'sqlite3';

const router = Router();
const db = new sqlite3.Database(process.env.DB_PATH || './src/db/database.sqlite');

router.get('/', (req, res) => {
  db.get('SELECT 1', [], (err) => {
    if (err) {
      return res.status(500).json({ msg: 'DB connection failed', status_code: 500, error: err.message });
    }
    res.json({ msg: 'OK', status_code: 200 });
  });
});

export default router;
