import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  keyframes,
  Rating,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';

// Animación personalizada simplificada
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// Componentes estilizados
const PremiumCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
  maxWidth: '1000px',
  margin: '0 auto',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
  }
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: 'all 0.3s ease',
  fontWeight: 'bold',
  letterSpacing: '1px',
  padding: '12px 24px',
  borderRadius: '50px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
    animation: `${pulseAnimation} 1s infinite`
  }
}));

const FloatingLabel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(0.5, 2),
  borderRadius: '20px',
  fontWeight: 'bold',
  fontSize: '0.8rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
  zIndex: 1,
  animation: `${pulseAnimation} 2s infinite`
}));

interface AppCompraUIProps {
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
  onCantidadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onComprarClick: () => void;
  isLoaded: boolean;
  eventData: {
    image: string;
    title: string;
    description: string;
    location: string;
    date: string;
    rating: number;
    reviews: number;
    ticketsSold: number;
    benefits: string[];
  };
}

const AppCompraUI: React.FC<AppCompraUIProps> = ({
  cantidad,
  precioUnitario,
  precioTotal,
  onCantidadChange,
  onComprarClick,
  isLoaded,
  eventData
}) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        maxWidth: '1000px', 
        mx: 'auto', 
        mt: { xs: 2, md: 5 },
        p: 2,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      <PremiumCard>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Sección de imagen */}
          <Box sx={{ 
            width: { xs: '100%', md: '45%' }, 
            position: 'relative',
            overflow: 'hidden'
          }}>
            <CardMedia
              component="img"
              height="100%"
              image={eventData.image}
              alt="Imagen del evento"
              sx={{
                height: { xs: '300px', md: '100%' },
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
            <Box sx={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              p: 3,
              color: 'white'
            }}>
              <Typography variant="h6" fontWeight="bold">
                {eventData.location}
              </Typography>
              <Typography variant="body2">
                {eventData.date}
              </Typography>
            </Box>
          </Box>
          
          {/* Sección de contenido */}
          <Box sx={{ 
            width: { xs: '100%', md: '55%' }, 
            p: { xs: 2, md: 4 }
          }}>
            <CardContent sx={{ p: 0 }}>
              {/* Título y descripción */}
              <Box>
                <Typography 
                  variant="h3" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '1.8rem', md: '2.4rem' },
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {eventData.title}
                </Typography>
              </Box>
              
              <Typography 
                variant="body1" 
                color="text.secondary" 
                mb={3}
                sx={{ lineHeight: 1.7 }}
              >
                {eventData.description}
              </Typography>

              <Divider sx={{ my: 2, borderColor: 'divider' }} />
              
              {/* Estrellas */}
              <Box display="flex" alignItems="center" mb={3}>
                <Rating value={eventData.rating} precision={0.5} readOnly sx={{ color: theme.palette.primary.main }} />
                <Typography variant="body2" ml={1} sx={{ fontWeight: 500 }}>
                  {eventData.rating.toFixed(1)} ({eventData.reviews} opiniones)
                </Typography>
                <Box 
                  sx={{ 
                    ml: 2, 
                    backgroundColor: 'rgba(46, 125, 50, 0.1)', 
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="caption" color="success.main" sx={{ fontWeight: 'bold' }}>
                    Más de {eventData.ticketsSold} entradas vendidas
                  </Typography>
                </Box>
              </Box>

              {/* Cantidad y precio */}
              <Box 
                sx={{ 
                  backgroundColor: 'rgba(33, 150, 243, 0.05)', 
                  p: 3, 
                  borderRadius: '12px',
                  mb: 3
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={3}
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  {/* Cantidad */}
                  <Box flex={1} sx={{ width: '100%' }}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      Cantidad de entradas
                    </Typography>
                    <TextField
                      type="number"
                      value={cantidad}
                      onChange={onCantidadChange}
                      InputProps={{ 
                        inputProps: { min: 1 },
                        sx: { 
                          borderRadius: '12px',
                          backgroundColor: 'background.paper'
                        }
                      }}
                      fullWidth
                      variant="outlined"
                    />
                  </Box>

                  {/* Precios */}
                  <Box flex={1} sx={{ width: '100%' }}>
                    <Typography variant="body1" mb={0.5}>
                      Precio unitario: 
                      <Box component="span" sx={{ float: 'right', fontWeight: 'bold' }}>
                        S/ {precioUnitario.toFixed(2)}
                      </Box>
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      Total: 
                      <Box component="span" sx={{ float: 'right' }}>
                        S/ {precioTotal.toFixed(2)}
                      </Box>
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Beneficios */}
              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Beneficios incluidos:
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {eventData.benefits.map((benefit, index) => (
                    <Box 
                      key={index}
                      sx={{
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        px: 2,
                        py: 1,
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      {benefit}
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Botón de compra */}
              <Box mt={3}>
                <AnimatedButton
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  sx={{ py: 2 }}
                  onClick={onComprarClick}
                >
                  Comprar Entradas
                </AnimatedButton>
              </Box>
              
              {/* Garantía */}
              <Box mt={2} textAlign="center">
                <Typography variant="caption" color="text.secondary">
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 0.5 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </Box>
                  Compra 100% segura • Reembolso garantizado
                </Typography>
              </Box>
            </CardContent>
          </Box>
        </Box>
      </PremiumCard>
    </Box>
  );
};

export default AppCompraUI;