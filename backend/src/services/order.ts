import db from '../db/database';
import { Order } from '../models/order';
import logger from '../utils/logger';

export const getOrders = (
  product?: string,
  limit?: number,
  offset?: number
): Promise<Order[]> => {
  return new Promise((resolve, reject) => {
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (product) {
      conditions.push('product LIKE ?');
      params.push(`%${product}%`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    let query = `SELECT * FROM orders ${whereClause} ORDER BY product ASC`;

    if (limit != null && offset != null) {
      query += ` LIMIT ? OFFSET ?`;
      params.push(limit, offset); // These are only added when placeholders are added
    }

    db.all(query, params, (err, rows: Order[]) => {
      if (err) {
        logger.error('Error fetching orders', {
          error: err.message,
          query,
          params,
        });
        return reject(err);
      }

      logger.info('Fetched orders', {
        product,
        limit,
        offset,
        count: rows.length,
      });

      resolve(rows);
    });
  });
};

export const createOrder = ({
  product,
  qty,
  price,
}: {
  product: string;
  qty: number;
  price: number;
}): Promise<Order> => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)`;

    db.run(query, [product, qty, price], function (err) {
      if (err) {
        logger.error('Error inserting order', { error: err.message, product, qty, price });
        return reject(err);
      }

      const newOrder: Order = {
        id: this.lastID,
        product,
        qty,
        price,
      };

      resolve(newOrder);
    });
  });
};
