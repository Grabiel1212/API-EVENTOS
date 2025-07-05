import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEventoPorId } from '../../../services/eventos/useEventoPorId';
import AppCompraUI from './app-compra';

interface EventData {
  image: string;
  title: string;
  description: string;
  location: string;
  date: string;
  rating: number;
  reviews: number;
  ticketsSold: number;
  benefits: string[];
}

const AppCompraContainer: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Convertir eventId a número
  const id = eventId ? parseInt(eventId) : 0;
  const { evento, loading, error } = useEventoPorId(id);

  // Precio unitario del evento, si existe
  const precioUnitario = evento?.precio || 0;
  const precioTotal = cantidad * precioUnitario;

  useEffect(() => {
    if (!loading) {
      // Simulamos un pequeño retraso para la animación de carga
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setCantidad(Math.max(1, value));
    }
  };

  const handleComprarClick = () => {
    if (!evento) return;

    // Guardar datos en localStorage
    localStorage.setItem('compraData', JSON.stringify({
      eventoId: evento.id,
      cantidad,
      precioTotal,
      evento // Guardamos el objeto completo por si se necesita
    }));
    
    // Navegar a la página de pago con el eventId
    navigate(`/user/compra/${eventId}/pago`);
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Reintentar
        </Button>
      </Box>
    );
  }

  if (!evento) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h6" gutterBottom>
          Evento no encontrado
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/user')}
          sx={{ mt: 2 }}
        >
          Volver al inicio
        </Button>
      </Box>
    );
  }

  // Construir el objeto eventData para pasar al UI
  const eventData: EventData = {
    image: evento.imagen,
    title: evento.titulo,
    description: evento.descripcion,
    location: evento.ubicacion,
    date: formatDate(evento.fecha_inicio),
    rating: 4.5, // Valor por defecto o de la API si lo tuviera
    reviews: 235, // Valor por defecto o de la API si lo tuviera
    ticketsSold: 500, // Valor por defecto o de la API si lo tuviera
    benefits: ['Acceso VIP', 'Bebida de bienvenida', 'Estacionamiento', 'Souvenir'] // Valor por defecto o de la API si lo tuviera
  };

  return (
    <AppCompraUI
      cantidad={cantidad}
      precioUnitario={precioUnitario}
      precioTotal={precioTotal}
      onCantidadChange={handleCantidadChange}
      onComprarClick={handleComprarClick}
      isLoaded={isLoaded}
      eventData={eventData}
    />
  );
};

export default AppCompraContainer;