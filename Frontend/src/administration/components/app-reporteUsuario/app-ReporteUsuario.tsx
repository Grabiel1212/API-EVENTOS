import {
    Box,
    Button,
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
import { useState } from "react";
import { useReporteUsuario } from "../../../services/reportes/useReporteUsuario";

export default function ReporteUsuario() {
  const [idInput, setIdInput] = useState("");
  const [idUsuario, setIdUsuario] = useState<number | null>(null);

  const {
    reporte,
    loading,
    error,
    refetch,
  } = useReporteUsuario(idUsuario ?? 0); // Hook permite 0, pero no se mostrará nada si es 0

  const handleBuscar = () => {
    const id = parseInt(idInput);
    if (!isNaN(id)) {
      setIdUsuario(id);
    }
  };

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Reporte Detallado por Usuario
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          label="ID del Usuario"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          variant="outlined"
          type="number"
        />
        <Button variant="contained" onClick={handleBuscar}>
          Buscar
        </Button>
      </Stack>

      {loading && <Typography>Cargando reporte...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      {!loading && reporte.length === 0 && idUsuario !== null && (
        <Typography color="text.secondary">
          No se encontraron registros para el usuario con ID {idUsuario}.
        </Typography>
      )}

      {reporte.length > 0 && (
        <TableContainer
          component={Paper}
          elevation={4}
          sx={{ borderRadius: 3, overflow: "hidden" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Evento</strong></TableCell>
                <TableCell><strong>Categoría</strong></TableCell>
                <TableCell><strong>Cantidad</strong></TableCell>
                <TableCell><strong>Monto</strong></TableCell>
                <TableCell><strong>Método de Pago</strong></TableCell>
                <TableCell><strong>Estado</strong></TableCell>
                <TableCell><strong>Fecha de Registro</strong></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {reporte.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.evento}</TableCell>
                  <TableCell>{item.categoria}</TableCell>
                  <TableCell>{item.cantidad}</TableCell>
                  <TableCell>S/ {item.monto}</TableCell>
                  <TableCell>{item.metodo_pago}</TableCell>
                  <TableCell>{item.estado_pago}</TableCell>
                  <TableCell>
  {item.fecha_registro
    ? new Date(item.fecha_registro).toLocaleString("es-PE", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Sin fecha"}
</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
