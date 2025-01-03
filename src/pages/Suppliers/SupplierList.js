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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  Search,
  MoreVert,
  Link as LinkIcon,
  Phone,
  Email
} from '@mui/icons-material';
import SupplierForm from './SupplierForm';

// Mock data - replace with actual API calls
const initialSuppliers = [
  {
    id: 1,
    name: 'SolarTech Solutions',
    contactPerson: 'John Doe',
    email: 'john@solartech.com',
    phone: '+1-234-567-8900',
    address: '123 Solar Street, Sun City, SC 12345',
    category: 'Solar Panels',
    website: 'www.solartech.com',
    notes: 'Premium solar panel supplier'
  },
  {
    id: 2,
    name: 'PowerInverters Inc',
    contactPerson: 'Jane Smith',
    email: 'jane@powerinverters.com',
    phone: '+1-234-567-8901',
    address: '456 Power Ave, Energy City, EC 67890',
    category: 'Inverters',
    website: 'www.powerinverters.com',
    notes: 'Leading inverter manufacturer'
  },
];

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(supplier =>
    Object.values(supplier).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleOpenMenu = (event, supplier) => {
    setAnchorEl(event.currentTarget);
    setSelectedSupplier(supplier);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAdd = () => {
    setSelectedSupplier(null);
    setOpenForm(true);
  };

  const handleEdit = () => {
    setOpenForm(true);
    handleCloseMenu();
  };

  const handleDelete = () => {
    setOpenDelete(true);
    handleCloseMenu();
  };

  const handleSubmit = (formData) => {
    if (selectedSupplier) {
      // Update existing supplier
      setSuppliers(suppliers.map(supplier =>
        supplier.id === selectedSupplier.id
          ? { ...formData, id: supplier.id }
          : supplier
      ));
    } else {
      // Add new supplier
      setSuppliers([...suppliers, { ...formData, id: Date.now() }]);
    }
    setOpenForm(false);
  };

  const confirmDelete = () => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== selectedSupplier.id));
    setOpenDelete(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Suppliers
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your suppliers and their information
        </Typography>
      </Box>

      {/* Actions */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
        >
          Add Supplier
        </Button>
      </Box>

      {/* Suppliers Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Website</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contactPerson}</TableCell>
                <TableCell>
                  <Chip 
                    label={supplier.category} 
                    size="small"
                    sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Tooltip title={supplier.email}>
                      <IconButton size="small" color="primary">
                        <Email fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={supplier.phone}>
                      <IconButton size="small" color="primary">
                        <Phone fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title={supplier.website}>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => window.open(`https://${supplier.website}`, '_blank')}
                    >
                      <LinkIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleOpenMenu(e, supplier)}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Supplier Form Dialog */}
      {openForm && (
        <SupplierForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSubmit={handleSubmit}
          initialData={selectedSupplier}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Supplier</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedSupplier?.name}? This action cannot be undone.
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

export default SupplierList; 