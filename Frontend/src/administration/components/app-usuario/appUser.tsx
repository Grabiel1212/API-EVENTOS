// src/components/UserApp.tsx
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useUsuarioPorId } from '../../../services/usuarios/useBuscarUsuarioId';
import { useUsuariosAdministradores } from '../../../services/usuarios/useListarAdministradores';
import { useUsuariosNormales } from '../../../services/usuarios/useListarUsuarioNormales';
import { useUsuariosInactivos } from '../../../services/usuarios/useListarUsuariosInactivos';
import { useRegistrarAdmin } from '../../../services/usuarios/useRegistrarAdmin';

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  active: boolean;
  rol: string;
  dateCreate: string;
  photo?: string;
}

const mapUsuarioToUser = (u: any): User => ({
  id: u.id,
  name: u.name || '',
  lastname: u.lastname || '',
  email: u.email || '',
  active: u.active || false,
  rol: u.rol || '',
  dateCreate: u.dateCreate || u.date_create || '',
  photo: u.photo || u.foto_perfil || ''
});

export default function UserApp() {
  const [viewMode, setViewMode] = useState<
    'normales' | 'administradores' | 'inactivos' | 'individual'
  >('normales');
  
  const [searchId, setSearchId] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  
  // Hooks para obtener datos
  const normales = useUsuariosNormales();
  const administradores = useUsuariosAdministradores();
  const inactivos = useUsuariosInactivos();
  const usuarioIndividual = useUsuarioPorId(parseInt(searchId) || 0);
  
  // Hook para registrar usuarios (ambos tipos)
  const { registrarUsuario } = useRegistrarAdmin();

  // Obtener token del localStorage
  const getUserToken = () => localStorage.getItem("token");
  const token = getUserToken();
  
  // Estados para el diálogo
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [password, setPassword] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados para manejar errores y éxito
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Efecto para cargar datos según el modo de vista
  useEffect(() => {
    switch(viewMode) {
      case 'normales':
        setUsers(normales.usuarios.map(mapUsuarioToUser));
        break;
      case 'administradores':
        setUsers(administradores.usuarios.map(mapUsuarioToUser));
        break;
      case 'inactivos':
        setUsers(inactivos.usuarios.map(mapUsuarioToUser));
        break;
      case 'individual':
        if (usuarioIndividual.usuario) {
          setUsers([mapUsuarioToUser(usuarioIndividual.usuario)]);
        } else {
          setUsers([]);
        }
        break;
    }
  }, [
    viewMode, 
    normales.usuarios, 
    administradores.usuarios, 
    inactivos.usuarios,
    usuarioIndividual.usuario
  ]);

  const handleOpenDialog = (user?: User) => {
    setCurrentUser(user ?? { 
      id: 0, 
      name: '', 
      lastname: '', 
      email: '', 
      active: true,
      rol: 'usuario',
      dateCreate: new Date().toISOString().split('T')[0] 
    });
    setPassword('');
    setPhotoFile(null);
    setDialogOpen(true);
    setError(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentUser(null);
    setPassword('');
    setPhotoFile(null);
    setError(null);
  };

  const handleSave = async () => {
    // Limpiar errores previos
    setError(null);
    
    if (!currentUser) {
      setError('Datos de usuario no disponibles');
      return;
    }
    
    // Validaciones básicas
    if (!currentUser.name || !currentUser.lastname || !currentUser.email) {
      setError('Nombre, apellido y email son campos requeridos');
      return;
    }
    
    if (currentUser.id === 0 && !password) {
      setError('La contraseña es requerida para nuevos usuarios');
      return;
    }
    
    try {
      setLoading(true);
      
      // Convertir rol a formato que espera el backend
      const rolBackend = currentUser.rol === 'admin' ? 'ADMIN' : 'USUARIO';
      
      // Determinar si necesita token (solo para ADMIN)
      const tokenParaEnviar :any= rolBackend === 'ADMIN' ? token : undefined;
      
      const response = await registrarUsuario(
        {
          name: currentUser.name,
          lastname: currentUser.lastname,
          email: currentUser.email,
          password: password,
          rol: rolBackend,
          photo: photoFile || null
        },
        tokenParaEnviar
      );
      
      if (response.success) {
        const tipoUsuario = rolBackend === 'ADMIN' ? 'Administrador' : 'Usuario normal';
        setSuccess(`${tipoUsuario} registrado correctamente`);
        
        // Actualizar lista de usuarios
        const newUser = mapUsuarioToUser(response.data);
        setUsers(prev => [...prev, newUser]);
        
        handleCloseDialog();
      } else {
        // Manejar errores específicos del backend
        if (response.message?.includes("EMAIL_ALREADY_EXISTS") || 
            response.message?.includes("correo electrónico")) {
          setError('El correo electrónico ya está registrado');
        } else {
          setError(response.message || 'Error al registrar usuario');
        }
      }
    } catch (err: any) {
      // Manejar errores de conexión
      if (err.response?.data?.error === "EMAIL_ALREADY_EXISTS") {
        setError('El correo electrónico ya está registrado');
      } else {
        setError(err.message || 'Error en la conexión con el servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleSearch = () => {
    if (searchId) {
      setViewMode('individual');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box sx={{ py: 4, px: 2 }}>
      {/* Notificaciones */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Gestión de Usuarios</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpenDialog()}
          disabled={loading}
        >
          Agregar usuario
        </Button>
      </Stack>

      {/* Barra de búsqueda y filtros */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <TextField
          label="Buscar usuario por ID"
          variant="outlined"
          size="small"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} disabled={loading}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{ width: 300 }}
        />
        
        <Button
          variant={viewMode === 'administradores' ? 'contained' : 'outlined'}
          onClick={() => setViewMode(
            viewMode === 'administradores' ? 'normales' : 'administradores'
          )}
          disabled={loading}
        >
          {viewMode === 'administradores' 
            ? 'Listar Usuarios Normales' 
            : 'Listar Administradores'}
        </Button>
        
        <Button
          variant={viewMode === 'inactivos' ? 'contained' : 'outlined'}
          onClick={() => setViewMode(
            viewMode === 'inactivos' ? 'normales' : 'inactivos'
          )}
          disabled={loading}
        >
          {viewMode === 'inactivos' 
            ? 'Listar Usuarios Activos' 
            : 'Listar Inactivos'}
        </Button>
      </Stack>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Apellido</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell><strong>Fecha Creación</strong></TableCell>
              <TableCell align="right"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.active ? 'Activo' : 'Inactivo'}</TableCell>
                <TableCell>
                  {user.rol === 'admin' ? 'Administrador' : 'Usuario Normal'}
                </TableCell>
                <TableCell>
                  {new Date(user.dateCreate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    onClick={() => handleOpenDialog(user)} 
                    color="primary"
                    disabled={loading}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(user.id)} 
                    color="error"
                    disabled={loading}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    {viewMode === 'individual' 
                      ? 'Usuario no encontrado' 
                      : 'No hay usuarios registrados'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para agregar usuario */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {currentUser && currentUser.id !== 0 ? 'Editar usuario' : 'Agregar usuario'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <TextField
              label="Nombre"
              fullWidth
              variant="outlined"
              required
              value={currentUser?.name || ''}
              onChange={(e) => 
                setCurrentUser(prev => prev && ({ ...prev, name: e.target.value }))
              }
              disabled={loading}
              error={error?.includes('Nombre')}
            />
            
            <TextField
              label="Apellido"
              fullWidth
              variant="outlined"
              required
              value={currentUser?.lastname || ''}
              onChange={(e) => 
                setCurrentUser(prev => prev && ({ ...prev, lastname: e.target.value }))
              }
              disabled={loading}
              error={error?.includes('apellido')}
            />
            
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              required
              type="email"
              value={currentUser?.email || ''}
              onChange={(e) => 
                setCurrentUser(prev => prev && ({ ...prev, email: e.target.value }))
              }
              disabled={loading || (currentUser?.id !== 0)}
              error={error?.includes('correo') || error?.includes('EMAIL')}
              helperText={error?.includes('correo') || error?.includes('EMAIL') 
                ? "Este correo ya está registrado" 
                : ""}
            />
            
            {currentUser?.id === 0 && (
              <TextField
                label="Contraseña"
                fullWidth
                variant="outlined"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                error={error?.includes('contraseña')}
              />
            )}
            
            <FormControl fullWidth>
              <InputLabel id="rol-label">Rol</InputLabel>
              <Select
                labelId="rol-label"
                label="Rol"
                value={currentUser?.rol || 'usuario'}
                onChange={(e) => 
                  setCurrentUser(prev => prev && ({ ...prev, rol: e.target.value }))
                }
                disabled={loading || (currentUser?.id !== 0)}
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="usuario">Usuario Normal</MenuItem>
              </Select>
            </FormControl>
            
            <Box>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                onClick={triggerFileInput}
                sx={{ mb: 1 }}
                disabled={loading}
              >
                {photoFile ? 'Cambiar foto' : 'Subir foto'}
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                hidden
              />
              {photoFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Archivo seleccionado: {photoFile.name}
                </Typography>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} disabled={loading}>Cancelar</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Procesando...' : 
              (currentUser?.id === 0 ? 'Registrar' : 'Actualizar')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}