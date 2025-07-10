import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState } from "react";

interface Categoria {
  id: number;
  nombre: string; // FESTIVALES - CONCIERTOS - TEATROS- DEPORTES- CONFERENCIAS
  descripcion: string;
  creado_categoria: Date;
}

export default function Categoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([
    {
      id: 1,
      nombre: "FESTIVALES",
      descripcion: "holi",
      creado_categoria: new Date("11/06/2025"),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Categoria | null>(null);

  const handleOpenDialog = (categoria?: Categoria) => {
    setCurrentUser(
      categoria ?? {
        id: 0,
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

  const handleSave = () => {
    if (!currentUser) return;
    setCategorias((prev) => {
      const exists = prev.some((u) => u.id === currentUser.id);
      return exists
        ? prev.map((u) => (u.id === currentUser.id ? currentUser : u))
        : [
            ...prev,
            {
              ...currentUser,
              id: prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1,
            },
          ];
    });
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setCategorias((prev) => prev.filter((u) => u.id !== id));
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
          Gestión de Categorias
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Agregar Categoria
        </Button>
      </Stack>

      <TableContainer
        component={Paper}
        elevation={4}
        sx={{ borderRadius: 3, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Descripcion</strong>
              </TableCell>
              <TableCell>
                <strong>creado_categoria</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((Categoria) => (
              <TableRow key={Categoria.id}>
                <TableCell>{Categoria.nombre}</TableCell>
                <TableCell>{Categoria.descripcion}</TableCell>
                <TableCell>
                  {Categoria.creado_categoria.toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleOpenDialog(Categoria)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(Categoria.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {categorias.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay Categorias registradas.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {currentUser && categorias.some((u) => u.id === currentUser.id)
            ? "Editar Categoria"
            : "Agregar Categoria"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nombre"
              fullWidth
              variant="outlined"
              value={currentUser?.nombre ?? ""}
              onChange={(e) =>
                setCurrentUser(
                  (prev) => prev && { ...prev, nombre: e.target.value }
                )
              }
            />
            <TextField
              label="Descricpion"
              fullWidth
              variant="outlined"
              value={currentUser?.descripcion ?? ""}
              onChange={(e) =>
                setCurrentUser(
                  (prev) => prev && { ...prev, descripcion: e.target.value }
                )
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Creado_Categoria"
                value={
                  currentUser?.creado_categoria
                    ? dayjs(currentUser.creado_categoria)
                    : null
                }
                onChange={(newValue) => {
                  setCurrentUser(
                                      (prev) =>
                                        prev && {
                                          ...prev,
                                          creado_categoria: newValue ? newValue.toDate() : prev.creado_categoria,
                                        }
                                    );
                }}
                slotProps={{
                  textField: { fullWidth: true, variant: "outlined" },
                }}
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
    </Box>
  );
}
