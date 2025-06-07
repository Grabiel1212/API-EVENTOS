// src/components/AppEntradas/useEntradas.ts
import { useState } from 'react';
import type { Entrada } from './types';

const useEntradas = () => {
  // Estado para las entradas
  const [entradas, setEntradas] = useState<Entrada[]>([
    {
      id: 1,
      evento: {
        titulo: 'Concierto de Rock en la Ciudad',
        fecha: '15 Julio 2025',
        hora: '20:00 - 23:00',
        lugar: 'Estadio Central, Ciudad',
        imagen: 'https://source.unsplash.com/random/800x600/?concert',
        categoria: 'Música'
      },
      compra: {
        fecha: '2025-06-05',
        cantidad: 2,
        precioUnitario: 45.00,
        total: 90.00,
        metodo: 'Tarjeta Visa',
        numeroOrden: 'ORD-789456'
      },
      usuario: {
        nombre: 'Juan Pérez',
        email: 'juan.perez@example.com'
      },
      codigoQr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ENTRADA-789456'
    },
    {
      id: 2,
      evento: {
        titulo: 'Festival de Cine Internacional',
        fecha: '22 Agosto 2025',
        hora: '18:30 - 21:30',
        lugar: 'Teatro Municipal, Ciudad',
        imagen: 'https://source.unsplash.com/random/800x600/?cinema',
        categoria: 'Cine'
      },
      compra: {
        fecha: '2025-06-01',
        cantidad: 1,
        precioUnitario: 25.00,
        total: 25.00,
        metodo: 'PayPal',
        numeroOrden: 'ORD-123789'
      },
      usuario: {
        nombre: 'Juan Pérez',
        email: 'juan.perez@example.com'
      },
      codigoQr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ENTRADA-123789'
    }
  ]);

  // Función para descargar entrada
  const descargarEntrada = (id: number) => {
    console.log(`Descargando entrada con ID: ${id}`);
    // Lógica para descargar la entrada
  };

  // Función para compartir entrada
  const compartirEntrada = (id: number) => {
    console.log(`Compartiendo entrada con ID: ${id}`);
    // Lógica para compartir la entrada
  };

  return {
    entradas,
    descargarEntrada,
    compartirEntrada
  };
};

export default useEntradas;