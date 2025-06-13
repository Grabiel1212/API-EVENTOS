import { Box, Stack, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface Pagos {   
    id: number;
    monto: number;
    metodo_pago: string; //Efectivo - Tarjeta
    fecha_pago: Date;
}

export default function Pagos(){
    const [pagos, setPagos] = useState<Pagos[]>([
        {
            id: 1,
            monto: 125,
            metodo_pago: 'Efectivo',
            fecha_pago: new Date("11/06/2025"),
        }
    ])

    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<Pagos | null>(null);

    const handleOpenDialog = (categoria?: Pagos) => {
    setCurrentUser(
      categoria ?? {
        id: 0,
        monto: 0,
        metodo_pago: "",
        fecha_pago: new Date(),
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
    setPagos((prev) => {
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
    setPagos((prev) => prev.filter((u) => u.id !== id));
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
          Gestión de Pagos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Agregar Pagos
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
                <strong>Monto</strong>
              </TableCell>
              <TableCell>
                <strong>Metodo_Pago</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha_Pago</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagos.map((Pagos) => (
              <TableRow key={Pagos.id}>
                <TableCell>{Pagos.monto}</TableCell>
                <TableCell>{Pagos.metodo_pago}</TableCell>
                <TableCell>
                  {Pagos.fecha_pago.toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleOpenDialog(Pagos)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(Pagos.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {pagos.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay Pagos registrados.
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
          {currentUser && pagos.some((u) => u.id === currentUser.id)
            ? "Editar Pagos"
            : "Agregar Pagos"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Monto"
              fullWidth
              variant="outlined"
              value={currentUser?.monto ?? ""}
              onChange={(e) =>
                setCurrentUser(
                  (prev) => prev && { ...prev, monto: Number(e.target.value) }
                )
              }
            />
            <TextField
              label="Metodo_Pago"
              fullWidth
              variant="outlined"
              value={currentUser?.metodo_pago ?? ""}
              onChange={(e) =>
                setCurrentUser(
                  (prev) => prev && { ...prev, metodo_pago: e.target.value }
                )
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha_Pago"
                value={
                  currentUser?.fecha_pago
                    ? dayjs(currentUser.fecha_pago)
                    : null
                }
                onChange={(newValue) => {
                  setCurrentUser(
                                      (prev) =>
                                        prev && {
                                          ...prev,
                                          fecha_pago: newValue ? newValue.toDate() : prev.fecha_pago,
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