import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onOrderCreated?: () => void;
};

export const OrderForm = ({ open, onClose, onOrderCreated }: Props) => {
  const [form, setForm] = useState({ product: '', qty: 1, price: 1 });
  const [errors, setErrors] = useState({ product: '', qty: '', price: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = { product: '', qty: '', price: '' };
    if (!form.product.trim()) errs.product = 'Product is required';
    if (form.qty < 1) errs.qty = 'Quantity must be at least 1';
    if (form.price < 0.01) errs.price = 'Price must be at least 0.01';
    setErrors(errs);
    return !Object.values(errs).some(Boolean);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, form);
      onOrderCreated?.();
      setForm({ product: '', qty: 1, price: 1 });
      onClose();
    } catch (error) {
      console.error('Failed to submit order:', error);
      // Optionally show snackbar or toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Order</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Product"
              value={form.product}
              onChange={e => setForm({ ...form, product: e.target.value })}
              error={!!errors.product}
              helperText={errors.product}
              fullWidth
              required
            />
            <TextField
              label="Quantity"
              type="number"
              inputProps={{ min: 1 }}
              value={form.qty}
              onChange={e => setForm({ ...form, qty: Number(e.target.value) })}
              error={!!errors.qty}
              helperText={errors.qty}
              required
            />
            <TextField
              label="Price"
              type="number"
              inputProps={{ min: 0.01, step: 0.01 }}
              value={form.price}
              onChange={e => setForm({ ...form, price: Number(e.target.value) })}
              error={!!errors.price}
              helperText={errors.price}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Adding...' : 'Add Order'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
