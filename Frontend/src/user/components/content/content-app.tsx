import {
  Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  IconButton, ListItemIcon, ListItemText, Menu, MenuItem,
  Pagination,
  Snackbar,
  Stack,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEventosAleatorios } from '../../../services/eventos/useEventosAleatorios';

// Íconos principales
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Importación añadida
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';

// Íconos de redes sociales
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import SearchIcon from '@mui/icons-material/Search';

// Define la interfaz Evento
interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  precio: number;
  imagen: string;
  id_categoria: number;
  creado_evento: string;
  actualizado_evento: string;

}

interface ContentAppProps {
  eventos?: Evento[];
  loading?: boolean;
  error?: string;
  isSearch?: boolean;
  isCategory?: boolean;
  searchQuery?: string;
  categoryName?: string;
   isLocation?: boolean;
  locationName?: string;
  isDateRange?: boolean;
  dateRangeString?: string;
}

const ContentApp = ({
  eventos: propEventos,
  loading: propLoading,
  error: propError,
  isSearch = false,
  isCategory = false,
  searchQuery = '',
  categoryName = '',
   isLocation = false,
  locationName = '',
   isDateRange = false,
  dateRangeString = ''
}: ContentAppProps) => {
  const navigate = useNavigate();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openShareMenu = Boolean(anchorEl);
  
  // Estado para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const eventosPorPagina = 12;

  // Usar el hook con parámetros de paginación
  const { eventos: randomEventos, loading: randomLoading, error: randomError, totalPaginas, totalEventos } = 
    useEventosAleatorios(paginaActual, eventosPorPagina);

  // Determinar qué eventos mostrar
  const eventos = isSearch || isCategory ? (propEventos || []) : randomEventos;
  const loading = isSearch || isCategory ? (propLoading || false) : randomLoading;
  const error = isSearch || isCategory ? (propError || null) : randomError;

  // Solución: Usar estado para autenticación + efecto para cambios
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar autenticación al montar y en cambios de localStorage
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem("isAuthenticated") === "true");
    };

    checkAuth();

    // Escuchar cambios en localStorage
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleBuyClick = (eventoId: number) => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
    } else {
      navigate(`/user/compra/${eventoId}`);
    }
  };

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setOpenSnackbar(true);
    handleShareClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'long'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPaginaActual(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <Box sx={{ 
        textAlign: 'center', 
        py: 10,
        color: 'error.main'
      }}>
        <Typography variant="h6" gutterBottom>
          Error al cargar los eventos
        </Typography>
        <Typography variant="body1" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="outlined" 
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Reintentar
        </Button>
      </Box>
    );
  }

  return (
  <Box sx={{ px: { xs: 2, md: 6 }, py: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
  {isSearch ? (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <SearchIcon color="primary" sx={{ mr: 1, fontSize: '2rem' }} />
      <Typography variant="h4" fontWeight="bold">
        Resultados de búsqueda
      </Typography>
      <Typography variant="subtitle1" sx={{ ml: 2, color: 'text.secondary' }}>
        para "{searchQuery}"
      </Typography>
    </Box>
  ) : isCategory ? (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <LocalOfferIcon color="primary" sx={{ mr: 1, fontSize: '2rem' }} />
      <Typography variant="h4" fontWeight="bold">
        Eventos en {categoryName}
      </Typography>
      {eventos.length > 0 && (
        <Typography variant="subtitle1" sx={{ ml: 2, color: 'text.secondary' }}>
          ({eventos.length} eventos disponibles)
        </Typography>
      )}
    </Box>
  ) : isLocation ? ( // Condicional separado para ubicación
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <LocationOnIcon color="primary" sx={{ mr: 1, fontSize: '2rem' }} />
      <Typography variant="h4" fontWeight="bold">
        Eventos en {locationName}
      </Typography>
      {eventos.length > 0 && (
        <Typography variant="subtitle1" sx={{ ml: 2, color: 'text.secondary' }}>
          ({eventos.length} eventos disponibles)
        </Typography>
      )}
    </Box>
  ) : isDateRange ? (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <CalendarTodayIcon color="primary" sx={{ mr: 1, fontSize: '2rem' }} />
          <Typography variant="h4" fontWeight="bold">
            Eventos del {dateRangeString}
          </Typography>
          {eventos.length > 0 && (
            <Typography variant="subtitle1" sx={{ ml: 2, color: 'text.secondary' }}>
              ({eventos.length} eventos disponibles)
            </Typography>
          )}
        </Box>
      ) :( // Caso por defecto: Eventos destacados
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <StarIcon color="warning" sx={{ mr: 1, fontSize: '2rem' }} />
      <Typography variant="h4" fontWeight="bold">
        Eventos Destacados
      </Typography>
      {totalEventos > 0 && (
        <Typography variant="subtitle1" sx={{ ml: 2, color: 'text.secondary' }}>
          ({totalEventos} eventos disponibles)
        </Typography>
      )}
    </Box>
  )}

     <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: '1fr 1fr',
        md: '1fr 1fr 1fr',
        lg: 'repeat(4, 1fr)',
      },
      gap: 4,
      mb: 4,
    }}
  >
        {eventos.map((event) => (
          <Card
            key={event.id}
            sx={{
              borderRadius: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
              },
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={event.imagen}
              alt={event.titulo}
              sx={{
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                objectFit: 'cover',
              }}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Chip
                  label="Evento Premium"
                  size="small"
                  color="warning"
                  icon={<StarIcon fontSize="small" />}
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {event.titulo}
              </Typography>

              <Box
                sx={{
                  display: 'inline-block',
                  background: 'linear-gradient(45deg, #FFC107 30%, #FF9800 90%)',
                  color: 'black',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  mb: 1.5,
                }}
              >
                {formatDate(event.fecha_inicio)}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CalendarTodayIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {formatTime(event.fecha_inicio)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <LocationOnIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {event.ubicacion || 'Ubicación no disponible'}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleBuyClick(event.id)}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  py: 1.2,
                  mt: 'auto',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 8px rgba(33, 150, 243, 0.4)',
                  },
                }}
              >
                Comprar entrada
              </Button>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                  borderTop: '1px solid #eee',
                  pt: 1.5,
                }}
              >
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={handleShareClick}
                  aria-label="Compartir"
                  aria-controls={openShareMenu ? 'share-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openShareMenu ? 'true' : undefined}
                >
                  <ShareIcon />
                </IconButton>

                <IconButton size="small" color="secondary">
                  <BookmarkBorderIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Paginación - Solo para eventos destacados */}
      {!isSearch && !isCategory && totalPaginas > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
          <Stack spacing={2}>
            <Pagination
              count={totalPaginas}
              page={paginaActual}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '1.1rem',
                  minWidth: 36,
                  height: 36,
                },
                '& .Mui-selected': {
                  fontWeight: 'bold',
                  transform: 'scale(1.1)',
                }
              }}
            />
          </Stack>
        </Box>
      )}

      {/* Modal de login */}
      <Dialog
        open={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        aria-labelledby="login-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(to bottom right, #f5f7fa, #e4e8f0)',
          },
        }}
      >
        <DialogTitle
          id="login-dialog-title"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#1976d2',
            pt: 3,
          }}
        >
          Acceso Requerido
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: 'center',
              fontSize: '1.1rem',
              color: '#555',
              px: 4,
              py: 2,
            }}
          >
            Para continuar con tu compra, por favor inicia sesión en tu cuenta
          </DialogContentText>

          <Box sx={{ textAlign: 'center', my: 2 }}>
            <svg width="80" height="80" viewBox="0 0 24 24" style={{ margin: '0 auto' }}>
              <path
                fill="#1976d2"
                d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
              />
            </svg>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setOpenLoginModal(false)}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              borderWidth: 2,
              '&:hover': { borderWidth: 2 },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/user/login"
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
              '&:hover': {
                boxShadow: '0 4px 8px rgba(33, 150, 243, 0.4)',
              },
            }}
            onClick={() => {
              // Guardar la URL actual para redirigir después del login
              localStorage.setItem('redirectAfterLogin', window.location.pathname);
            }}
          >
            Iniciar Sesión
          </Button>
        </DialogActions>
      </Dialog>

      {/* Menú de compartir */}
      <Menu
        id="share-menu"
        anchorEl={anchorEl}
        open={openShareMenu}
        onClose={handleShareClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copiar enlace</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareClose}>
          <ListItemIcon>
            <WhatsAppIcon fontSize="small" sx={{ color: '#25D366' }} />
          </ListItemIcon>
          <ListItemText>WhatsApp</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareClose}>
          <ListItemIcon>
            <FacebookIcon fontSize="small" sx={{ color: '#1877F2' }} />
          </ListItemIcon>
          <ListItemText>Facebook</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareClose}>
          <ListItemIcon>
            <InstagramIcon fontSize="small" sx={{ color: '#E1306C' }} />
          </ListItemIcon>
          <ListItemText>Instagram</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareClose}>
          <ListItemIcon>
            <TwitterIcon fontSize="small" sx={{ color: '#1DA1F2' }} />
          </ListItemIcon>
          <ListItemText>Twitter</ListItemText>
        </MenuItem>
      </Menu>

      {/* Snackbar de enlace copiado */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Enlace copiado al portapapeles"
      />
    </Box>
  );
};

export default ContentApp;