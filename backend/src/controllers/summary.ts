import { Request, Response } from 'express';
import { generateOrderSummary } from '../services/summary';
import logger from '../utils/logger';

export const getSummary = async (_: Request, res: Response) => {
  try {
    const summary = await generateOrderSummary();
    res.json(summary);
  } catch (err: unknown) {
    logger.error('Failed to generate summary', err);
    res.status(500).json({ error: 'error' });
  }
};
