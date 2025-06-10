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
  name: string;
  email: string;
}

export default function UserApp() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, name: 'Caroline Smith', email: 'caroline@example.com' },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleOpenDialog = (user?: User) => {
    setCurrentUser(user ?? { id: Date.now(), name: '', email: '' });
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
        : [...prev, currentUser];
    });
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Usuarios</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Agregar usuario
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">No hay usuarios registrados.</TableCell>
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
              value={currentUser?.name ?? ''}
              onChange={(e) => setCurrentUser((prev) => prev && { ...prev, name: e.target.value })}
            />
            <TextField
              label="Correo"
              fullWidth
              value={currentUser?.email ?? ''}
              onChange={(e) => setCurrentUser((prev) => prev && { ...prev, email: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
