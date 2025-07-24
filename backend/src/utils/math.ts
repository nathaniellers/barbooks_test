export function sumBy<T>(items: T[], fn: (item: T) => number): number {
  return items.reduce((sum, item) => sum + fn(item), 0);
}

export function median(values: number[]): number {
  if (!values.length) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function topBy<T>(items: T[], keyFn: (item: T) => string, valueFn: (item: T) => number): string {
  const map = new Map<string, number>();

  items.forEach(item => {
    const key = keyFn(item);
    const value = valueFn(item);
    map.set(key, (map.get(key) || 0) + value);
  });

  const top = Array.from(map.entries()).sort((a, b) => b[1] - a[1])[0];
  return top ? top[0] : '';
}

export function countUnique<T>(items: T[], keyFn: (item: T) => string): number {
  return new Set(items.map(keyFn)).size;
}
