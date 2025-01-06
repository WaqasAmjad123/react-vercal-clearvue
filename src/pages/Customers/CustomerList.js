import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  ButtonGroup
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  Search,
  Visibility,
  ViewList,
  ViewModule,
  Email,
  Phone
} from '@mui/icons-material';
import CustomerForm from './CustomerForm';
import CustomerDetails from './CustomerDetails';

// Mock data for initial customers
const initialCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-234-567-8900',
    address: '123 Main St, City, State 12345',
    type: 'Residential',
    status: 'Active',
    projectCount: 2,
    totalSpent: 25000
  },
  {
    id: 2,
    name: 'ABC Corporation',
    email: 'contact@abc.com',
    phone: '+1-234-567-8901',
    address: '456 Business Ave, City, State 67890',
    type: 'Commercial',
    status: 'Active',
    projectCount: 5,
    totalSpent: 150000
  }
];

const CustomerList = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    Object.values(customer).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setOpenDetails(true);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setOpenForm(true);
  };

  const handleSubmit = (formData) => {
    if (selectedCustomer) {
      setCustomers(customers.map(customer =>
        customer.id === selectedCustomer.id
          ? { ...formData, id: customer.id }
          : customer
      ));
    } else {
      setCustomers([...customers, { ...formData, id: Date.now() }]);
    }
    setOpenForm(false);
    setSelectedCustomer(null);
  };

  const confirmDelete = () => {
    setCustomers(customers.filter(customer => customer.id !== selectedCustomer.id));
    setOpenDelete(false);
    setSelectedCustomer(null);
  };

  const renderGridView = () => (
    <Grid container spacing={3}>
      {filteredCustomers.map((customer) => (
        <Grid item xs={12} sm={6} md={4} key={customer.id}>
          <Card 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                boxShadow: (theme) => theme.shadows[4],
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease-in-out'
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main',
                    width: 56,
                    height: 56,
                    mr: 2
                  }}
                >
                  {customer.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" noWrap>
                    {customer.name}
                  </Typography>
                  <Chip 
                    label={customer.type}
                    size="small"
                    color={customer.type === 'Commercial' ? 'primary' : 'secondary'}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {customer.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {customer.phone}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Projects
                  </Typography>
                  <Typography variant="h6">
                    {customer.projectCount}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Total Spent
                  </Typography>
                  <Typography variant="h6">
                    ${customer.totalSpent.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Chip 
                label={customer.status}
                color={customer.status === 'Active' ? 'success' : 'default'}
                size="small"
              />
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
              <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                <Tooltip title="View Details">
                  <Button 
                    size="small"
                    variant="outlined"
                    color="primary"
                    startIcon={<Visibility />}
                    onClick={() => handleViewDetails(customer)}
                    fullWidth
                  >
                    Details
                  </Button>
                </Tooltip>
                <Tooltip title="Edit Customer">
                  <Button
                    size="small"
                    variant="outlined"
                    color="info"
                    startIcon={<Edit />}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setOpenForm(true);
                    }}
                    fullWidth
                  >
                    Edit
                  </Button>
                </Tooltip>
                <Tooltip title="Delete Customer">
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setOpenDelete(true);
                    }}
                    fullWidth
                  >
                    Delete
                  </Button>
                </Tooltip>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Customers
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your customer base and their information
        </Typography>
      </Box>

      {/* Actions */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ButtonGroup variant="outlined" size="small">
            <Button
              onClick={() => setViewMode('table')}
              variant={viewMode === 'table' ? 'contained' : 'outlined'}
              startIcon={<ViewList />}
            >
              List
            </Button>
            <Button
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              startIcon={<ViewModule />}
            >
              Grid
            </Button>
          </ButtonGroup>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
          >
            Add Customer
          </Button>
        </Box>
      </Box>

      {/* Conditional rendering based on viewMode */}
      {viewMode === 'table' ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Projects</TableCell>
                <TableCell>Total Spent</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow 
                  key={customer.id}
                  onClick={() => handleViewDetails(customer)}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'action.hover',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <Chip 
                      label={customer.type}
                      color={customer.type === 'Commercial' ? 'primary' : 'secondary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title={customer.email}>
                        <IconButton size="small">
                          <Email fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={customer.phone}>
                        <IconButton size="small">
                          <Phone fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={customer.status}
                      color={customer.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{customer.projectCount}</TableCell>
                  <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 1, 
                      justifyContent: 'flex-end'
                    }}>
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(customer);
                          }}
                          sx={{
                            '&:hover': { 
                              backgroundColor: 'primary.light',
                              color: 'primary.main'
                            }
                          }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Customer">
                        <IconButton 
                          size="small"
                          color="info"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCustomer(customer);
                            setOpenForm(true);
                          }}
                          sx={{
                            '&:hover': { 
                              backgroundColor: 'info.light',
                              color: 'info.main'
                            }
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Customer">
                        <IconButton 
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCustomer(customer);
                            setOpenDelete(true);
                          }}
                          sx={{
                            '&:hover': { 
                              backgroundColor: 'error.light',
                              color: 'error.main'
                            }
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        renderGridView()
      )}

      {/* Customer Form Modal */}
      {openForm && (
        <CustomerForm
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            setSelectedCustomer(null);
          }}
          onSubmit={handleSubmit}
          initialData={selectedCustomer}
        />
      )}

      {/* Customer Details Modal */}
      {openDetails && (
        <Dialog
          open={openDetails}
          onClose={() => {
            setOpenDetails(false);
            setSelectedCustomer(null);
          }}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              height: '90vh',
              maxHeight: '90vh'
            }
          }}
        >
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ p: 3 }}>
              <CustomerDetails 
                customer={selectedCustomer}
                onEdit={() => {
                  setOpenDetails(false);
                  setOpenForm(true);
                }}
                onDelete={() => {
                  setOpenDetails(false);
                  setOpenDelete(true);
                }}
                onClose={() => {
                  setOpenDetails(false);
                  setSelectedCustomer(null);
                }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Customer</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedCustomer?.name}? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerList; 