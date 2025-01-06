import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Tab,
  Tabs,
  Paper,
  LinearProgress,
  AvatarGroup,
  Tooltip
} from '@mui/material';
import {
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

const ProjectDetails = ({ project, onEdit, onDelete, onClose }) => {
  const [tabValue, setTabValue] = useState(0);

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

  if (!project) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Project not found
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>
      <DetailPageHeader
        title="Project Details"
        onEdit={onEdit}
        onDelete={onDelete}
        onClose={onClose}
      />

      {/* Main Content */}
      <Grid container spacing={3} sx={{ px: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
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
            </CardContent>
          </Card>
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
                  {project.milestones?.map((milestone, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {milestone.completed ? (
                              <CheckCircle color="success" />
                            ) : (
                              <Schedule color="warning" />
                            )}
                            <Typography variant="subtitle1">
                              {milestone.name}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Due: {milestone.dueDate}
                          </Typography>
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
                {project.timeline?.map((item, index) => (
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
                {project.comments?.map((comment) => (
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