// src/layouts/UserPanel.tsx
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
  profilePicture?: string;
}

interface UserPanelProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  userData: UserData | null;
}

export default function UserPanel({ 
  anchorEl, 
  open, 
  onClose, 
  onLogout,
  userData
}: UserPanelProps) {
  if (!open || !anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right - 16,
        zIndex: 1500,
        minWidth: 240,
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Avatar 
          src={userData?.profilePicture} 
          sx={{ 
            width: 64, 
            height: 64, 
            mb: 2,
            bgcolor: '#10b981',
          }}
        >
          {!userData?.profilePicture && <AccountCircleIcon sx={{ fontSize: 40 }} />}
        </Avatar>
        
        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
          {userData?.name || 'Usuario'}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {userData?.email || 'usuario@ejemplo.com'}
        </Typography>
      </Box>
      
      <Divider />
      
      <MenuList autoFocus>
        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="userinfo" style={{ textDecoration: 'none', color: 'inherit' }}>
              Mi perfil
            </Link>
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <ConfirmationNumberIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="entradas" style={{ textDecoration: 'none', color: 'inherit' }}>
              Mis entradas
            </Link>
          </ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => {
          onLogout();
          window.location.reload(); // Recarga completa de la página
        }} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Cerrar sesión</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}