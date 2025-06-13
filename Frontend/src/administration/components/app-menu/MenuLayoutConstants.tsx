// src/components/MenuLayoutConstants.ts
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventIcon from '@mui/icons-material/Event';
import BarChartIcon from '@mui/icons-material/BarChart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { createTheme } from '@mui/material/styles';
import { type Navigation } from '@toolpad/core/AppProvider';

export const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Menu Principal' },
  { segment: 'admin/home', title: 'Inicio', icon: <HomeIcon /> },
  { segment: 'admin/usuarios', title: 'Usuarios', icon: <PeopleIcon /> },
  { segment: 'admin/administrador', title: 'Administrador', icon: <AdminPanelSettingsIcon /> },
  { segment: 'admin/eventos', title: 'Eventos', icon: <EventIcon/>},
  { segment: 'admin/categorias', title: 'Categorías', icon: <CategoryIcon /> },
  { segment: 'admin/pagos', title:'Pagos', icon:<CreditCardIcon/>},
  { segment: 'admin/registros', title:'Registros', icon:<PersonAddAltIcon/>},
  { segment: 'admin/reportes', title: 'Reportes', icon: <BarChartIcon /> },

];

export const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { 
    light: { 
      palette: {
        primary: { main: '#1976d2' }
      }
    }, 
    dark: { 
      palette: {
        primary: { main: '#90caf9' }
      }
    } 
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  transitions: {
    duration: {
      enteringScreen: 300,
      leavingScreen: 300,
    }
  }
});