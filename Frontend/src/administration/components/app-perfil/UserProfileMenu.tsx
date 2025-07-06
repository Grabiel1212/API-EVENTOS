import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Visibility from '@mui/icons-material/Visibility';
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  user: {
    name: string;       // Nombre completo
    email: string;      // Correo electrónico
    photo: string;      // URL de la foto
    role: string;       // Rol del usuario (ADMIN)
  };
}

const UserProfileMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.clear();
    window.location.href = '/login';
  };

  // Verificar si el usuario es ADMIN
  if (user.role !== 'ADMIN') {
    return null; // O mostrar un mensaje de error
  }


  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar src={user.photo} alt={user.name} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ sx: { width: 280 } }}>
        <List disablePadding>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={user.photo} />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography fontWeight="bold">{user.name}</Typography>}
              secondary={user.email}
            />
          </ListItem>
        </List>

        <Divider />

        <MenuItem onClick={handleClose}>
          <Visibility fontSize="small" sx={{ mr: 1 }} />
          Ver perfil
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Settings fontSize="small" sx={{ mr: 1 }} />
          Configurar cuenta
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" sx={{ mr: 1 }} />
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfileMenu;
