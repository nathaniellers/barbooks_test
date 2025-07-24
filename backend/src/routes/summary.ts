import express from 'express';
import { getSummary } from '../controllers/summary';

const router = express.Router();
router.get('/', getSummary);
export default router;
