import React from 'react';
import { Box, Typography } from '@mui/material';

const NoDataMessage = ({ title, message, actionButton }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        textAlign: 'center'
      }}
    >
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {message}
      </Typography>
      {actionButton}
    </Box>
  );
};

export default NoDataMessage; 