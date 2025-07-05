// src/user/search/EventosPorFechaPage.tsx
import { useParams } from 'react-router-dom';
import { useEventosPorRangoFechas } from '../../services/eventos/useEventosPorRangoFechas';
import ContentApp from '../components/content/content-app';

const EventosPorFechaPage = () => {
  const { desde, hasta } = useParams<{ desde: string; hasta: string }>();
  
  // Decodificar fechas
  const fechaDesde = desde ? decodeURIComponent(desde) : '';
  const fechaHasta = hasta ? decodeURIComponent(hasta) : '';
  
  const { eventos, loading, error } = useEventosPorRangoFechas(fechaDesde, fechaHasta);
  
  // Formatear fechas para mostrar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const dateRangeString = `${formatDate(fechaDesde)} al ${formatDate(fechaHasta)}`;
  
  return (
    <ContentApp 
      eventos={eventos}
      loading={loading}
      error={error || ''}
      isDateRange={true}
      dateRangeString={dateRangeString}
    />
  );
};

export default EventosPorFechaPage;