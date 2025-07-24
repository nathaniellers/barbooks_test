import { generateOrderSummary } from '../../services/summary';
import * as orderService from '../../services/order';
import { Order } from '../../models/order';
import logger from '../../utils/logger';

jest.mock('../../services/order');

describe('generateOrderSummary', () => {
  const mockOrders: Order[] = [
    { id: 1, product: 'Apple', qty: 3, price: 2.5 },
    { id: 2, product: 'Banana', qty: 5, price: 1.0 },
    { id: 3, product: 'Apple', qty: 2, price: 2.5 },
    { id: 4, product: 'Orange', qty: 5, price: 3.0 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (orderService.getOrders as jest.Mock).mockResolvedValue(mockOrders);
  });

  it('generates correct summary', async () => {
    const summary = await generateOrderSummary();
    logger.info('Generated Summary:', summary);
    
    expect(summary).toEqual({
      totalRevenue: 3 * 2.5 + 5 * 1.0 + 2 * 2.5 + 5 * 3.0,
      medianOrderPrice: 2.5,
      topProductByQty: 'Apple',
      uniqueProductCount: 3,
    });
  });

  it('returns zero summary if no orders', async () => {
    (orderService.getOrders as jest.Mock).mockResolvedValue([]);

    const summary = await generateOrderSummary();

    expect(summary).toEqual({
      totalRevenue: 0,
      medianOrderPrice: 0,
      topProductByQty: '',
      uniqueProductCount: 0,
    });
  });
});
