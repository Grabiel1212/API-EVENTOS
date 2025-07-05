// src/user/components/app-pagos/PagoExito.tsx
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const PagoExito = () => {
  const location = useLocation();
  const { evento, cantidad, precioTotal } = location.state || {};

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '70vh',
      textAlign: 'center',
      p: 3
    }}>
      <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
      <Typography variant="h4" gutterBottom>
        ¡Pago realizado con éxito!
      </Typography>
      
      {evento && (
        <Box sx={{ mt: 3, mb: 4, maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            {evento.titulo}
          </Typography>
          <Typography variant="body1">
            Cantidad: {cantidad} entradas
          </Typography>
          <Typography variant="body1">
            Total pagado: S/ {precioTotal.toFixed(2)}
          </Typography>
        </Box>
      )}
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        Recibirás un correo electrónico con los detalles de tu compra y las entradas.
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        component={Link}
        to="/user"
        sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
      >
        Volver al inicio
      </Button>
    </Box>
  );
};

export default PagoExito;