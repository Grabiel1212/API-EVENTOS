import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
  Alert,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useAgregarCategoria } from "../../../services/categorias/useCategoriaAgregar";
import { useActualizarCategoria, type CategoriaUpdate } from "../../../services/categorias/useCategoriaActualizar";
import { useCategorias } from "../../../services/categorias/useCategorias";

interface CategoriaLocal {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  creado_categoria: Date;
}

export default function Categoria() {
  const { categorias, refetch } = useCategorias();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CategoriaLocal | null>(null);

  const { agregarCategoria } = useAgregarCategoria();
  const { actualizarCategoria } = useActualizarCategoria();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [mensaje, setMensaje] = useState<string>("");
  const [estado, setEstado] = useState<"success" | "error">("success");

  const handleOpenDialog = (categoria?: CategoriaLocal) => {
    setCurrentUser(
      categoria ?? {
        id_categoria: 0,
        nombre: "",
        descripcion: "",
        creado_categoria: new Date(),
      }
    );
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentUser(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = async () => {
    if (!currentUser) return;

    const esNueva = currentUser.id_categoria === 0;
    const token = localStorage.getItem("token");
    if (!token) {
      setMensaje("No se encontró un token. Por favor, inicia sesión.");
      setEstado("error");
      setSnackbarOpen(true);
      return;
    }

    if (esNueva) {
      const nuevaCategoria = {
        nombre: currentUser.nombre,
        descripcion: currentUser.descripcion,
      };

      const resultado = await agregarCategoria(nuevaCategoria, token);

      if (resultado) {
        await refetch();
        setMensaje("Categoría agregada exitosamente.");
        setEstado("success");
        handleCloseDialog();
      } else {
        setMensaje("Error al agregar categoría.");
        setEstado("error");
      }

      setSnackbarOpen(true);
    } else {
      const updateData: CategoriaUpdate = {
        id: currentUser.id_categoria,
        nombre: currentUser.nombre,
        descripcion: currentUser.descripcion,
      };

      const actualizado = await actualizarCategoria(updateData);
      if (actualizado) {
        await refetch();
        setMensaje("Categoría actualizada exitosamente.");
        setEstado("success");
        handleCloseDialog();
      } else {
        setMensaje("Error al actualizar categoría.");
        setEstado("error");
      }

      setSnackbarOpen(true);
    }
  };

  const handleDelete = (id_categoria: number) => {
    // Tu lógica de eliminación aquí si tienes implementado DELETE
    console.log("Eliminar categoría con ID:", id_categoria);
  };

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Gestión de Categorías
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Agregar Categoría
        </Button>
      </Stack>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Fecha de creación</strong></TableCell>
              <TableCell align="right"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((categoria) => (
              <TableRow key={categoria.id_categoria}>
                <TableCell>{categoria.nombre}</TableCell>
                <TableCell>{categoria.descripcion}</TableCell>
                <TableCell>
                  {new Date(categoria.creado_categoria).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() =>
                      handleOpenDialog({
                        ...categoria,
                        creado_categoria: new Date(categoria.creado_categoria),
                      })
                    }
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(categoria.id_categoria)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {categorias.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay categorías registradas.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {currentUser && currentUser.id_categoria !== 0
            ? "Editar Categoría"
            : "Agregar Categoría"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nombre"
              fullWidth
              variant="outlined"
              value={currentUser?.nombre ?? ""}
              onChange={(e) =>
                setCurrentUser((prev) => prev && { ...prev, nombre: e.target.value })
              }
            />
            <TextField
              label="Descripción"
              fullWidth
              variant="outlined"
              value={currentUser?.descripcion ?? ""}
              onChange={(e) =>
                setCurrentUser((prev) => prev && { ...prev, descripcion: e.target.value })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de creación"
                value={currentUser?.creado_categoria ? dayjs(currentUser.creado_categoria) : null}
                onChange={(newValue) => {
                  setCurrentUser(
                    (prev) =>
                      prev && {
                        ...prev,
                        creado_categoria: newValue
                          ? newValue.toDate()
                          : prev.creado_categoria,
                      }
                  );
                }}
                slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={estado === "success" ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
}