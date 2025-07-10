import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useReporteGeneral } from "../../../services/reportes/useReporteGeneral"; // Ajusta la ruta según tu estructura

export default function ReporteGeneral() {
    const { reporte, loading, error } = useReporteGeneral();

    if (loading) {
        return <div>Cargando reporte...</div>;
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
                    Reporte General de Compras
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
                            <TableCell><strong>Evento</strong></TableCell>
                            <TableCell><strong>Cantidad</strong></TableCell>
                            <TableCell><strong>Monto</strong></TableCell>
                            <TableCell><strong>Método Pago</strong></TableCell>
                            <TableCell><strong>Fecha Registro</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reporte.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{`${item.nombre} ${item.apellidos}`}</TableCell>
                                <TableCell>{item.nombre_evento}</TableCell>
                                <TableCell>{item.cantidad}</TableCell>
                                <TableCell>{item.monto}</TableCell>
                                <TableCell>{item.metodo_pago}</TableCell>
                                <TableCell>
                                    {
                                        typeof item.fecha_registro === "string" && !isNaN(Date.parse(item.fecha_registro))
                                            ? new Date(item.fecha_registro).toLocaleDateString()
                                            : "N/A"
                                    }

                                </TableCell>
                            </TableRow>
                        ))}
                        {reporte.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No hay datos de compras registrados
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