import { sumBy, median, topBy, countUnique } from '../../utils/math';

describe('Math Utils', () => {
  const orders = [
    { id: 1, product: 'Apple', qty: 2, price: 100 },
    { id: 2, product: 'Banana', qty: 5, price: 50 },
    { id: 3, product: 'Apple', qty: 3, price: 120 },
  ];

  test('sumBy works correctly', () => {
    const total = sumBy(orders, o => o.qty * o.price);
    expect(total).toBe(2 * 100 + 5 * 50 + 3 * 120);
  });

  test('median works correctly', () => {
    const result = median([50, 120, 100]);
    expect(result).toBe(100);
  });

  test('topBy returns product with highest total qty', () => {
    const result = topBy(orders, o => o.product, o => o.qty);
    expect(result).toBe('Apple');
  });

  test('countUnique counts distinct product names', () => {
    const result = countUnique(orders, o => o.product);
    expect(result).toBe(2);
  });
});
