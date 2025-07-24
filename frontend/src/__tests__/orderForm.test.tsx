import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OrderForm } from '../components/OrderForm';
import axios from 'axios';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';

vi.mock('axios');
const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>;
};

describe('OrderForm', () => {
  const onOrderCreated = vi.fn();
  const onClose = vi.fn();

  beforeEach(() => {
    mockedAxios.post = vi.fn().mockResolvedValue({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the dialog form', () => {
    render(<OrderForm open={true} onClose={onClose} onOrderCreated={onOrderCreated} />);

    expect(screen.getByPlaceholderText('Product')).toBeInTheDocument();
    expect(screen.getAllByRole('spinbutton').length).toBe(2);
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('submits the form and resets inputs', async () => {
    render(<OrderForm open={true} onClose={onClose} onOrderCreated={onOrderCreated} />);

    fireEvent.change(screen.getByPlaceholderText('Product'), {
      target: { value: 'Apple' },
    });
    fireEvent.change(screen.getAllByRole('spinbutton')[0], {
      target: { value: 3 },
    });
    fireEvent.change(screen.getAllByRole('spinbutton')[1], {
      target: { value: 99.99 },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/orders'),
        { product: 'Apple', qty: 3, price: 99.99 }
      );
      expect(onOrderCreated).toHaveBeenCalled();
    });

    expect(screen.getByPlaceholderText('Product')).toHaveValue('');
    expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(1);
    expect(screen.getAllByRole('spinbutton')[1]).toHaveValue(1);
  });
});
