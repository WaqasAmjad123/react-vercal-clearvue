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
  Divider,
  Chip,
  InputAdornment,
  Autocomplete
} from '@mui/material';

const initialFormData = {
  name: '',
  customer: '',
  startDate: '',
  endDate: '',
  status: 'Planning',
  budget: '',
  progress: 0,
  type: 'Installation',
  description: '',
  team: [],
  location: ''
};

const projectTypes = ['Installation', 'Maintenance', 'Upgrade', 'Commercial', 'Residential'];
const statusOptions = ['Planning', 'In Progress', 'On Hold', 'Completed'];

// Mock data for customers and team members
const customers = [
  'John Doe',
  'ABC Corporation',
  'XYZ Industries',
  'Smith Family'
];

const teamMembers = [
  'Mike Ross',
  'Rachel Green',
  'Harvey Specter',
  'Donna Paulsen',
  'Louis Litt'
];

const ProjectForm = ({ open, onClose, onSubmit, initialData = null }) => {
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }
    if (!formData.customer) {
      newErrors.customer = 'Customer is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (formData.budget === '' || isNaN(formData.budget) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Valid budget is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
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
    >
      <DialogTitle>
        <Typography variant="h6">
          {initialData ? 'Edit Project' : 'Add New Project'}
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
                label="Project Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={formData.customer}
                onChange={(event, newValue) => {
                  setFormData(prev => ({
                    ...prev,
                    customer: newValue
                  }));
                }}
                options={customers}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Customer"
                    required
                    error={Boolean(errors.customer)}
                    helperText={errors.customer}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Project Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Project Type"
                >
                  {projectTypes.map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                error={Boolean(errors.budget)}
                helperText={errors.budget}
                required
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>

            {/* Timeline */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Timeline
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors.startDate)}
                helperText={errors.startDate}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors.endDate)}
                helperText={errors.endDate}
                required
              />
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

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Progress (%)"
                name="progress"
                type="number"
                value={formData.progress}
                onChange={handleChange}
                InputProps={{
                  inputProps: { min: 0, max: 100 }
                }}
              />
            </Grid>

            {/* Team and Location */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Team & Location
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                value={formData.team}
                onChange={(event, newValue) => {
                  setFormData(prev => ({
                    ...prev,
                    team: newValue
                  }));
                }}
                options={teamMembers}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Team Members"
                    placeholder="Add team members"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={Boolean(errors.location)}
                helperText={errors.location}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Add project description..."
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
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Update' : 'Add'} Project
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProjectForm; 