import express from 'express';
import { fetchOrders, addOrder } from '../controllers/order';

const router = express.Router();

router.get('/', fetchOrders);
router.post('/', addOrder);

export default router;
