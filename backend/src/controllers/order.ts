import { Request, Response } from 'express';
import { getOrders, createOrder } from '../services/order';
import logger from '../utils/logger';
import { handleError } from '../utils/error';

export const fetchOrders = async (req: Request, res: Response) => {
  try {
    const product = req.query.product as string | undefined;
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const offset = Math.max(Number(req.query.offset) || 0, 0);

    const orders = await getOrders(product, limit, offset);

    logger.info('Fetched orders', {
      product,
      limit,
      offset,
      count: orders.length,
    });

    res.json(orders);
  } catch (err: unknown) {
    handleError(err, res, 'Failed to fetch orders orders');
  }
};

export const addOrder = async (req: Request, res: Response) => {
  try {
    const { product, qty, price } = req.body;

    if (!product || qty <= 0 || price <= 0) {
      logger.warn('Invalid order input', { product, qty, price });
      return res.status(400).json({ error: 'Invalid input' });
    }

    const newOrder = await createOrder({ product, qty, price });

    logger.info('New order created', newOrder);

    res.status(201).json(newOrder);
  } catch (err: unknown) {
    handleError(err, res, 'Failed to add order');
  }
};
