import { getOrders } from './order';
import { Summary } from '../types/summary';
import { Order } from '../models/order';
import { sumBy, median, topBy, countUnique } from '../utils/math';

export const generateOrderSummary = async (): Promise<Summary> => {
  const orders: Order[] = await getOrders();

  return {
    totalRevenue: sumBy(orders, o => o.qty * o.price),
    medianOrderPrice: median(orders.map(o => o.price)),
    topProductByQty: topBy(orders, o => o.product, o => o.qty),
    uniqueProductCount: countUnique(orders, o => o.product),
  };
};
