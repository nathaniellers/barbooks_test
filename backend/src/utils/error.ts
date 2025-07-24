import { Response } from 'express';
import logger from './logger';

export function handleError(err: unknown, res: Response, context: string) {
  if (err instanceof Error) {
    logger.error(`${context} failed`, { error: err.message, stack: err.stack });
    res.status(500).json({ error: 'Internal server error' });
  } else {
    logger.error(`${context} failed: Unknown error`, { err });
    res.status(500).json({ error: 'Internal server error' });
  }
}
