import { createOrder, getOrders } from '../../services/order';
import db from '../../db/database';
import fs from 'fs';
import path from 'path';

const ordersSchemaPath = path.resolve(__dirname, '../../db/schemas/orders.sql');
const schemaSQL = fs.readFileSync(ordersSchemaPath, 'utf8');

beforeAll((done) => {
  // Load schema for in-memory DB
  db.exec(schemaSQL, (err) => {
    if (err) return done(err);
    done(null);
  });
});

afterAll((done) => {
  db.close(done);
});

describe('Order Service', () => {
  describe('createOrder', () => {
    it('should create an order and return it with an id', async () => {
      const order = await createOrder({
        product: 'Test Product',
        qty: 3,
        price: 50,
      });

      expect(order).toHaveProperty('id');
      expect(order.product).toBe('Test Product');
      expect(order.qty).toBe(3);
      expect(order.price).toBe(50);
    });
  });

  describe('getOrders', () => {
    beforeAll(async () => {
      // Seed multiple orders
      await createOrder({ product: 'Apple', qty: 2, price: 10 });
      await createOrder({ product: 'Banana', qty: 4, price: 5 });
      await createOrder({ product: 'Apple Juice', qty: 1, price: 20 });
    });

    it('should fetch all orders', async () => {
      const orders = await getOrders();
      expect(Array.isArray(orders)).toBe(true);
      expect(orders.length).toBeGreaterThanOrEqual(3);
    });

    it('should filter orders by product name', async () => {
      const appleOrders = await getOrders('Apple');
      expect(appleOrders.length).toBeGreaterThan(0);
      for (const order of appleOrders) {
        expect(order.product).toMatch(/Apple/i);
      }
    });

    it('should return paginated results', async () => {
      const page1 = await getOrders(undefined, 2, 0);
      const page2 = await getOrders(undefined, 2, 2);

      expect(page1.length).toBeLessThanOrEqual(2);
      expect(page2.length).toBeLessThanOrEqual(2);

      if (page1.length === 2 && page2.length === 2) {
        expect(page1[0].id).not.toBe(page2[0].id);
      }
    });
  });
});
