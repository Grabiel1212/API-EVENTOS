import EventIcon from '@mui/icons-material/Event';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

import { createTheme } from '@mui/material/styles';
import { type Navigation } from '@toolpad/core/AppProvider';
import Imagen from '../../assets/perfil.jpg';

import type { User } from '../../interfaces/User';

// Menú de navegación principal
export const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Menu Principal' },
  { segment: 'admin/home', title: 'Inicio', icon: <HomeIcon /> },
  { segment: 'admin/usuarios', title: 'Usuarios', icon: <PeopleIcon /> },
  { segment: 'admin/eventos', title: 'Eventos', icon: <EventIcon /> },
  { segment: 'admin/categorias', title: 'Categorías', icon: <CategoryIcon /> },
  { segment: 'admin/pagos', title: 'Pagos', icon: <CreditCardIcon /> },
  { segment: 'admin/registros', title: 'Registros', icon: <PersonAddAltIcon /> },
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
