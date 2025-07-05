// src/user/search/UbicacionEventosPage.tsx
import { useParams } from 'react-router-dom';
import { useEventosPorUbicacion } from '../../services/eventos/useEventosPorUbicacion';
import ContentApp from '../components/content/content-app';

const UbicacionEventosPage = () => {
  const { ubicacion } = useParams<{ ubicacion: string }>();
  const decodedUbicacion = ubicacion ? decodeURIComponent(ubicacion) : '';
  
  const { eventos, loading, error } = useEventosPorUbicacion(decodedUbicacion);
  
  return (
    <ContentApp 
      key={decodedUbicacion} // Agrega esta línea
      eventos={eventos}
      loading={loading}
      error={error || ''}
      isLocation={true}
      locationName={decodedUbicacion}
    />
  );
};

export default UbicacionEventosPage;