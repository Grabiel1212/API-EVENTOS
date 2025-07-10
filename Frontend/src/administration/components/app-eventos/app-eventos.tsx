import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
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
import { useEffect, useRef, useState } from "react";

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
  imagen: File | string | null;
  id_categoria: number;
}

export default function Eventos() {
  const { eventos, loading, error, refetch } = useEventos();
  const { categorias } = useCategorias();
  const { crearEvento, estado: crearEstado, mensaje: crearMensaje } = useCrearEvento();
  const { actualizarEvento, estado: actualizarEstado, mensaje: actualizarMensaje } = useActualizarEvento();
  const { eliminarEvento, estado: eliminarEstado, mensaje: eliminarMensaje } = useEliminarEvento();
    const [searchType, setSearchType] = useState<'titulo' | 'id'>('titulo');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentEvento, setCurrentEvento] = useState<EventoFormData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Filtrar eventos según término de búsqueda
 // Filtrar eventos según término de búsqueda y tipo
  const filteredEventos = eventos.filter(evento => {
    if (searchTerm === '') return true;
    
    if (searchType === 'id') {
      // Búsqueda por ID (coincidencia exacta)
      return evento.id.toString() === searchTerm;
    } else {
      // Búsqueda por título (coincidencia parcial)
      return evento.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

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
            imagen: evento.imagenUrl || null,
            id_categoria: evento.id_categoria,
          }
        : {
            titulo: "",
            descripcion: "",
            ubicacion: "",
            fecha_inicio: null,
            fecha_fin: null,
            precio: 0,
            imagen: null,
            id_categoria: categorias[0]?.id_categoria || 0,
          }
    );
    
    // Set preview if editing existing event with image
    if (evento?.imagenUrl) {
      setImagePreview(evento.imagenUrl);
    } else {
      setImagePreview(null);
    }
    
    setDialogOpen(true);
    setErrors({});
  };

  // Cerrar diálogo
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentEvento(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

// En la función validateForm:
const validateForm = () => {
  const newErrors: Record<string, string> = {};
  
  // Validación de título
  if (!currentEvento?.titulo.trim()) {
    newErrors.titulo = "Título es requerido";
  }
  
  // Validación de descripción
  if (!currentEvento?.descripcion.trim()) {
    newErrors.descripcion = "Descripción es requerida";
  }
  
  // Validación de ubicación
  if (!currentEvento?.ubicacion.trim()) {
    newErrors.ubicacion = "Ubicación es requerida";
  }
  
  // Validación de fechas
  if (!currentEvento?.fecha_inicio) {
    newErrors.fecha_inicio = "Fecha de inicio es requerida";
  }
  
  if (!currentEvento?.fecha_fin) {
    newErrors.fecha_fin = "Fecha de fin es requerida";
  }
  
  // Validar que fecha_fin sea después de fecha_inicio
  if (currentEvento?.fecha_inicio && currentEvento?.fecha_fin) {
    if (dayjs(currentEvento.fecha_fin).isBefore(dayjs(currentEvento.fecha_inicio))) {
      newErrors.fecha_fin = "La fecha de fin debe ser posterior a la fecha de inicio";
    }
  }
  
  // Validación de precio
  if (currentEvento?.precio === undefined || currentEvento.precio < 0) {
    newErrors.precio = "Precio debe ser un valor positivo";
  }
  
  // Validación de categoría
  if (currentEvento?.id_categoria === undefined || currentEvento.id_categoria <= 0) {
    newErrors.id_categoria = "Categoría es requerida";
  }
  
  // Validación de imagen solo para nuevos eventos
  if (!currentEvento?.id && !currentEvento?.imagen) {
    newErrors.imagen = "Imagen es requerida";
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  // Guardar evento (crear o actualizar)
  const handleSave = async () => {
    if (!currentEvento || !token || !validateForm()) return;

    // Preparar datos para enviar
    const eventoData = new FormData();
    eventoData.append("titulo", currentEvento.titulo);
    eventoData.append("descripcion", currentEvento.descripcion);
    eventoData.append("ubicacion", currentEvento.ubicacion);
    
    if (currentEvento.fecha_inicio) {
      eventoData.append("fecha_inicio", currentEvento.fecha_inicio.format("YYYY-MM-DD"));
    }
    
    if (currentEvento.fecha_fin) {
      eventoData.append("fecha_fin", currentEvento.fecha_fin.format("YYYY-MM-DD"));
    }
    
    eventoData.append("precio", currentEvento.precio.toString());
    eventoData.append("id_categoria", currentEvento.id_categoria.toString());
    
    // Append image if it's a File object
    if (currentEvento.imagen instanceof File) {
      eventoData.append("imagen", currentEvento.imagen);
    } else if (typeof currentEvento.imagen === "string") {
      // If it's a string (URL), send it as imagenUrl
      eventoData.append("imagenUrl", currentEvento.imagen);
    }

    if (currentEvento.id) {
      await actualizarEvento(currentEvento.id, eventoData, token);

    } else {
      await crearEvento(eventoData, token);
    }
  };

  // Manejar cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentEvento) return;
    
    const file = e.target.files?.[0];
    if (file) {
      // Actualizar el estado con el archivo
      setCurrentEvento({ ...currentEvento, imagen: file });
      
      // Crear vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Eliminar imagen seleccionada
  const handleRemoveImage = () => {
    if (!currentEvento) return;
    
    setCurrentEvento({ ...currentEvento, imagen: null });
    setImagePreview(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
    <Box sx={{ py: 4, px: 2, maxWidth: 1400, margin: '0 auto' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        gap={2}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
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
          sx={{ minWidth: 250, flexGrow: 1, maxWidth: 400 }}
        />
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ alignSelf: 'flex-start' }}
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
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '10%' }}>Imagen</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '20%' }}>Título</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '15%' }}>Ubicación</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '10%' }}>Fecha Inicio</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '10%' }}>Fecha Fin</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '10%' }}>Precio</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '15%' }}>Categoría</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', width: '10%' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEventos.map((evento) => (
                <TableRow 
                  key={evento.id}
                  hover
                  sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}
                >
                  <TableCell>
                    <Avatar 
                      src={evento.imagen} 
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    >
                      {evento.titulo.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'medium' }}>{evento.titulo}</TableCell>
                  <TableCell>{evento.ubicacion}</TableCell>
                  <TableCell>
                    {dayjs(evento.fecha_inicio).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {dayjs(evento.fecha_fin).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>S/ {evento.precio.toFixed(2)}</TableCell>
                  <TableCell>{getCategoriaNombre(evento.id_categoria)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleOpenDialog(evento)}
                      color="primary"
                      sx={{ mr: 1 }}
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
                  <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                    <Typography variant="body1" color="text.secondary">
                      {searchTerm ? "No se encontraron eventos" : "No hay eventos registrados"}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      sx={{ mt: 2 }}
                      onClick={() => handleOpenDialog()}
                    >
                      Crear primer evento
                    </Button>
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
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          {currentEvento?.id ? "Editar Evento" : "Nuevo Evento"}
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={3} mt={1}>
            {/* Sección de imagen */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {imagePreview ? (
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Avatar 
                    src={imagePreview} 
                    variant="rounded"
                    sx={{ width: 120, height: 120 }}
                  />
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      bgcolor: 'error.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'error.dark' }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Avatar 
                  variant="rounded"
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    bgcolor: 'action.disabledBackground',
                    mb: 2
                  }}
                >
                  <CloudUploadIcon />
                </Avatar>
              )}
              
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
              >
                Subir imagen
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </Button>
              {errors.imagen && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.imagen}
                </FormHelperText>
              )}
            </Box>
            
            <TextField
              label="Título *"
              fullWidth
              variant="outlined"
              value={currentEvento?.titulo || ""}
              error={!!errors.titulo}
              helperText={errors.titulo}
              onChange={(e) =>
                setCurrentEvento(
                  (prev) => prev && { ...prev, titulo: e.target.value }
                )
              }
            />
            
            <TextField
              label="Descripción *"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={currentEvento?.descripcion || ""}
              error={!!errors.descripcion}
              helperText={errors.descripcion}
              onChange={(e) =>
                setCurrentEvento(
                  (prev) => prev && { ...prev, descripcion: e.target.value }
                )
              }
            />
            
            <TextField
              label="Ubicación *"
              fullWidth
              variant="outlined"
              value={currentEvento?.ubicacion || ""}
              error={!!errors.ubicacion}
              helperText={errors.ubicacion}
              onChange={(e) =>
                setCurrentEvento(
                  (prev) => prev && { ...prev, ubicacion: e.target.value }
                )
              }
            />
            
          // En el componente de fecha, agregar restricción de fecha mínima:
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Fecha Inicio *"
    value={currentEvento?.fecha_inicio || null}
    onChange={(newValue) => {
      setCurrentEvento(
        (prev) => prev && { ...prev, fecha_inicio: newValue }
      );
    }}
    minDate={dayjs()}
    slotProps={{
      textField: { 
        fullWidth: true, 
        variant: "outlined",
        error: !!errors.fecha_inicio,
        helperText: errors.fecha_inicio
      },
    }}
  />
</LocalizationProvider>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Fecha Fin *"
    value={currentEvento?.fecha_fin || null}
    onChange={(newValue) => {
      setCurrentEvento(
        (prev) => prev && { ...prev, fecha_fin: newValue }
      );
    }}
    minDate={currentEvento?.fecha_inicio || dayjs()}
    slotProps={{
      textField: { 
        fullWidth: true, 
        variant: "outlined",
        error: !!errors.fecha_fin,
        helperText: errors.fecha_fin
      },
    }}
  />
</LocalizationProvider>
            
          // En el campo de precio, asegurarse de manejar valores negativos:
<TextField
  label="Precio (S/) *"
  type="number"
  fullWidth
  variant="outlined"
  value={currentEvento?.precio || 0}
  error={!!errors.precio}
  helperText={errors.precio}
  onChange={(e) => {
    const value = Number(e.target.value);
    // Prevenir valores negativos
    if (value >= 0) {
      setCurrentEvento(
        (prev) => prev && { ...prev, precio: value }
      );
    }
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">S/</InputAdornment>
    ),
    inputProps: { 
      min: 0,
      step: "0.01"
    }
  }}
/>
            
            <TextField
              select
              label="Categoría *"
              fullWidth
              variant="outlined"
              value={currentEvento?.id_categoria || ""}
              error={!!errors.id_categoria}
              helperText={errors.id_categoria}
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
          <Button 
            onClick={handleCloseDialog} 
            variant="outlined"
            disabled={crearEstado === "loading" || actualizarEstado === "loading"}
          >
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