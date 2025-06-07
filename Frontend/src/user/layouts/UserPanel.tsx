import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

interface UserPanelProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function UserPanel({ anchorEl, open, onClose, onLogout }: UserPanelProps) {
  if (!open || !anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: rect.bottom + 8,
        left: rect.left - 80,
        zIndex: 1500,
        minWidth: 180,
        bgcolor: 'white',
        borderRadius: 2,
      }}
    >
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
            </Link></ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Salir</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
