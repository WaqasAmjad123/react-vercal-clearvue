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
  Card,
  CardContent,
  Avatar,
  Alert
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Edit,
  Delete,
  Assignment,
  AttachMoney,
  Business,
  Description,
  Schedule,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import DetailPageHeader from '../../components/common/DetailPageHeader';

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

const CustomerDetails = ({ customer, onEdit, onDelete, onClose }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'success',
      'Inactive': 'error',
      'Pending': 'warning',
      'Completed': 'success',
      'In Progress': 'info'
    };
    return colors[status] || 'default';
  };

  if (!customer) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Customer not found
        </Alert>
      </Box>
    );
  }

  // Add default empty arrays if properties don't exist
  const customerData = {
    ...customer,
    projects: customer.projects || [],
    transactions: customer.transactions || [],
    notes: customer.notes || ''
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>
      <DetailPageHeader
        title="Customer Details"
        onEdit={onEdit}
        onDelete={onDelete}
        onClose={onClose}
      />

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Customer Summary Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{ 
                  width: 64, 
                  height: 64, 
                  bgcolor: 'primary.main',
                  mr: 2
                }}
              >
                {customer.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6">{customer.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Customer ID: #{customer.id}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Email color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Email"
                  secondary={customer.email}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Phone"
                  secondary={customer.phone}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Address"
                  secondary={customer.address}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Business color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Type"
                  secondary={customer.type}
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      {customer.projectCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Projects
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      ${customer.totalSpent.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Spent
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Tabs Section */}
        <Grid item xs={12} md={8}>
          <Paper>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Projects" />
              <Tab label="Transactions" />
              <Tab label="Notes" />
            </Tabs>

            {/* Projects Tab */}
            <TabPanel value={tabValue} index={0}>
              {customerData.projects.length > 0 ? (
                <List>
                  {customerData.projects.map((project) => (
                    <Paper 
                      key={project.id}
                      sx={{ 
                        mb: 2, 
                        p: 2,
                        '&:hover': {
                          bgcolor: 'action.hover'
                        }
                      }}
                    >
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1">
                            {project.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Date: {project.date}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Chip 
                            label={project.status}
                            color={getStatusColor(project.status)}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="h6" align="right">
                            ${project.value.toLocaleString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No projects found for this customer.
                </Typography>
              )}
            </TabPanel>

            {/* Transactions Tab */}
            <TabPanel value={tabValue} index={1}>
              {customerData.transactions.length > 0 ? (
                <List>
                  {customerData.transactions.map((transaction) => (
                    <Paper 
                      key={transaction.id}
                      sx={{ 
                        mb: 2, 
                        p: 2,
                        '&:hover': {
                          bgcolor: 'action.hover'
                        }
                      }}
                    >
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1">
                            {transaction.type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Date: {transaction.date}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Chip 
                            label={transaction.status}
                            color={getStatusColor(transaction.status)}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography 
                            variant="h6" 
                            align="right"
                            color={transaction.type === 'Payment' ? 'success.main' : 'inherit'}
                          >
                            ${transaction.amount.toLocaleString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No transactions found for this customer.
                </Typography>
              )}
            </TabPanel>

            {/* Notes Tab */}
            <TabPanel value={tabValue} index={2}>
              {customerData.notes ? (
                <Typography variant="body1">
                  {customerData.notes}
                </Typography>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No notes available for this customer.
                </Typography>
              )}
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerDetails; 