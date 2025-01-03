import { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Tab,
  Tabs,
  IconButton,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Tooltip,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Line,
  Bar,
  Doughnut
} from 'react-chartjs-2';
import {
  Download,
  Print,
  Share,
  TrendingUp,
  TrendingDown,
  Info
} from '@mui/icons-material';
import { commonOptions } from '../../utils/chartConfig';

const StatCard = ({ title, value, trend, percentage, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="subtitle2">
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            bgcolor: `${color}15`,
            p: 0.5,
            borderRadius: 1
          }}
        >
          {trend === 'up' ? (
            <TrendingUp sx={{ color: 'success.main', fontSize: 20 }} />
          ) : (
            <TrendingDown sx={{ color: 'error.main', fontSize: 20 }} />
          )}
          <Typography 
            variant="body2"
            sx={{ 
              color: trend === 'up' ? 'success.main' : 'error.main',
              ml: 0.5
            }}
          >
            {percentage}%
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const ReportsDashboard = () => {
  const [reportType, setReportType] = useState('energy');
  const [timeRange, setTimeRange] = useState('month');
  const [tabValue, setTabValue] = useState(0);
  
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  });
  const [filteredData, setFilteredData] = useState(null);
  const [energyChartData, setEnergyChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Energy Production (kWh)',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      }
    ]
  });
  const [projectsChartData, setProjectsChartData] = useState({
    labels: ['Planned', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      }
    ]
  });
  const [performanceData, setPerformanceData] = useState([
    { location: 'Building A', efficiency: 95, production: '450 kWh', status: 'Optimal' },
    { location: 'Building B', efficiency: 88, production: '380 kWh', status: 'Good' },
    { location: 'Building C', efficiency: 76, production: '290 kWh', status: 'Need Maintenance' },
    { location: 'Building D', efficiency: 92, production: '420 kWh', status: 'Optimal' },
  ]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleExport = async () => {
    setLoading(true);
    try {
      const data = {
        energyData: energyChartData,
        projectData: projectsChartData,
        performanceData: performanceData,
        stats: {
          totalEnergy: "45.2 kWh",
          efficiency: "87.5%",
          activeInstallations: 34,
          maintenanceNeeded: 3
        }
      };

      const csvContent = generateCSV(data);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `solar-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    setLoading(true);
    try {
      const shareData = {
        title: 'Solar Installation Report',
        text: `Solar Report Summary - ${timeRange}\nTotal Energy: ${performanceData.reduce((acc, curr) => acc + parseInt(curr.production), 0)} kWh`,
        url: window.location.href
      };

      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        setSnackbar({
          open: true,
          message: 'Report shared successfully!',
          severity: 'success'
        });
      } else {
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        setSnackbar({
          open: true,
          message: 'Report link copied to clipboard!',
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Share failed:', error);
      setSnackbar({
        open: true,
        message: 'Failed to share report. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFilterChange = async () => {
    setLoading(true);
    try {
      const newData = await fetchFilteredData(reportType, timeRange, dateRange);
      setFilteredData(newData);
    } catch (error) {
      console.error('Filter failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateCSV = (data) => {
    const headers = ['Location', 'Efficiency', 'Production', 'Status'];
    const rows = data.performanceData.map(row => 
      [row.location, row.efficiency, row.production, row.status].join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  };

  const fetchFilteredData = async (type, range, dates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          energy: generateMockEnergyData(range),
          projects: generateMockProjectData(),
          performance: generateMockPerformanceData()
        };
        resolve(data);
      }, 1000);
    });
  };

  const generateMockEnergyData = (range) => {
    const points = range === 'day' ? 24 : 
                  range === 'week' ? 7 : 
                  range === 'month' ? 30 : 12;
    
    return {
      labels: Array.from({ length: points }, (_, i) => i.toString()),
      datasets: [{
        label: 'Energy Production (kWh)',
        data: Array.from({ length: points }, () => Math.random() * 100),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      }]
    };
  };

  const generateMockProjectData = () => {
    return {
      labels: ['Planned', 'In Progress', 'Completed'],
      datasets: [{
        data: [
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 20)
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      }]
    };
  };

  const generateMockPerformanceData = () => {
    return [
      {
        location: 'Building A',
        efficiency: Math.floor(Math.random() * 20) + 80, // 80-100
        production: `${Math.floor(Math.random() * 200) + 300} kWh`, // 300-500 kWh
        status: Math.random() > 0.7 ? 'Need Maintenance' : Math.random() > 0.4 ? 'Good' : 'Optimal'
      },
      {
        location: 'Building B',
        efficiency: Math.floor(Math.random() * 20) + 80,
        production: `${Math.floor(Math.random() * 200) + 300} kWh`,
        status: Math.random() > 0.7 ? 'Need Maintenance' : Math.random() > 0.4 ? 'Good' : 'Optimal'
      },
      {
        location: 'Building C',
        efficiency: Math.floor(Math.random() * 20) + 80,
        production: `${Math.floor(Math.random() * 200) + 300} kWh`,
        status: Math.random() > 0.7 ? 'Need Maintenance' : Math.random() > 0.4 ? 'Good' : 'Optimal'
      },
      {
        location: 'Building D',
        efficiency: Math.floor(Math.random() * 20) + 80,
        production: `${Math.floor(Math.random() * 200) + 300} kWh`,
        status: Math.random() > 0.7 ? 'Need Maintenance' : Math.random() > 0.4 ? 'Good' : 'Optimal'
      }
    ];
  };

  useEffect(() => {
    handleFilterChange();
  }, []); // Load initial data

  useEffect(() => {
    if (filteredData) {
      // Update charts with new data
      setEnergyChartData(filteredData.energy);
      setProjectsChartData(filteredData.projects);
      setPerformanceData(filteredData.performance);
    }
  }, [filteredData]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Reports & Analytics</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            startIcon={<Download />} 
            variant="outlined"
            onClick={handleExport}
            disabled={loading}
          >
            Export
          </Button>
          <Button 
            startIcon={<Print />} 
            variant="outlined"
            onClick={handlePrint}
            disabled={loading}
          >
            Print
          </Button>
          {/* <Button 
            startIcon={<Share />} 
            variant="contained"
            onClick={handleShare}
            disabled={loading}
          >
            Share
          </Button> */}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Energy Generated"
            value="45.2 kWh"
            trend="up"
            percentage="12"
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Average Efficiency"
            value="87.5%"
            trend="up"
            percentage="5"
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Installations"
            value="34"
            trend="up"
            percentage="8"
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Maintenance Needed"
            value="3"
            trend="down"
            percentage="25"
            color="#f44336"
          />
        </Grid>

        {/* Filters */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                select
                label="Report Type"
                value={reportType}
                onChange={(e) => {
                  setReportType(e.target.value);
                  handleFilterChange();
                }}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="energy">Energy Production</MenuItem>
                <MenuItem value="efficiency">Efficiency Analysis</MenuItem>
                <MenuItem value="maintenance">Maintenance Report</MenuItem>
              </TextField>
              <TextField
                select
                label="Time Range"
                value={timeRange}
                onChange={(e) => {
                  setTimeRange(e.target.value);
                  handleFilterChange();
                }}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="day">Last 24 Hours</MenuItem>
                <MenuItem value="week">Last Week</MenuItem>
                <MenuItem value="month">Last Month</MenuItem>
                <MenuItem value="year">Last Year</MenuItem>
              </TextField>
            </Box>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Energy Production Trend
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line data={energyChartData} options={commonOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Project Status Distribution
            </Typography>
            <Box sx={{ height: 400 }}>
              <Doughnut data={projectsChartData} options={commonOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Performance Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Installation Performance
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>Efficiency</TableCell>
                    <TableCell>Production</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Trend</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {performanceData.map((row) => (
                    <TableRow key={row.location}>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={row.efficiency}
                            sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2">
                            {row.efficiency}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.production}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status}
                          color={row.status === 'Optimal' ? 'success' : 
                                row.status === 'Good' ? 'primary' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Line 
                          data={{
                            labels: ['', '', '', '', ''],
                            datasets: [{
                              data: [65, 59, 80, 81, 56],
                              borderColor: 'rgb(75, 192, 192)',
                              pointRadius: 0,
                              tension: 0.4
                            }]
                          }}
                          options={{
                            ...commonOptions,
                            plugins: { legend: { display: false } },
                            scales: { x: { display: false }, y: { display: false } }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReportsDashboard; 