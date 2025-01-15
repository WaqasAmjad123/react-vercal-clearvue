import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper
} from '@mui/material';
import {
  Edit,
  Delete,
  ArrowBack
} from '@mui/icons-material';

const DetailPageHeader = ({ title, onEdit, onDelete, onClose }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 2,
        background: 'linear-gradient(to right, #0a183b, #1a2855)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton 
          onClick={onClose}
          sx={{ mr: 2, color: 'white' }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ color: 'white', flex: 1 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={onEdit}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={onDelete}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DetailPageHeader;
