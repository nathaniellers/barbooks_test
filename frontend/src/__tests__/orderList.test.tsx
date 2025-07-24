import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderList } from '../components/OrderList';
import axios from 'axios';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';

vi.mock('axios');
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

const mockOrders = [
  { id: 1, product: 'Apple', qty: 2, price: 100 },
  { id: 2, product: 'Banana', qty: 5, price: 200 },
];

describe('OrderList', () => {
  beforeEach(() => {
    mockedAxios.get = vi.fn().mockResolvedValue({ data: mockOrders });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders order list from API', async () => {
    render(<OrderList />);

    await waitFor(() => {
      expect(screen.getByText(/Apple/)).toBeInTheDocument();
      expect(screen.getByText(/Banana/)).toBeInTheDocument();
    });
  });

  it('filters by product', async () => {
    render(<OrderList />);

    const input = screen.getByPlaceholderText('Filter by product');
    await userEvent.type(input, 'Apple');

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('product=Apple')
      );
    });
  });

  it('changes pagination limit', async () => {
    render(<OrderList />);
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '10');

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('limit=10')
      );
    });
  });

  it('paginates to next page', async () => {
    render(<OrderList />);
    const nextBtn = screen.getByText('Next');
    await userEvent.click(nextBtn);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('offset=5')
      );
    });
  });

  it('resets offset when filter changes', async () => {
    render(<OrderList />);
    const input = screen.getByPlaceholderText('Filter by product');
    await userEvent.type(input, 'Orange');

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('offset=0')
      );
    });
  });
});
