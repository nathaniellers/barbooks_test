import { useState } from 'react';
import { useSummary } from './hooks/useSummary';
import { OrderList } from './components/OrderList';
import { OrderForm } from './components/OrderForm';
import { Summary } from './components/Summary';
import {
  Container,
  Typography,
  Box,
  Button
} from '@mui/material';

function App() {
  const { data, loading, error } = useSummary();
  const [openForm, setOpenForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOrderCreated = () => {
    setRefreshTrigger(prev => prev + 1);
    setOpenForm(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        Order Summary App
      </Typography>

      <Summary loading={loading} error={error} data={data} />

      <OrderForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onOrderCreated={handleOrderCreated}
      />

      <OrderList key={refreshTrigger} />
    </Container>
  );
}

export default App;
