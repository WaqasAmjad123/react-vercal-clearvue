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
  Avatar
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

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);

  // Mock customer data - replace with API call
  const [customer] = React.useState({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-234-567-8900',
    address: '123 Main St, City, State 12345',
    type: 'Residential',
    status: 'Active',
    projectCount: 2,
    totalSpent: 25000,
    notes: 'Premium customer with excellent payment history',
    projects: [
      {
        id: 1,
        name: 'Solar Panel Installation',
        status: 'Completed',
        date: '2024-01-15',
        value: 15000
      },
      {
        id: 2,
        name: 'Battery System Upgrade',
        status: 'In Progress',
        date: '2024-02-01',
        value: 10000
      }
    ],
    transactions: [
      {
        id: 1,
        type: 'Payment',
        amount: 5000,
        date: '2024-01-10',
        status: 'Completed'
      },
      {
        id: 2,
        type: 'Invoice',
        amount: 10000,
        date: '2024-01-15',
        status: 'Pending'
      }
    ]
  });

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

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Customer Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip 
              label={customer.type} 
              color="primary"
              size="small"
            />
            <Chip 
              label={customer.status} 
              color={getStatusColor(customer.status)}
              size="small"
            />
          </Box>
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
              <List>
                {customer.projects.map((project) => (
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
            </TabPanel>

            {/* Transactions Tab */}
            <TabPanel value={tabValue} index={1}>
              <List>
                {customer.transactions.map((transaction) => (
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
            </TabPanel>

            {/* Notes Tab */}
            <TabPanel value={tabValue} index={2}>
              <Typography variant="body1">
                {customer.notes}
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerDetails; 