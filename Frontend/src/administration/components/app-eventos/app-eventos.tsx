import {
  Box,
  Stack,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState } from "react";

interface Eventos {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  precio: number;
  creado_evento: Date;
  actualizado_evento: Date;
}

export default function Eventos() {
  const [eventos, setEventos] = useState<Eventos[]>([
    {
      id: 1,
      titulo: "RadioHead",
      descripcion: "Rock 90",
      ubicacion: "Barranco",
      fecha_inicio: new Date("2024-04-15"),
      fecha_fin: new Date("2026-09-20"),
      precio: 500,
      creado_evento: new Date("2014-04-13"),
      actualizado_evento: new Date("2015-04-15"),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Eventos | null>(null);

  const handleOpenDialog = (evento?: Eventos) => {
    setCurrentUser(
      evento ?? {
        id: 0,
        titulo: "",
        descripcion: " ",
        ubicacion: "",
        fecha_inicio: new Date(""),
        fecha_fin: new Date(""),
        precio: 0,
        creado_evento: new Date(""),
        actualizado_evento: new Date(""),
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
    setEventos((prev) => {
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
    setEventos((prev) => prev.filter((u) => u.id !== id));
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
          Gestión de Eventos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Agregar Eventos
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
                <strong>Titulo</strong>
              </TableCell>
              <TableCell>
                <strong>Descripcion</strong>
              </TableCell>
              <TableCell>
                <strong>Ubicacion</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha_Inicio</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha_Fin</strong>
              </TableCell>
              <TableCell>
                <strong>Creado_Evento</strong>
              </TableCell>
              <TableCell>
                <strong>Actualizacion_Evento</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventos.map((Eventos) => (
              <TableRow key={Eventos.id}>
                <TableCell>{Eventos.titulo}</TableCell>
                <TableCell>{Eventos.descripcion}</TableCell>
                <TableCell>{Eventos.ubicacion}</TableCell>
                <TableCell>
                  {Eventos.fecha_inicio.toLocaleDateString()}
                </TableCell>
                <TableCell>{Eventos.fecha_fin.toLocaleDateString()}</TableCell>
                <TableCell>{Eventos.precio}</TableCell>
                <TableCell>
                  {Eventos.creado_evento.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {Eventos.actualizado_evento.toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleOpenDialog(Eventos)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(Eventos.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {eventos.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay Eventos registradas.
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
          {currentUser && eventos.some((u) => u.id === currentUser.id)
            ? "Editar Eventos"
            : "Agregar Eventos"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="titulo"
              fullWidth
              variant="outlined"
              value={currentUser?.titulo ?? ""}
              onChange={(e) =>
                setCurrentUser(
                  (prev) => prev && { ...prev, titulo: e.target.value }
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
            <TextField
              label="Ubicacion"
              fullWidth
              variant="outlined"
              value={currentUser?.ubicacion ?? ""}
              onChange={(e) =>
                setCurrentUser(
                  (prev) => prev && { ...prev, ubicacion: e.target.value }
                )
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha_Inicio"
                value={
                  currentUser?.fecha_inicio
                    ? dayjs(currentUser.fecha_inicio)
                    : null
                }
                onChange={(newValue) => {
                  setCurrentUser(
                    (prev) =>
                      prev && {
                        ...prev,
                        fecha_inicio: newValue
                          ? newValue.toDate()
                          : prev.fecha_inicio,
                      }
                  );
                }}
                slotProps={{
                  textField: { fullWidth: true, variant: "outlined" },
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha_Fin"
                value={
                  currentUser?.fecha_fin ? dayjs(currentUser.fecha_fin) : null
                }
                onChange={(newValue) => {
                  setCurrentUser(
                    (prev) =>
                      prev && {
                        ...prev,
                        fecha_fin: newValue
                          ? newValue.toDate()
                          : prev.fecha_fin,
                      }
                  );
                }}
                slotProps={{
                  textField: { fullWidth: true, variant: "outlined" },
                }}
              />
            </LocalizationProvider>
            <TextField
              label="Precio"
              fullWidth
              variant="outlined"
              value={currentUser?.precio ?? ""}
              onChange={(e) =>
                setCurrentUser(
                  (prev) => prev && { ...prev, precio: Number(e.target.value) }
                )
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Creado_Evento"
                value={
                  currentUser?.creado_evento
                    ? dayjs(currentUser.creado_evento)
                    : null
                }
                onChange={(newValue) => {
                  setCurrentUser(
                    (prev) =>
                      prev && {
                        ...prev,
                        creado_evento: newValue
                          ? newValue.toDate()
                          : prev.fecha_fin,
                      }
                  );
                }}
                slotProps={{
                  textField: { fullWidth: true, variant: "outlined" },
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Actualizado_Evento"
                value={
                  currentUser?.actualizado_evento
                    ? dayjs(currentUser.actualizado_evento)
                    : null
                }
                onChange={(newValue) => {
                  setCurrentUser(
                    (prev) =>
                      prev && {
                        ...prev,
                        actualizado_evento: newValue
                          ? newValue.toDate()
                          : prev.fecha_fin,
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
