import { Box, Stack, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState } from "react";

interface Registros {
  id: number;
  estado: string;
  fecha_registro: Date;
}

export default function Registros() {
  const [registros, setRegistros] = useState<Registros[]>([
    {
      id: 1,
      estado: "activo",
      fecha_registro: new Date("11/06/2025"),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Registros | null>(null);

  const handleOpenDialog = (categoria?: Registros) => {
    setCurrentUser(
      categoria ?? {
        id: 0,
        estado: "",
        fecha_registro: new Date(),
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
    setRegistros((prev) => {
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
    setRegistros((prev) => prev.filter((u) => u.id !== id));
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
          Gestión de Registros
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Agregar Registros
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
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Estado</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha_Registro</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.map((Registros) => (
              <TableRow key={Registros.id}>
                <TableCell>{Registros.id}</TableCell>
                <TableCell>{Registros.estado}</TableCell>
                <TableCell>{Registros.fecha_registro.toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleOpenDialog(Registros)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(Registros.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {registros.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay Registros registrados.
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
          {currentUser && registros.some((u) => u.id === currentUser.id)
            ? "Editar Registros"
            : "Agregar Registros"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Estado"
              fullWidth
              variant="outlined"
              value={currentUser?.estado ?? ""}
              onChange={(e) =>
                setCurrentUser(
                  (prev) => prev && { ...prev, estado: e.target.value }
                )
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha_Registro"
                value={
                  currentUser?.fecha_registro ? dayjs(currentUser.fecha_registro) : null
                }
                onChange={(newValue) => {
                  setCurrentUser(
                    (prev) =>
                      prev && {
                        ...prev,
                        fecha_registro: newValue
                          ? newValue.toDate()
                          : prev.fecha_registro,
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
