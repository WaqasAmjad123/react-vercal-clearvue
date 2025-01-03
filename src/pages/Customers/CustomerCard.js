import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Chip
} from '@mui/material';
import {
  MoreVert,
  Email,
  Phone,
  Business
} from '@mui/icons-material';

const CustomerCard = ({ customer, onMenuClick }) => {
  if (!customer) return null;
  
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 50, height: 50 }}>
            {customer.name ? customer.name.charAt(0) : '?'}
          </Avatar>
          <Box>
            <Typography variant="h6">{customer.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {customer.contactPerson}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={(e) => onMenuClick(e, customer)}>
          <MoreVert />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Email fontSize="small" color="action" />
          <Typography variant="body2">{customer.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone fontSize="small" color="action" />
          <Typography variant="body2">{customer.phone}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Business fontSize="small" color="action" />
          <Typography variant="body2">{customer.address}</Typography>
        </Box>
      </Box>

      <Chip 
        label={customer.industry} 
        size="small"
        sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
      />
    </Paper>
  );
};

export default CustomerCard; 