import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  AvatarGroup,
  Chip,
  Button,
  Menu,
  MenuItem,
  Stack
} from '@mui/material';
import {
  TrendingUp,
  People,
  Assignment,
  AttachMoney,
  MoreVert,
  CheckCircle,
  Warning,
  Schedule,
  Engineering,
  CalendarToday,
  LocationOn,
  FilterList
} from '@mui/icons-material';
import ReportGenerator from '../components/ReportGenerator/ReportGenerator';

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeFilter, setTimeFilter] = useState('This Month');

  // Mock data
  const stats = {
    totalProjects: 24,
    activeProjects: 12,
    totalCustomers: 45,
    totalRevenue: 156000,
    projectProgress: 68,
    recentProjects: [
      {
        id: 1,
        name: 'Solar Panel Installation',
        customer: 'John Doe',
        status: 'In Progress',
        progress: 75,
        team: ['Mike R.', 'Sarah L.', 'Tom K.'],
        location: 'New York, NY',
        dueDate: '2024-03-15'
      },
      {
        id: 2,
        name: 'Commercial Solar Farm',
        customer: 'ABC Corp',
        status: 'Planning',
        progress: 25,
        team: ['Alex M.', 'Lisa P.'],
        location: 'Los Angeles, CA',
        dueDate: '2024-04-20'
      },
      {
        id: 3,
        name: 'Residential Battery Setup',
        customer: 'Smith Family',
        status: 'Completed',
        progress: 100,
        team: ['David K.', 'Emma S.'],
        location: 'Chicago, IL',
        dueDate: '2024-02-28'
      }
    ],
    upcomingTasks: [
      {
        id: 1,
        title: 'Site Survey',
        project: 'Commercial Solar Farm',
        dueDate: '2024-03-15',
        priority: 'High',
        assignee: 'Mike R.'
      },
      {
        id: 2,
        title: 'Equipment Delivery',
        project: 'Solar Panel Installation',
        dueDate: '2024-03-20',
        priority: 'Medium',
        assignee: 'Sarah L.'
      }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'success',
      'In Progress': 'info',
      'Planning': 'warning',
      'On Hold': 'error'
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'error',
      'Medium': 'warning',
      'Low': 'success'
    };
    return colors[priority] || 'default';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Filters and Report Generator */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Stack spacing={1}>
          <Typography variant="h4">
            Dashboard
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Welcome back! Here's what's happening with your projects.
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {timeFilter}
          </Button> */}
          <ReportGenerator data={stats} reportType="dashboard" />
        </Box>
      </Box>

      {/* Time Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {['Today', 'This Week', 'This Month', 'This Quarter', 'This Year'].map((filter) => (
          <MenuItem 
            key={filter}
            onClick={() => {
              setTimeFilter(filter);
              setAnchorEl(null);
            }}
            selected={timeFilter === filter}
          >
            {filter}
          </MenuItem>
        ))}
      </Menu>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                    Total Projects
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalProjects}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Assignment />
                </Avatar>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp color="success" fontSize="small" />
                <Typography variant="body2" color="success.main">
                  +12% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                    Active Projects
                  </Typography>
                  <Typography variant="h4">
                    {stats.activeProjects}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <Engineering />
                </Avatar>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp color="success" fontSize="small" />
                <Typography variant="body2" color="success.main">
                  +5% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                    Total Customers
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalCustomers}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <People />
                </Avatar>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp color="success" fontSize="small" />
                <Typography variant="body2" color="success.main">
                  +8% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4">
                    ${stats.totalRevenue.toLocaleString()}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <AttachMoney />
                </Avatar>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp color="success" fontSize="small" />
                <Typography variant="body2" color="success.main">
                  +15% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Project Progress and Tasks */}
      <Grid container spacing={3}>
        {/* Project Progress */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">
                Project Progress
              </Typography>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            
            <List>
              {stats.recentProjects.map((project, index) => (
                <React.Fragment key={project.id}>
                  {index > 0 && <Divider sx={{ my: 2 }} />}
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1">
                            {project.name}
                          </Typography>
                          <Chip 
                            label={project.status}
                            size="small"
                            color={getStatusColor(project.status)}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocationOn fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary">
                                {project.location}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <CalendarToday fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary">
                                Due: {project.dueDate}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {project.progress}% Complete
                            </Typography>
                            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.875rem' } }}>
                              {project.team.map((member, idx) => (
                                <Avatar key={idx}>{member.charAt(0)}</Avatar>
                              ))}
                            </AvatarGroup>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={project.progress} 
                            sx={{ 
                              height: 6, 
                              borderRadius: 1,
                              bgcolor: 'action.hover',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 1
                              }
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Tasks */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Tasks
            </Typography>
            <List>
              {stats.upcomingTasks.map((task, index) => (
                <React.Fragment key={task.id}>
                  {index > 0 && <Divider sx={{ my: 2 }} />}
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1">
                            {task.title}
                          </Typography>
                          <Chip 
                            label={task.priority}
                            size="small"
                            color={getPriorityColor(task.priority)}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {task.project}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Schedule fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary">
                                Due: {task.dueDate}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Assigned to:
                              </Typography>
                              <Avatar sx={{ width: 24, height: 24, fontSize: '0.875rem' }}>
                                {task.assignee.charAt(0)}
                              </Avatar>
                            </Box>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;