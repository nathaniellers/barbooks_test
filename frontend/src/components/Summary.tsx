// src/components/Summary.tsx
import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Stack,
  Divider
} from '@mui/material';

interface SummaryProps {
  loading: boolean;
  error: string | null;
  data: {
    totalRevenue: number;
    medianOrderPrice: number;
    topProductByQty: string;
    uniqueProductCount: number;
  } | null;
}

export const Summary = ({ loading, error, data }: SummaryProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">Error: {error}</Alert>}

      {data && (
        <Stack spacing={1} divider={<Divider flexItem />}>
          <Typography variant="body1">
            <strong>Total Revenue:</strong> {data.totalRevenue}
          </Typography>
          <Typography variant="body1">
            <strong>Median Order Price:</strong> {data.medianOrderPrice}
          </Typography>
          <Typography variant="body1">
            <strong>Top Product by Qty:</strong> {data.topProductByQty}
          </Typography>
          <Typography variant="body1">
            <strong>Unique Product Count:</strong> {data.uniqueProductCount}
          </Typography>
        </Stack>
      )}
    </Paper>
  );
};
