import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEventosFilterSearch } from '../../services/eventos/useEventosFilterSearch';
import ContentApp from '../components/content/content-app';

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  const { eventos, cargando, error, buscarEventos } = useEventosFilterSearch();

  useEffect(() => {
    if (searchQuery) {
      buscarEventos(searchQuery);
    }
  }, [searchQuery]);

  return (
    <ContentApp 
      eventos={eventos}
      loading={cargando}
      error={error || ''}  // Cambiado aquí
      isSearch={true}
      searchQuery={searchQuery}
    />
  );
};

export default SearchResultsPage;