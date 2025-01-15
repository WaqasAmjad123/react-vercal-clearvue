import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Typography,
  Divider
} from '@mui/material';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  type: 'Residential',
  status: 'Active',
  projectCount: 0,
  totalSpent: 0,
  notes: ''
};

const customerTypes = ['Residential', 'Commercial', 'Industrial', 'Government'];
const statusOptions = ['Active', 'Inactive', 'Pending'];

const CustomerForm = ({ open, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = React.useState(initialFormData);
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [initialData, open]);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h6">
          {initialData ? 'Edit Customer' : 'Add New Customer'}
        </Typography>
      </DialogTitle>
      <Divider />
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Basic Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Customer Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Customer Type"
                >
                  {customerTypes.map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Contact Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                required
                placeholder="+1-234-567-8900"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={Boolean(errors.address)}
                helperText={errors.address}
                required
                multiline
                rows={2}
              />
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Additional Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  {statusOptions.map(status => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={3}
                placeholder="Add any additional notes about the customer..."
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button 
            onClick={onClose}
            sx={{ 
              color: 'primary.main',
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="contained"
            color="primary"
          >
            {initialData ? 'Update' : 'Add'} Customer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CustomerForm; 