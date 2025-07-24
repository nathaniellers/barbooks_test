import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './utils/logger';
import orderRoutes from './routes/order';
import summaryRoutes from './routes/summary';
import healthRouter from './routes/health';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// ✅ Register health route BEFORE other middlewares
app.use('/health', healthRouter);

// ✅ Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// ✅ API Routes
app.use('/api/orders', orderRoutes);
app.use('/api/summary', summaryRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


export default app;