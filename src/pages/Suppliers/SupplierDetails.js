import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import {
  Edit,
  Delete,
  Email,
  Phone,
  LocationOn,
  Business,
  Language,
  Notes,
  ArrowBack
} from '@mui/icons-material';
import DetailPageHeader from '../../components/common/DetailPageHeader';

const SupplierDetails = ({ supplier, onEdit, onDelete, onClose }) => {
  if (!supplier) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Supplier not found
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>
      <DetailPageHeader
        title="Supplier Details"
        onEdit={onEdit}
        onDelete={onDelete}
        onClose={onClose}
      />

      {/* Main Content */}
      <Grid container spacing={3} sx={{ px: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: 'primary.main',
                    mr: 2,
                    fontSize: '2rem'
                  }}
                >
                  {supplier.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {supplier.name}
                  </Typography>
                  <Chip 
                    label={supplier.category} 
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip 
                    label="Active" 
                    color="success"
                    size="small"
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Business color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Contact Person
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1">
                        {supplier.contactPerson}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1">
                        {supplier.email}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Phone
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1">
                        {supplier.phone}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Address
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1">
                        {supplier.address}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Language color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Website
                      </Typography>
                    }
                    secondary={
                      <Button
                        href={`https://${supplier.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          p: 0, 
                          minWidth: 0, 
                          textTransform: 'none',
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: 'transparent',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {supplier.website}
                      </Button>
                    }
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Notes color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle2" color="text.secondary">
                        Notes
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1">
                        {supplier.notes || 'No notes available'}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupplierDetails; 