import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0a183b',
      light: '#1a2855',
      dark: '#060d24',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#71fcca',
      light: '#8ffdd5',
      dark: '#5ad9ac',
      contrastText: '#0a183b'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 600,
        },
        contained: {
          background: 'linear-gradient(45deg, #71fcca 30%, #8df3ed 90%)',
          color: '#0a183b',
          '&:hover': {
            background: 'linear-gradient(45deg,  #8df3ed 30% ,#71fcca 90%) ',
          },
          '&.Mui-disabled': {
            background: 'linear-gradient(45deg, rgba(113, 252, 202, 0.5) 30%, rgba(143, 253, 213, 0.5) 90%)',
            color: '#0a183b',
          },
        },
        outlined: {
          borderColor: '#71fcca',
          color: '#0a183b',
          borderWidth: 2,
          '&:hover': {
            borderColor: '#8ffdd5',
            backgroundColor: 'rgba(113, 252, 202, 0.04)',
          },
          '&.Mui-disabled': {
            borderColor: 'rgba(113, 252, 202, 0.5)',
            color: 'rgba(113, 252, 202, 0.5)',
          },
        },
        text: {
          color: '#71fcca',
          '&:hover': {
            backgroundColor: 'rgba(113, 252, 202, 0.04)',
          },
          '&.Mui-disabled': {
            color: 'rgba(113, 252, 202, 0.5)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#71fcca',
          '&:hover': {
            backgroundColor: 'rgba(113, 252, 202, 0.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          '& .MuiButton-root': {
            backgroundColor: '#0a183b',
            // color: '#71fcca',
            borderColor: '#1a2855',
            '&:hover': {
              backgroundColor: '#1a2855',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(10, 24, 59, 0.5)',
              color: 'rgba(113, 252, 202, 0.5)',
            },
          },
          '& .MuiButton-outlined': {
            backgroundColor: 'transparent',
            borderColor: '#0a183b',
            color: '#0a183b',
            '&:hover': {
              backgroundColor: 'rgba(10, 24, 59, 0.04)',
              borderColor: '#1a2855',
            },
          },
        },
        grouped: {
          '&:not(:last-of-type)': {
            borderColor: '#1a2855',
          },
        },
      },
    },
  },
}); 