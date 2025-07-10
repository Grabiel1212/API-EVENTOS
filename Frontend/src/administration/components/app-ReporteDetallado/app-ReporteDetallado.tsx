import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useReporteResumen } from "../../../services/reportes/useReporteResumen"; // Ajusta la ruta según tu estructura

export default function ReporteResumen() {
  const { resumen, loading, error } = useReporteResumen();

  if (loading) {
    return <div>Cargando resumen...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Resumen de Compras por Usuario
        </Typography>
      </Stack>

      <TableContainer
        component={Paper}
        elevation={4}
        sx={{ borderRadius: 3, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Usuario</strong></TableCell>
              <TableCell><strong>Total de Compras</strong></TableCell>
              <TableCell><strong>Total Pagado</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resumen.map((usuario, index) => (
              <TableRow key={index}>
                <TableCell>{usuario.nombre_completo}</TableCell>
                <TableCell>{usuario.total_compras}</TableCell>
                <TableCell>{usuario.total_pagado}</TableCell>
              </TableRow>
            ))}
            {resumen.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay datos de resumen disponibles
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}