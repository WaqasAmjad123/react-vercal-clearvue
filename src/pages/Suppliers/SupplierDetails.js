import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Business,
  Person,
  Email,
  Phone,
  Language,
  LocationOn,
  Edit,
  Delete,
  Assignment,
  LocalShipping,
  AttachMoney,
  Description
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    )}
  </div>
);

const SupplierDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);
  const [supplier] = React.useState({
    id: 1,
    name: 'SolarTech Solutions',
    contactPerson: 'John Doe',
    email: 'john@solartech.com',
    phone: '+1-234-567-8900',
    address: '123 Solar Street, Sun City, SC 12345',
    category: 'Solar Panels',
    website: 'www.solartech.com',
    notes: 'Premium solar panel supplier with excellent track record',
    rating: 4.5,
    status: 'Active',
    orders: [
      { id: 1, date: '2024-01-15', amount: 15000, status: 'Delivered' },
      { id: 2, date: '2024-02-01', amount: 22000, status: 'Pending' }
    ],
    products: [
      { name: 'Solar Panel 400W', price: 250, stock: 100 },
      { name: 'Mounting Kit', price: 75, stock: 150 }
    ]
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {supplier.name}
          </Typography>
          <Chip 
            label={supplier.status} 
            color={supplier.status === 'Active' ? 'success' : 'default'}
            sx={{ mr: 1 }}
          />
          <Chip 
            label={supplier.category} 
            color="primary"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => {/* Handle edit */}}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => {/* Handle delete */}}
          >
            Delete
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Orders" />
            <Tab label="Products" />
            <Tab label="Documents" />
          </Tabs>
        </Box>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Contact Person"
                      secondary={supplier.contactPerson}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email"
                      secondary={supplier.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Phone"
                      secondary={supplier.phone}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Address"
                      secondary={supplier.address}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Language />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Website"
                      secondary={
                        <Button 
                          href={`https://${supplier.website}`}
                          target="_blank"
                          sx={{ p: 0, minWidth: 0, textTransform: 'none' }}
                        >
                          {supplier.website}
                        </Button>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Business Summary
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {supplier.notes}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Box>
                      <Typography variant="h4" color="primary">
                        {supplier.orders?.length || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Orders
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" color="primary">
                        {supplier.products?.length || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Products
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" color="primary">
                        {supplier.rating}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Rating
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Orders Tab */}
        <TabPanel value={tabValue} index={1}>
          <List>
            {supplier.orders.map(order => (
              <ListItem 
                key={order.id}
                sx={{ 
                  mb: 2, 
                  bgcolor: 'background.default',
                  borderRadius: 1
                }}
              >
                <ListItemIcon>
                  <LocalShipping />
                </ListItemIcon>
                <ListItemText 
                  primary={`Order #${order.id}`}
                  secondary={`Date: ${order.date}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6">
                    ${order.amount.toLocaleString()}
                  </Typography>
                  <Chip 
                    label={order.status}
                    color={order.status === 'Delivered' ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </TabPanel>

        {/* Products Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={2}>
            {supplier.products.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.name}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" color="primary">
                      ${product.price}
                    </Typography>
                    <Chip 
                      label={`Stock: ${product.stock}`}
                      color={product.stock > 50 ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Documents Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography color="text.secondary">
            No documents available
          </Typography>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default SupplierDetails; 