// src/components/UserApp.tsx
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { useState } from 'react';

interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  foto_perfil: string;
  contraseña: string;
  rol: string;
}

export default function UserApp() {

  const [users, setUsers] = useState<User[]>([
    { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juliobq@gmail.com', foto_perfil: '1', contraseña: '123', rol: '1' },
    { id: 2, nombre: 'Caroline', apellido: 'Perez', email: 'caroline@gmail.com', foto_perfil: '2', contraseña: '1234', rol: '1' },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleOpenDialog = (user?: User) => {
    setCurrentUser(user ?? { id: 0, nombre: '', apellido: '', email: '', foto_perfil: '', contraseña: '', rol: '' });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentUser(null);
  };

  const handleSave = () => {
    if (!currentUser) return;
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === currentUser.id);
      return exists
        ? prev.map((u) => (u.id === currentUser.id ? currentUser : u))
        : [...prev, { ...currentUser, id: prev.length ? Math.max(...prev.map(u => u.id)) + 1 : 1 }];
    });
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Gestión de Usuarios</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Agregar usuario
        </Button>
      </Stack>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead 
  >
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Apellido</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Foto Perfil</strong></TableCell>
              <TableCell><strong>Contraseña</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell align="right"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.nombre}</TableCell>
                <TableCell>{user.apellido}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.foto_perfil}</TableCell>
                <TableCell>{user.contraseña}</TableCell>
                <TableCell>{user.rol}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">No hay usuarios registrados.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{currentUser && users.some(u => u.id === currentUser.id) ? 'Editar usuario' : 'Agregar usuario'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nombre"
              fullWidth
              variant="outlined"
              value={currentUser?.nombre ?? ''}
              onChange={(e) => setCurrentUser((prev) => prev && { ...prev, nombre: e.target.value })}
            />
            <TextField
              label="Apellido"
              fullWidth
              variant="outlined"
              value={currentUser?.apellido ?? ''}
              onChange={(e) => setCurrentUser((prev) => prev && { ...prev, apellido: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              value={currentUser?.email ?? ''}
              onChange={(e) => setCurrentUser((prev) => prev && { ...prev, email: e.target.value })}
            />
            <TextField
              label="Foto Perfil"
              fullWidth
              variant="outlined"
              value={currentUser?.foto_perfil ?? ''}
              onChange={(e) => setCurrentUser((prev) => prev && { ...prev, foto_perfil: e.target.value })}
            />
            <TextField
              label="Contraseña"
              fullWidth
              variant="outlined"
              type="password"
              value={currentUser?.contraseña ?? ''}
              onChange={(e) => setCurrentUser((prev) => prev && { ...prev, contraseña: e.target.value })}
            />
            <TextField
              label="Rol"
              fullWidth
              variant="outlined"
              value={currentUser?.rol ?? ''}
              onChange={(e) => setCurrentUser((prev) => prev && { ...prev, rol: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
