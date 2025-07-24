import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

type HealthStatus = {
  msg: string;
  status_code: number;
  error?: string;
};

const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await axios.get<HealthStatus>('/health');
        setStatus(res.data);
      } catch (err: any) {
        setStatus({
          msg: 'DB connection failed',
          status_code: err.response?.status || 500,
          error: err.response?.data?.error || err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Health Check
        </Typography>
        <CircularProgress />
      </Box>
    );
  }

  if (!status) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Health Check
        </Typography>
        <Alert severity="error">Health status not available</Alert>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" gutterBottom>
        Health Check
      </Typography>

      {status.status_code === 200 ? (
        <Alert severity="success">
          {status.msg} (HTTP {status.status_code})
        </Alert>
      ) : (
        <Alert severity="error">
          {status.msg} (HTTP {status.status_code})
          {status.error && (
            <Typography variant="body2">{status.error}</Typography>
          )}
        </Alert>
      )}
    </Box>
  );
};

export default HealthCheck;
