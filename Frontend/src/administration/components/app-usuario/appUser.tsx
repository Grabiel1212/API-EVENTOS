import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useActualizarAdmin } from "../../../services/usuarios/useActualizarAdmin";
import { useActualizarEstadoUsuario } from "../../../services/usuarios/useActualizarEstadoUsuario";
import { useUsuarioPorId } from "../../../services/usuarios/useBuscarUsuarioId";
import { useEliminarUsuario } from "../../../services/usuarios/useEliminarUsuario";
import { useUsuariosAdministradores } from "../../../services/usuarios/useListarAdministradores";
import { useUsuariosNormales } from "../../../services/usuarios/useListarUsuarioNormales";
import { useUsuariosInactivos } from "../../../services/usuarios/useListarUsuariosInactivos";
import { useRegistrarAdmin } from "../../../services/usuarios/useRegistrarAdmin";

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  active: boolean;
  rol: string;
  dateCreate: string;
  photo?: string;
  google_id: string | null;
}

const mapUsuarioToUser = (u: any): User => ({
  id: u.id,
  name: u.name || "",
  lastname: u.lastname || "",
  email: u.email || "",
  active: u.active || false,
  rol: u.rol || "",
  dateCreate: u.dateCreate || u.date_create || "",
  photo: u.photo || u.foto_perfil || "",
  google_id: u.google_id || null,
});

export default function UserApp() {

  const [viewMode, setViewMode] = useState<"normales" | "administradores" | "inactivos" | "individual">("normales");
  const [searchId, setSearchId] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState<User>({ 
    id: 0, 
    name: "", 
    lastname: "", 
    email: "", 
    active: true,
    rol: "usuario",
    dateCreate: new Date().toISOString().split("T")[0],
    google_id: null
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [password, setPassword] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const normales = useUsuariosNormales();
  const administradores = useUsuariosAdministradores();
  const inactivos = useUsuariosInactivos();
  const usuarioIndividual = useUsuarioPorId(parseInt(searchId) || 0);
  const { registrarUsuario } = useRegistrarAdmin();
  const { actualizarUsuario } = useActualizarAdmin();
  const { eliminarUsuario } = useEliminarUsuario();
  const { actualizarEstado } = useActualizarEstadoUsuario();

  useEffect(() => {
    switch (viewMode) {
      case "normales":
        setUsers(normales.usuarios.map(mapUsuarioToUser));
        break;
      case "administradores":
        setUsers(administradores.usuarios.map(mapUsuarioToUser));
        break;
      case "inactivos":
        setUsers(inactivos.usuarios.map(mapUsuarioToUser));
        break;
      case "individual":
        usuarioIndividual.usuario 
          ? setUsers([mapUsuarioToUser(usuarioIndividual.usuario)])
          : setUsers([]);
        break;
    }
  }, [viewMode, normales.usuarios, administradores.usuarios, inactivos.usuarios, usuarioIndividual.usuario]);

  const handleOpenAddDialog = () => {
    setNewUser({ 
      id: 0, 
      name: "", 
      lastname: "", 
      email: "", 
      active: true,
      rol: "usuario",
      dateCreate: new Date().toISOString().split("T")[0],
      google_id: null
    });
    setPassword("");
    setPhotoFile(null);
    setAddDialogOpen(true);
    setError(null);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleOpenEditDialog = (user: User) => {
    setCurrentUser(user);
    setPassword("");
    setPhotoFile(null);
    setEditDialogOpen(true);
    setError(null);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentUser(null);
  };

  const handleActivateUser = async (id: number) => {
    try {
      setLoading(true);
      setLoadingId(id);
      
      const result = await actualizarEstado(id, true);
      
      if (result) {
        setSuccess("Usuario activado correctamente");
        setUsers(prev => prev.map(u => u.id === id ? { ...u, active: true } : u));
      } else {
        setError("Error al activar usuario");
      }
    } catch (error: any) {
      setError(error.message || "Error al activar usuario");
    } finally {
      setLoading(false);
      setLoadingId(null);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      setLoading(true);
      setLoadingId(id);
      
      const result = await eliminarUsuario(id);
      
      if (result) {
        setSuccess("Usuario eliminado correctamente");
        setUsers(prev => prev.filter(u => u.id !== id));
      } else {
        setError("Error al eliminar usuario");
      }
    } catch (error: any) {
      setError(error.message || "Error al eliminar usuario");
    } finally {
      setLoading(false);
      setLoadingId(null);
    }
  };

  const handleUpdateUser = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError(null);

      const isGoogleUser = !!currentUser.google_id;
      const updateData: any = {
        id: currentUser.id,
        name: currentUser.name,
        lastname: currentUser.lastname,
      };

      if (!isGoogleUser) {
        if (password) updateData.password = password;
        if (currentUser.rol) updateData.rol = currentUser.rol.toUpperCase();
      }

      if (photoFile) updateData.photo = photoFile;

      const result = await actualizarUsuario(updateData);

      if (result.success) {
        setSuccess("Usuario actualizado correctamente");
        setUsers(prev => prev.map(u => 
          u.id === currentUser.id ? { 
            ...u, 
            name: currentUser.name,
            lastname: currentUser.lastname,
            rol: currentUser.rol.toUpperCase(),
            ...(photoFile && { photo: URL.createObjectURL(photoFile) })
          } : u
        ));
        handleCloseEditDialog();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Error al actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterUser = async () => {
    if (!newUser.name || !newUser.lastname || !newUser.email || !password) {
      setError("Todos los campos son requeridos");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const rolBackend = newUser.rol.toUpperCase() as "ADMIN" | "USUARIO";
      const token = rolBackend === "ADMIN" ? localStorage.getItem("token") : undefined;

      const response = await registrarUsuario(
        {
          name: newUser.name,
          lastname: newUser.lastname,
          email: newUser.email,
          password: password,
          rol: rolBackend,
          photo: photoFile || null,
        },
        token || undefined
      );

      if (response.success) {
        setSuccess("Usuario registrado correctamente");
        setUsers(prev => [...prev, mapUsuarioToUser(response.data)]);
        handleCloseAddDialog();
      } else {
        setError(response.message || "Error al registrar usuario");
      }
    } catch (error: any) {
      setError(error.response?.data?.error === "EMAIL_ALREADY_EXISTS"
        ? "El correo electrónico ya está registrado"
        : "Error en la conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchId) setViewMode("individual");
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setPhotoFile(e.target.files[0]);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Gestión de Usuarios</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpenAddDialog} 
          disabled={loading}
        >
          Agregar usuario
        </Button>
      </Stack>

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
            ),
          }}
          sx={{ width: 300 }}
        />

        <Button
          variant={viewMode === "administradores" ? "contained" : "outlined"}
          onClick={() => setViewMode(viewMode === "administradores" ? "normales" : "administradores")}
          disabled={loading}
        >
          {viewMode === "administradores" ? "Listar Usuarios Normales" : "Listar Administradores"}
        </Button>

        <Button
          variant={viewMode === "inactivos" ? "contained" : "outlined"}
          onClick={() => setViewMode(viewMode === "inactivos" ? "normales" : "inactivos")}
          disabled={loading}
        >
          {viewMode === "inactivos" ? "Listar Usuarios Activos" : "Listar Inactivos"}
        </Button>
      </Stack>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
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
                <TableCell>{user.active ? "Activo" : "Inactivo"}</TableCell>
                <TableCell>{user.rol === "ADMIN" ? "Administrador" : "Usuario Normal"}</TableCell>
                <TableCell>
                  {new Date(user.dateCreate).toLocaleDateString("es-PE", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell align="right">
                  {viewMode === "inactivos" ? (
                    <Button 
                      variant="contained" 
                      color="success"
                      onClick={() => handleActivateUser(user.id)}
                      disabled={loading && loadingId === user.id}
                    >
                      {loading && loadingId === user.id ? "Activando..." : "Activar"}
                    </Button>
                  ) : (
                    <>
                      <IconButton 
                        onClick={() => handleOpenEditDialog(user)} 
                        color="primary" 
                        disabled={loading}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDeleteUser(user.id)} 
                        color="error" 
                        disabled={loading && loadingId === user.id}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    {viewMode === "individual" ? "Usuario no encontrado" : "No hay usuarios registrados"}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
        <DialogTitle>Agregar nuevo usuario</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Nombre"
              value={newUser.name}
              onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
              margin="dense"
              required
            />

            <TextField
              label="Apellido"
              value={newUser.lastname}
              onChange={(e) => setNewUser(prev => ({ ...prev, lastname: e.target.value }))}
              fullWidth
              margin="dense"
              required
            />

            <TextField
              label="Email"
              value={newUser.email}
              onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
              fullWidth
              margin="dense"
              required
              type="email"
            />

            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="dense"
              required
            />

            <FormControl fullWidth margin="dense">
              <InputLabel>Rol *</InputLabel>
              <Select
                value={newUser.rol}
                onChange={(e) => setNewUser(prev => ({ ...prev, rol: e.target.value }))}
                label="Rol"
                required
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="usuario">Usuario normal</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Button 
                variant="outlined" 
                startIcon={<CloudUploadIcon />} 
                onClick={triggerFileInput}
                disabled={loading}
              >
                Subir foto
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
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancelar</Button>
          <Button
            onClick={handleRegisterUser}
            variant="contained"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>Editar usuario</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Nombre"
              value={currentUser?.name || ""}
              onChange={(e) => setCurrentUser(prev => prev && ({ ...prev, name: e.target.value }))}
              fullWidth
              margin="dense"
              required
            />

            <TextField
              label="Apellido"
              value={currentUser?.lastname || ""}
              onChange={(e) => setCurrentUser(prev => prev && ({ ...prev, lastname: e.target.value }))}
              fullWidth
              margin="dense"
              required
            />

            <TextField
              label="Email"
              value={currentUser?.email || ""}
              fullWidth
              margin="dense"
              disabled
            />

            {!currentUser?.google_id && (
              <>
                <TextField
                  label="Nueva contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="dense"
                  helperText="Dejar vacío para mantener la contraseña actual"
                />

                <FormControl fullWidth margin="dense">
                  <InputLabel>Rol</InputLabel>
                  <Select
                    value={currentUser?.rol?.toLowerCase() || "usuario"}
                    onChange={(e) => setCurrentUser(prev => prev && ({ ...prev, rol: e.target.value }))}
                    label="Rol"
                  >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="usuario">Usuario normal</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}

            <Box>
              <Button 
                variant="outlined" 
                startIcon={<CloudUploadIcon />} 
                onClick={triggerFileInput}
                disabled={loading}
              >
                Cambiar foto
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
                  Nueva foto: {photoFile.name}
                </Typography>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancelar</Button>
          <Button
            onClick={handleUpdateUser}
            variant="contained"
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}