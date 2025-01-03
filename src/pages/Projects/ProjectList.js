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
  ButtonGroup,
  LinearProgress
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  Search,
  Visibility,
  ViewList,
  ViewModule,
  Assignment,
  Person,
  CalendarToday,
  AttachMoney
} from '@mui/icons-material';
import ProjectForm from './ProjectForm';
import ProjectDetails from './ProjectDetails';

// Mock data for initial projects
const initialProjects = [
  {
    id: 1,
    name: 'Solar Panel Installation',
    customer: 'John Doe',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    status: 'In Progress',
    budget: 25000,
    progress: 65,
    type: 'Installation',
    description: 'Residential solar panel installation with battery backup',
    team: ['Mike Ross', 'Rachel Green'],
    location: '123 Solar St, Sun City, SC 12345'
  },
  {
    id: 2,
    name: 'Commercial Solar Farm',
    customer: 'ABC Corporation',
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    status: 'Planning',
    budget: 150000,
    progress: 25,
    type: 'Commercial',
    description: 'Large scale commercial solar farm installation',
    team: ['Harvey Specter', 'Donna Paulsen'],
    location: '456 Power Ave, Energy City, EC 67890'
  }
];

const ProjectList = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [selectedProject, setSelectedProject] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const filteredProjects = projects.filter(project =>
    Object.values(project).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setOpenDetails(true);
  };

  const handleAdd = () => {
    setSelectedProject(null);
    setOpenForm(true);
  };

  const handleSubmit = (formData) => {
    // Format dates to strings if they're Date objects
    const formattedData = {
      ...formData,
      startDate: formData.startDate instanceof Date 
        ? formData.startDate.toISOString().split('T')[0]
        : formData.startDate,
      endDate: formData.endDate instanceof Date 
        ? formData.endDate.toISOString().split('T')[0]
        : formData.endDate
    };

    if (selectedProject) {
      setProjects(projects.map(project =>
        project.id === selectedProject.id
          ? { ...formattedData, id: project.id }
          : project
      ));
    } else {
      setProjects([...projects, { ...formattedData, id: Date.now() }]);
    }
    setOpenForm(false);
    setSelectedProject(null);
  };

  const confirmDelete = () => {
    setProjects(projects.filter(project => project.id !== selectedProject.id));
    setOpenDelete(false);
    setSelectedProject(null);
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

  const renderGridView = () => (
    <Grid container spacing={3}>
      {filteredProjects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
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
                  <Assignment />
                </Avatar>
                <Box>
                  <Typography variant="h6" noWrap>
                    {project.name}
                  </Typography>
                  <Chip 
                    label={project.type}
                    size="small"
                    color="primary"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Person fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {project.customer}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarToday fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {project.startDate} - {project.endDate}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AttachMoney fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    ${project.budget.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Progress
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.progress}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={project.progress} 
                  sx={{ height: 6, borderRadius: 1 }}
                />
              </Box>

              <Chip 
                label={project.status}
                color={getStatusColor(project.status)}
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
                    onClick={() => handleViewDetails(project)}
                    fullWidth
                  >
                    Details
                  </Button>
                </Tooltip>
                <Tooltip title="Edit Project">
                  <Button
                    size="small"
                    variant="outlined"
                    color="info"
                    startIcon={<Edit />}
                    onClick={() => {
                      setSelectedProject(project);
                      setOpenForm(true);
                    }}
                    fullWidth
                  >
                    Edit
                  </Button>
                </Tooltip>
                <Tooltip title="Delete Project">
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => {
                      setSelectedProject(project);
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your solar installation projects
        </Typography>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          placeholder="Search projects..."
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
            Add Project
          </Button>
        </Box>
      </Box>

      {viewMode === 'table' ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Timeline</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {project.name}
                      <Chip 
                        label={project.type}
                        size="small"
                        color="primary"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{project.customer}</TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {project.startDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.endDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={project.status}
                      color={getStatusColor(project.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={project.progress} 
                        sx={{ width: 100, height: 6, borderRadius: 1 }}
                      />
                      <Typography variant="body2">
                        {project.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>${project.budget.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small"
                          color="primary"
                          onClick={() => handleViewDetails(project)}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Project">
                        <IconButton 
                          size="small"
                          color="info"
                          onClick={() => {
                            setSelectedProject(project);
                            setOpenForm(true);
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Project">
                        <IconButton 
                          size="small"
                          color="error"
                          onClick={() => {
                            setSelectedProject(project);
                            setOpenDelete(true);
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

      {/* Project Form Modal */}
      {openForm && (
        <ProjectForm
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            setSelectedProject(null);
          }}
          onSubmit={handleSubmit}
          initialData={selectedProject}
        />
      )}

      {/* Project Details Modal */}
      {openDetails && (
        <Dialog
          open={openDetails}
          onClose={() => {
            setOpenDetails(false);
            setSelectedProject(null);
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
              <ProjectDetails 
                project={selectedProject}
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
                  setSelectedProject(null);
                }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedProject?.name}? This action cannot be undone.
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

export default ProjectList; 