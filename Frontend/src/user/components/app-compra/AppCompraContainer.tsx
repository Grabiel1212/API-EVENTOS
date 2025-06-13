import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Img1 from '../../../assets/events-img/c8.jpg';
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
    const navigate = useNavigate();
  const [cantidad, setCantidad] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [eventData, setEventData] = useState<EventData>({
    image: Img1,
    title: 'Concierto Internacional 2025',
    description: 'Vive la mejor experiencia musical del año con artistas de talla internacional...',
    location: 'Lima Arena',
    date: '20 de Julio, 2025 • 8:00 PM',
    rating: 4.5,
    reviews: 235,
    ticketsSold: 500,
    benefits: ['Acceso VIP', 'Bebida de bienvenida', 'Estacionamiento', 'Souvenir']
  });

  const precioUnitario = 70;
  const precioTotal = cantidad * precioUnitario;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setCantidad(Math.max(1, value));
    }
  };

  const handleComprarClick = () => {
    // Guardar datos en localStorage por si se recarga la página
    localStorage.setItem('compraData', JSON.stringify({
      eventData,
      cantidad,
      precioTotal
    }));
    
     navigate('/user/compra/pago');
    // O si prefieres hacerlo en dos pasos (compra -> pago):
    // navigate('/user/compra', {
    //   state: {
    //     eventData,
    //     cantidad,
    //     precioTotal,
    //     nextStep: '/user/compra/pago'
    //   }
    // });
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