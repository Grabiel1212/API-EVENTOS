import CategoryIcon from '@mui/icons-material/Category';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

import { createTheme } from '@mui/material/styles';
import { type Navigation } from '@toolpad/core/AppProvider';
import Imagen from '../../assets/perfil.jpg';

import type { User } from '../../interfaces/User';

// Menú de navegación principal
export const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Menú Principal' },
  { segment: 'admin/home', title: 'Inicio', icon: <HomeIcon /> },
  { segment: 'admin/usuarios', title: 'Usuarios', icon: <PeopleIcon /> },
  { segment: 'admin/eventos', title: 'Eventos', icon: <EventIcon /> },
  { segment: 'admin/categorias', title: 'Categorías', icon: <CategoryIcon /> },
  {
    segment: '',
    title: 'Reportes',
    icon: <CreditCardIcon />,
    children: [
      {
        segment: 'admin/reportes/general',
        title: 'Reporte General',
      },
      {
        segment: 'admin/reportes/usuarios',
        title: 'Resumen por Usuario',
      },
      {
        segment: 'admin/reportes/usuario',
        title: 'Detalle por Usuario',
      },
    ],
  },
];



// Tema personalizado
export const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#90caf9' },
      },
    },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  transitions: {
    duration: {
      enteringScreen: 300,
      leavingScreen: 300,
    },
  },
});

// Datos de usuario de prueba (para pruebas visuales)
export const usuarioPrueba: User = {
  nombre: 'Julio César',
  correo: 'julio@example.com',
  foto: Imagen,
};
