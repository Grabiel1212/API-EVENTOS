import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

// Hooks de la API
import { useCategorias } from "../../../services/categorias/useCategorias";
import { useActualizarEvento } from "../../../services/eventos/useActualizarEvento";
import { useCrearEvento } from "../../../services/eventos/useCrearEvento";
import { useEliminarEvento } from "../../../services/eventos/useEliminarEvento";
import { useEventos } from "../../../services/eventos/useEventos";

// Interfaz para los datos del formulario
interface EventoFormData {
  id?: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha_inicio: Dayjs | null;
  fecha_fin: Dayjs | null;
  precio: number;
  imagen: string;
  id_categoria: number;
}

export default function Eventos() {
  const { eventos, loading, error, refetch } = useEventos();
  const { categorias } = useCategorias();
  const { crearEvento, estado: crearEstado, mensaje: crearMensaje } = useCrearEvento();
  const { actualizarEvento, estado: actualizarEstado, mensaje: actualizarMensaje } = useActualizarEvento();
  const { eliminarEvento, estado: eliminarEstado, mensaje: eliminarMensaje } = useEliminarEvento();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentEvento, setCurrentEvento] = useState<EventoFormData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Filtrar eventos según término de búsqueda
  const filteredEventos = eventos.filter(evento =>
    evento.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar cierre de snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Mostrar snackbar de notificación
  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  // Efecto para manejar notificaciones de creación
  useEffect(() => {
    if (crearEstado === "success") {
      showSnackbar(crearMensaje, "success");
      refetch();
      handleCloseDialog();
    } else if (crearEstado === "error") {
      showSnackbar(crearMensaje, "error");
    }
  }, [crearEstado, crearMensaje]);

  // Efecto para manejar notificaciones de actualización
  useEffect(() => {
    if (actualizarEstado === "success") {
      showSnackbar(actualizarMensaje, "success");
      refetch();
      handleCloseDialog();
    } else if (actualizarEstado === "error") {
      showSnackbar(actualizarMensaje, "error");
    }
  }, [actualizarEstado, actualizarMensaje]);

  // Efecto para manejar notificaciones de eliminación
  useEffect(() => {
    if (eliminarEstado === "success") {
      showSnackbar(eliminarMensaje, "success");
      refetch();
    } else if (eliminarEstado === "error") {
      showSnackbar(eliminarMensaje, "error");
    }
  }, [eliminarEstado, eliminarMensaje]);

  const token = localStorage.getItem("token");

  // Abrir diálogo para crear/editar evento
  const handleOpenDialog = (evento?: any) => {
    setCurrentEvento(
      evento
        ? {
            id: evento.id,
            titulo: evento.titulo,
            descripcion: evento.descripcion,
            ubicacion: evento.ubicacion,
            fecha_inicio: dayjs(evento.fecha_inicio),
            fecha_fin: dayjs(evento.fecha_fin),
            precio: evento.precio,
            imagen: evento.imagen,
            id_categoria: evento.id_categoria,
          }
        : {
            titulo: "",
            descripcion: "",
            ubicacion: "",
            fecha_inicio: null,
            fecha_fin: null,
            precio: 0,
            imagen: "",
            id_categoria: categorias[0]?.id_categoria || 0,
          }
    );
    setDialogOpen(true);
  };

  // Cerrar diálogo
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentEvento(null);
  };

  // Guardar evento (crear o actualizar)
  const handleSave = async () => {
    if (!currentEvento || !token) return;

    const eventoData = {
      titulo: currentEvento.titulo,
      descripcion: currentEvento.descripcion,
      ubicacion: currentEvento.ubicacion,
      fecha_inicio: currentEvento.fecha_inicio?.format("YYYY-MM-DD") || "",
      fecha_fin: currentEvento.fecha_fin?.format("YYYY-MM-DD") || "",
      precio: currentEvento.precio,
      imagen: currentEvento.imagen,
      id_categoria: currentEvento.id_categoria,
    };

    if (currentEvento.id) {
      await actualizarEvento(currentEvento.id, eventoData, token);
    } else {
      await crearEvento(eventoData, token);
    }
  };

  // Eliminar evento
  const handleDelete = async (id: number) => {
    if (token) {
      await eliminarEvento(id, token);
    }
  };

  // Obtener nombre de categoría por ID
  const getCategoriaNombre = (id: number) => {
    const categoria = categorias.find(c => c.id_categoria === id);
    return categoria ? categoria.nombre : "Desconocida";
  };

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h4" fontWeight="bold">
          Gestión de Eventos
        </Typography>
        
        <TextField
          placeholder="Buscar eventos..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 250 }}
        />
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nuevo Evento
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          elevation={4}
          sx={{ borderRadius: 3, overflow: "hidden" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Título</strong></TableCell>
            
                <TableCell><strong>Ubicación</strong></TableCell>
                <TableCell><strong>Fecha Inicio</strong></TableCell>
                <TableCell><strong>Fecha Fin</strong></TableCell>
                <TableCell><strong>Precio</strong></TableCell>
                <TableCell><strong>Categoría</strong></TableCell>
                <TableCell align="right"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEventos.map((evento) => (
                <TableRow key={evento.id}>
                  <TableCell>{evento.titulo}</TableCell>
                
                  <TableCell>{evento.ubicacion}</TableCell>
                  <TableCell>
                    {new Date(evento.fecha_inicio).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(evento.fecha_fin).toLocaleDateString()}
                  </TableCell>
                  <TableCell>S/ {evento.precio.toFixed(2)}</TableCell>
                  <TableCell>{getCategoriaNombre(evento.id_categoria)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleOpenDialog(evento)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => evento.id && handleDelete(evento.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEventos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      {searchTerm ? "No se encontraron eventos" : "No hay eventos registrados"}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Diálogo para crear/editar eventos */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {currentEvento?.id ? "Editar Evento" : "Nuevo Evento"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Título"
              fullWidth
              variant="outlined"
              value={currentEvento?.titulo || ""}
              onChange={(e) =>
                setCurrentEvento(
                  (prev) => prev && { ...prev, titulo: e.target.value }
                )
              }
            />
            <TextField
              label="Descripción"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={currentEvento?.descripcion || ""}
              onChange={(e) =>
                setCurrentEvento(
                  (prev) => prev && { ...prev, descripcion: e.target.value }
                )
              }
            />
            <TextField
              label="Ubicación"
              fullWidth
              variant="outlined"
              value={currentEvento?.ubicacion || ""}
              onChange={(e) =>
                setCurrentEvento(
                  (prev) => prev && { ...prev, ubicacion: e.target.value }
                )
              }
            />
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha Inicio"
                value={currentEvento?.fecha_inicio || null}
                onChange={(newValue) => {
                  setCurrentEvento(
                    (prev) => prev && { ...prev, fecha_inicio: newValue }
                  );
                }}
                slotProps={{
                  textField: { fullWidth: true, variant: "outlined" },
                }}
              />
            </LocalizationProvider>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha Fin"
                value={currentEvento?.fecha_fin || null}
                onChange={(newValue) => {
                  setCurrentEvento(
                    (prev) => prev && { ...prev, fecha_fin: newValue }
                  );
                }}
                slotProps={{
                  textField: { fullWidth: true, variant: "outlined" },
                }}
              />
            </LocalizationProvider>
            
            <TextField
              label="Precio (S/)"
              type="number"
              fullWidth
              variant="outlined"
              value={currentEvento?.precio || 0}
              onChange={(e) =>
                setCurrentEvento(
                  (prev) => prev && { ...prev, precio: Number(e.target.value) }
                )
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">S/</InputAdornment>
                ),
              }}
            />
            
            <TextField
              label="Imagen (URL)"
              fullWidth
              variant="outlined"
              value={currentEvento?.imagen || ""}
              onChange={(e) =>
                setCurrentEvento(
                  (prev) => prev && { ...prev, imagen: e.target.value }
                )
              }
            />
            
            <TextField
              select
              label="Categoría"
              fullWidth
              variant="outlined"
              value={currentEvento?.id_categoria || ""}
              onChange={(e) =>
                setCurrentEvento(
                  (prev) => prev && { ...prev, id_categoria: Number(e.target.value) }
                )
              }
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id_categoria} value={categoria.id_categoria}>
                  {categoria.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} disabled={crearEstado === "loading" || actualizarEstado === "loading"}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={crearEstado === "loading" || actualizarEstado === "loading"}
          >
            {crearEstado === "loading" || actualizarEstado === "loading" ? (
              <CircularProgress size={24} />
            ) : (
              "Guardar"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
