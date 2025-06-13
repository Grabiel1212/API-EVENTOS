import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00c1d4',
      light: '#a0e7eb',
      dark: '#00a8b5',
      contrastText: '#fff',
    },
    secondary: {
      main: '#212121',
      contrastText: '#fff',
    },
    background: {
      default: '#0a1929',
      paper: '#001e3c',
    },
    text: {
      primary: '#f3f6f9',
      secondary: '#b2bac2',
    },
  },
  typography: {
    fontFamily: [
      '"Poppins"',
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif'
    ].join(','),
    button: {
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          transition: 'all 0.5s ease',
        },
      },
    },
  },
  transitions: {
    duration: {
      enteringScreen: 800,
      leavingScreen: 500,
    },
  },
});

export default theme;