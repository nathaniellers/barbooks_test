import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
  Stack
} from '@mui/material';
import { OrderForm } from './OrderForm';

export type Order = {
  id: number;
  product: string;
  qty: number;
  price: number;
};

export const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('');
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [totalCount, setTotalCount] = useState(0); // optional: total items

  const fetchOrders = useCallback(async () => {
    try {
      const query = new URLSearchParams({
        product: filter,
        limit: String(limit),
        offset: String(offset)
      });

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders?${query.toString()}`);
      setOrders(res.data.orders || res.data); // adapt based on backend format
      setTotalCount(res.data.total || 0);     // if backend provides total count
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  }, [filter, limit, offset, reloadKey]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    setOffset(0);
  }, [filter]);

  const handleOrderCreated = () => {
    setReloadKey(prev => prev + 1);
  };

  const isLastPage = orders.length < limit;

  return (
    <Box p={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Orders</Typography>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Add Order
        </Button>
      </Stack>

      <TextField
        label="Filter by product"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.qty}</TableCell>
                  <TableCell>{order.price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={2} alignItems="center" mt={3}>
        <Button
          variant="outlined"
          onClick={() => setOffset(Math.max(0, offset - limit))}
          disabled={offset === 0}
        >
          Prev
        </Button>
        <Button
          variant="outlined"
          onClick={() => setOffset(offset + limit)}
          disabled={isLastPage}
        >
          Next
        </Button>

        <Box>
          <Typography variant="body2" component="span" mr={1}>
            Items per page:
          </Typography>
          <Select
            size="small"
            value={limit}
            onChange={e => setLimit(Number(e.target.value))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </Box>
      </Stack>

      <OrderForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onOrderCreated={handleOrderCreated}
      />
    </Box>
  );
};
