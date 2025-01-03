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
  LinearProgress,
  AvatarGroup
} from '@mui/material';
import {
  Edit,
  Delete,
  Close,
  Assignment,
  Person,
  CalendarToday,
  AttachMoney,
  LocationOn,
  Description,
  Engineering,
  Timeline,
  Comment,
  CheckCircle,
  Warning,
  Schedule,
  LocalShipping 
} from '@mui/icons-material';

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

const ProjectDetails = ({ project, onEdit, onDelete, onClose }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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

  // Mock data for timeline and comments
  const timeline = [
    { date: '2024-01-15', event: 'Project Started', type: 'milestone' },
    { date: '2024-01-20', event: 'Site Survey Completed', type: 'task' },
    { date: '2024-02-01', event: 'Equipment Delivered', type: 'delivery' },
    { date: '2024-02-15', event: 'Installation Phase 1', type: 'progress' }
  ];

  const comments = [
    { 
      id: 1, 
      user: 'Mike Ross', 
      date: '2024-01-16', 
      text: 'Initial site survey scheduled for next week' 
    },
    { 
      id: 2, 
      user: 'Rachel Green', 
      date: '2024-01-21', 
      text: 'Site survey report uploaded to documents' 
    }
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {project.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip 
              label={project.type} 
              color="primary"
              size="small"
            />
            <Chip 
              label={project.status} 
              color={getStatusColor(project.status)}
              size="small"
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={onDelete}
          >
            Delete
          </Button>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Project Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Project Overview
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Person color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Customer"
                  secondary={project.customer}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarToday color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Timeline"
                  secondary={`${project.startDate} - ${project.endDate}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AttachMoney color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Budget"
                  secondary={`$${project.budget.toLocaleString()}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Location"
                  secondary={project.location}
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Progress
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {project.progress}% Complete
                </Typography>
                <Chip 
                  label={project.status}
                  color={getStatusColor(project.status)}
                  size="small"
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={project.progress} 
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              Team Members
            </Typography>
            <AvatarGroup max={4} sx={{ justifyContent: 'flex-start', mb: 2 }}>
              {project.team.map((member, index) => (
                <Tooltip key={index} title={member}>
                  <Avatar>{member.charAt(0)}</Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>
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
              <Tab icon={<Description />} label="Details" />
              <Tab icon={<Timeline />} label="Timeline" />
              <Tab icon={<Comment />} label="Comments" />
            </Tabs>

            {/* Details Tab */}
            <TabPanel value={tabValue} index={0}>
              <Typography variant="body1" paragraph>
                {project.description}
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Key Milestones
                </Typography>
                <Grid container spacing={2}>
                  {['Site Survey', 'Equipment Delivery', 'Installation', 'Testing'].map((milestone, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {index < 2 ? (
                              <CheckCircle color="success" />
                            ) : (
                              <Schedule color="warning" />
                            )}
                            <Typography variant="subtitle1">
                              {milestone}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </TabPanel>

            {/* Timeline Tab */}
            <TabPanel value={tabValue} index={1}>
              <List>
                {timeline.map((item, index) => (
                  <ListItem key={index} sx={{ pb: 2 }}>
                    <ListItemIcon>
                      {item.type === 'milestone' && <CheckCircle color="success" />}
                      {item.type === 'task' && <Engineering color="primary" />}
                      {item.type === 'delivery' && <LocalShipping color="info" />}
                      {item.type === 'progress' && <Timeline color="warning" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.event}
                      secondary={item.date}
                    />
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            {/* Comments Tab */}
            <TabPanel value={tabValue} index={2}>
              <List>
                {comments.map((comment) => (
                  <ListItem key={comment.id} sx={{ flexDirection: 'column', alignItems: 'flex-start', pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {comment.user.charAt(0)}
                      </Avatar>
                      <Typography variant="subtitle2">
                        {comment.user}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {comment.date}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {comment.text}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDetails; 