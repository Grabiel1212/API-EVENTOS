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
import { useUsuarioPorId } from "../../../services/usuarios/useBuscarUsuarioId";
import { useUsuariosAdministradores } from "../../../services/usuarios/useListarAdministradores";
import { useUsuariosNormales } from "../../../services/usuarios/useListarUsuarioNormales";
import { useUsuariosInactivos } from "../../../services/usuarios/useListarUsuariosInactivos";
import { useRegistrarAdmin } from "../../../services/usuarios/useRegistrarAdmin";
import { useActualizarAdmin } from "../../../services/usuarios/useActualizarAdmin";

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
  const [viewMode, setViewMode] = useState<
    "normales" | "administradores" | "inactivos" | "individual"
  >("normales");
  const [searchId, setSearchId] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [password, setPassword] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const normales = useUsuariosNormales();
  const administradores = useUsuariosAdministradores();
  const inactivos = useUsuariosInactivos();
  const usuarioIndividual = useUsuarioPorId(parseInt(searchId) || 0);
  const { registrarUsuario } = useRegistrarAdmin();
  const { actualizarUsuario } = useActualizarAdmin();

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

  const handleOpenDialog = (user?: User) => {
    setCurrentUser(user ?? { 
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
    setDialogOpen(true);
    setError(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentUser(null);
    setPassword("");
    setPhotoFile(null);
    setError(null);
  };

  const handleUpdateUser = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError(null);

      const isGoogleUser = !!currentUser.google_id;
      const rolBackend = currentUser.rol.toUpperCase();

      const result = await actualizarUsuario({
        id: currentUser.id,
        name: currentUser.name,
        lastname: currentUser.lastname,
        photo: photoFile,
        google_id: currentUser.google_id,
        ...(!isGoogleUser && {
          password: password || undefined,
          rol: rolBackend
        })
      });

      if (result.success) {
        setSuccess("Usuario actualizado correctamente");
        setUsers(prev => prev.map(u => 
          u.id === currentUser.id ? { 
            ...u, 
            name: currentUser.name,
            lastname: currentUser.lastname,
            rol: rolBackend,
            ...(photoFile && { photo: URL.createObjectURL(photoFile) })
          } : u
        ));
        handleCloseDialog();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Error al actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentUser) {
      setError("Datos de usuario no disponibles");
      return;
    }

    if (!currentUser.name || !currentUser.lastname || !currentUser.email) {
      setError("Nombre, apellido y email son campos requeridos");
      return;
    }

    if (!password) {
      setError("La contraseña es requerida para nuevos usuarios");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const rolBackend = currentUser.rol.toUpperCase() === "ADMIN" ? "ADMIN" : "USUARIO";
      const rawToken = rolBackend === "ADMIN" ? localStorage.getItem("token") : undefined;
      const token = rawToken === null ? undefined : rawToken;

      const response = await registrarUsuario(
        {
          name: currentUser.name,
          lastname: currentUser.lastname,
          email: currentUser.email,
          password: password,
          rol: rolBackend,
          photo: photoFile || null,
        },
        token
      );

      if (response.success) {
        setSuccess(`${rolBackend === "ADMIN" ? "Administrador" : "Usuario"} registrado correctamente`);
        setUsers(prev => [...prev, mapUsuarioToUser(response.data)]);
        handleCloseDialog();
      } else {
        setError(response.message?.includes("EMAIL_ALREADY_EXISTS") 
          ? "El correo electrónico ya está registrado" 
          : response.message || "Error al registrar usuario");
      }
    } catch (error: any) {
      setError(error.response?.data?.error === "EMAIL_ALREADY_EXISTS"
        ? "El correo electrónico ya está registrado"
        : "Error en la conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
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
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} disabled={loading}>
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
                  {new Date(user.dateCreate).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(user)} color="primary" disabled={loading}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} color="error" disabled={loading}>
                    <DeleteIcon />
                  </IconButton>
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

      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{currentUser?.id !== 0 ? "Editar usuario" : "Agregar usuario"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Nombre"
              value={currentUser?.name || ""}
              onChange={(e) => setCurrentUser(prev => prev && { ...prev, name: e.target.value })}
              fullWidth
              margin="dense"
            />

            <TextField
              label="Apellido"
              value={currentUser?.lastname || ""}
              onChange={(e) => setCurrentUser(prev => prev && { ...prev, lastname: e.target.value })}
              fullWidth
              margin="dense"
            />

            <TextField
              label="Email"
              value={currentUser?.email || ""}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="dense"
            />

            {(!currentUser?.google_id || currentUser?.id === 0) && (
              <>
                <TextField
                  label={currentUser?.id === 0 ? "Contraseña" : "Nueva contraseña (opcional)"}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="dense"
                  required={currentUser?.id === 0}
                />

                <FormControl fullWidth margin="dense">
                  <InputLabel>Rol</InputLabel>
                  <Select
                    value={currentUser?.rol?.toLowerCase() || "usuario"}
                    onChange={(e) => setCurrentUser(prev => prev && { ...prev, rol: e.target.value })}
                    label="Rol"
                  >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="usuario">Usuario normal</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}

            <Box>
              <Button variant="outlined" startIcon={<CloudUploadIcon />} onClick={triggerFileInput} disabled={loading}>
                Subir foto
              </Button>
              <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" hidden />
              {photoFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Archivo seleccionado: {photoFile.name}
                </Typography>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={currentUser?.id === 0 ? handleSave : handleUpdateUser}
            variant="contained"
            disabled={loading}
          >
            {loading ? "Guardando..." : currentUser?.id === 0 ? "Registrar" : "Actualizar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}