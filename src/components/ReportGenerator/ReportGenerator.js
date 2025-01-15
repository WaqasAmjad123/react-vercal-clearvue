import React, { useState, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Alert,
  Stack,
  Typography,
  Box
} from '@mui/material';
import { PictureAsPdf, Download } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportGenerator = ({ data, reportType }) => {
  const chartRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({
    includeCharts: true,
    includeDetails: true,
    includeSummary: true,
  });

  const chartData = {
    labels: data.recentProjects.map(project => project.name),
    datasets: [
      {
        label: 'Project Progress',
        data: data.recentProjects.map(project => project.progress),
        backgroundColor: '#71fcca',
        borderColor: '#71fcca',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Progress (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Projects'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Project Progress'
      }
    }
  };

  const handleOptionChange = (event) => {
    setOptions({
      ...options,
      [event.target.name]: event.target.checked,
    });
  };

  const generateReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Add header
      doc.setFontSize(20);
      doc.text('Solar Project Report', pageWidth / 2, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });

      let yPos = 40;

      // Add summary if selected
      if (options.includeSummary) {
        doc.setFontSize(16);
        doc.text('Summary', 20, yPos);
        yPos += 10;

        const summaryData = [
          ['Total Projects', data.totalProjects],
          ['Active Projects', data.activeProjects],
          ['Total Revenue', `$${data.totalRevenue.toLocaleString()}`],
          ['Project Progress', `${data.projectProgress}%`],
        ];

        doc.autoTable({
          startY: yPos,
          head: [['Metric', 'Value']],
          body: summaryData,
          margin: { left: 20 },
          theme: 'grid',
        });

        yPos = doc.lastAutoTable.finalY + 20;
      }

      // Add project details if selected
      if (options.includeDetails) {
        doc.setFontSize(16);
        doc.text('Project Details', 20, yPos);
        yPos += 10;

        const projectData = data.recentProjects.map(project => [
          project.name,
          project.customer,
          project.status,
          `${project.progress}%`,
        ]);

        doc.autoTable({
          startY: yPos,
          head: [['Project Name', 'Customer', 'Status', 'Progress']],
          body: projectData,
          margin: { left: 20 },
          theme: 'striped',
        });

        yPos = doc.lastAutoTable.finalY + 20;
      }

      // Add charts if selected (now using actual chart)
      if (options.includeCharts && chartRef.current) {
        doc.setFontSize(16);
        doc.text('Project Progress Chart', 20, yPos);
        yPos += 10;

        // Convert chart to image
        const canvas = chartRef.current.canvas;
        const chartImage = canvas.toDataURL('image/png', 1.0);
        
        // Calculate dimensions to maintain aspect ratio
        const chartWidth = 170;
        const chartHeight = (canvas.height * chartWidth) / canvas.width;
        
        // Add chart image to PDF
        doc.addImage(chartImage, 'PNG', 20, yPos, chartWidth, chartHeight);
        yPos += chartHeight + 10;
      }

      // Save the PDF
      doc.save(`solar-report-${new Date().toISOString().split('T')[0]}.pdf`);
      setOpen(false);
    } catch (err) {
      setError('Failed to generate report. Please try again.');
      console.error('Report generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PictureAsPdf />}
        onClick={() => setOpen(true)}
      >
        Generate Report
      </Button>

      <Dialog
        open={open}
        onClose={() => !loading && setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate Report</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
            
            <Typography variant="body2" color="text.secondary">
              Select the components to include in your report:
            </Typography>

            <FormControl component="fieldset">
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.includeSummary}
                      onChange={handleOptionChange}
                      name="includeSummary"
                    />
                  }
                  label="Include Summary"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.includeDetails}
                      onChange={handleOptionChange}
                      name="includeDetails"
                    />
                  }
                  label="Include Project Details"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options.includeCharts}
                      onChange={handleOptionChange}
                      name="includeCharts"
                    />
                  }
                  label="Include Charts"
                />
              </Stack>
            </FormControl>

            {options.includeCharts && (
              <Box sx={{ height: 300, mt: 2 }}>
                <Bar
                  ref={chartRef}
                  data={chartData}
                  options={chartOptions}
                />
              </Box>
            )}

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpen(false)} 
            disabled={loading}
            sx={{ 
              color: 'primary.main',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={generateReport}
            disabled={loading}
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <Download />}
          >
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReportGenerator; 