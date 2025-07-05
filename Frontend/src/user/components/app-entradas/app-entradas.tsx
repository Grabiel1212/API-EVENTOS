import {
  CalendarToday as DateIcon,
  Download as DownloadIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  CreditCard as PaymentIcon,
  QrCode as QrCodeIcon,
  Share as ShareIcon,
  ConfirmationNumber as TicketIcon
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  keyframes,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useEntradasPorUsuario } from '../../../services/registros/useEntradasPorUsuario';

// Animaciones personalizadas
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const AppEntradas: React.FC = () => {
  const theme = useTheme();
  const [userData, setUserData] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  
  // Obtener datos del usuario del localStorage
  useEffect(() => {
    const user = localStorage.getItem('userData');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);
  
  // Obtener entradas del usuario usando el hook
  const { entradas, loading, error } = useEntradasPorUsuario(userData?.id || 0);

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatearHora = (fecha: string) => {
    return new Date(fecha).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Variantes de animación para framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Función para descargar entrada
  const descargarEntrada = (id: number) => {
    console.log(`Descargar entrada ${id}`);
    // Implementar lógica de descarga
  };

  // Función para compartir entrada
  const compartirEntrada = (id: number) => {
    console.log(`Compartir entrada ${id}`);
    // Implementar lógica de compartir
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
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh'
      }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ 
      py: 6,
      background: loaded ? 'radial-gradient(circle at top, rgba(245,247,250,0.6), rgba(255,255,255,1))' : 'none',
      transition: 'background 0.8s ease'
    }}>
      <Box sx={{ 
        mb: 6, 
        textAlign: 'center',
        animation: `${fadeIn} 0.8s ease-out`
      }}>
        <Typography variant="h3" component="h1" sx={{ 
          fontWeight: 800,
          background: 'linear-gradient(90deg, #2d3748 0%, #4a5568 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
          letterSpacing: '0.5px'
        }}>
          Mis Entradas Compradas
        </Typography>
        <Typography variant="subtitle1" sx={{ 
          color: theme.palette.text.secondary,
          fontSize: '1.1rem',
          maxWidth: 600,
          mx: 'auto'
        }}>
          Todas tus entradas adquiridas en un solo lugar
        </Typography>
      </Box>
      
      {entradas.length > 0 ? (
        <Stack spacing={4}>
          {entradas.map((entrada, index) => (
            <motion.div
              key={entrada.id_registro}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={loaded ? "visible" : "hidden"}
              whileHover={{ y: -5 }}
              style={{ position: 'relative' }}
            >
              {/* Efecto de borde sutil */}
              <Box sx={{
                position: 'absolute',
                top: -1,
                left: -1,
                right: -1,
                bottom: -1,
                background: 'linear-gradient(135deg, rgba(66,153,225,0.3), rgba(102,126,234,0))',
                borderRadius: '24px',
                zIndex: -1,
                filter: 'blur(5px)',
                opacity: 0.7
              }} />
              
              <Card sx={{ 
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.05)',
                overflow: 'visible',
                position: 'relative',
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(237,242,247,0.8)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 15px 40px rgba(66,153,225,0.15), 0 5px 15px rgba(0,0,0,0.07)',
                  transform: 'translateY(-3px)'
                }
              }}>
                {/* Badge de número de orden premium */}
                <Box sx={{
                  position: 'absolute',
                  top: -16,
                  right: 24,
                  bgcolor: 'linear-gradient(135deg, #2d3748, #4a5568)',
                  background: 'linear-gradient(135deg, #2d3748, #4a5568)',
                  color: 'white',
                  px: 2.5,
                  py: 0.7,
                  borderRadius: 12,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <TicketIcon sx={{ mr: 1, fontSize: '1rem' }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
                    #{entrada.id_registro}
                  </Typography>
                </Box>
                
                <CardContent sx={{ p: 0 }}>
                  {/* Sección de evento con efecto de vidrio */}
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    p: 4, 
                    pb: 3,
                    background: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${entrada.imagen_evento})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderBottom: '1px solid rgba(237,242,247,0.8)',
                    borderRadius: '16px 16px 0 0',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(255,255,255,0.85)',
                      zIndex: 0
                    }
                  }}>
                    <Box sx={{ 
                      flex: 1, 
                      pr: { sm: 3 }, 
                      mb: { xs: 3, sm: 0 },
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <Chip 
                        label="Evento" // Categoría fija por ahora
                        color="primary" 
                        size="small"
                        sx={{ 
                          mb: 2,
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                          background: 'linear-gradient(135deg, #4299e1, #3182ce)',
                          color: 'white',
                          boxShadow: '0 2px 5px rgba(66,153,225,0.2)'
                        }}
                      />
                      <Typography variant="h5" component="h2" sx={{ 
                        fontWeight: 700, 
                        mb: 1.5,
                        color: '#2d3748',
                        fontSize: '1.5rem'
                      }}>
                        {entrada.nombre_evento}
                      </Typography>
                      
                      <Stack spacing={1.5} sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <DateIcon sx={{ 
                            mr: 1.5, 
                            color: '#4299e1',
                            fontSize: '1.2rem'
                          }} />
                          <Typography variant="body1" sx={{ color: '#4a5568', fontWeight: 500 }}>
                            <strong style={{ color: '#2d3748' }}>{formatearFecha(entrada.fecha_inicio)}</strong> | {formatearHora(entrada.fecha_inicio)}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon sx={{ 
                            mr: 1.5, 
                            color: '#4299e1',
                            fontSize: '1.2rem'
                          }} />
                          <Typography variant="body1" sx={{ color: '#4a5568', fontWeight: 500 }}>
                            Ubicación no especificada
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    
                    {/* Código QR con efecto premium */}
                    <Box 
                      sx={{ 
                        width: { xs: '100%', sm: 140 }, 
                        height: 140,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'white',
                        borderRadius: 2,
                        border: '1px solid rgba(226,232,240,0.8)',
                        overflow: 'hidden',
                        alignSelf: { xs: 'center', sm: 'flex-start' },
                        position: 'relative',
                        zIndex: 1,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.03)',
                          boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <QrCodeIcon sx={{ fontSize: 80, color: '#e2e8f0' }} />
                    </Box>
                  </Box>
                  
                  {/* Sección de detalles de compra */}
                  <Box sx={{ p: 4, pt: 3 }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      mb: 2.5,
                      color: '#2d3748',
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -8,
                        left: 0,
                        width: '40px',
                        height: '3px',
                        background: 'linear-gradient(90deg, #4299e1, #3182ce)',
                        borderRadius: 2
                      }
                    }}>
                      Detalles de Compra
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 3,
                      mt: 2
                    }}>
                      <Box sx={{ flex: 1 }}>
                        <Stack spacing={2}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <EventIcon sx={{ 
                              mr: 1.5, 
                              color: '#4299e1',
                              mt: '2px',
                              fontSize: '1.2rem'
                            }} />
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: '#718096', 
                                fontWeight: 500,
                                mb: 0.5
                              }}>
                                Fecha de compra
                              </Typography>
                              <Typography variant="body1" sx={{ color: '#2d3748', fontWeight: 600 }}>
                                {formatearFecha(entrada.fecha_registro)}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <TicketIcon sx={{ 
                              mr: 1.5, 
                              color: '#4299e1',
                              mt: '2px',
                              fontSize: '1.2rem'
                            }} />
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: '#718096', 
                                fontWeight: 500,
                                mb: 0.5
                              }}>
                                Cantidad
                              </Typography>
                              <Typography variant="body1" sx={{ color: '#2d3748', fontWeight: 600 }}>
                                {entrada.cantidad} entrada{entrada.cantidad > 1 ? 's' : ''}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <PaymentIcon sx={{ 
                              mr: 1.5, 
                              color: '#4299e1',
                              mt: '2px',
                              fontSize: '1.2rem'
                            }} />
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: '#718096', 
                                fontWeight: 500,
                                mb: 0.5
                              }}>
                                Método de pago
                              </Typography>
                              <Typography variant="body1" sx={{ color: '#2d3748', fontWeight: 600 }}>
                                {entrada.metodo_pago}
                              </Typography>
                            </Box>
                          </Box>
                        </Stack>
                      </Box>
                      
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ 
                          background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
                          p: 3, 
                          borderRadius: 2,
                          border: '1px solid rgba(226,232,240,0.8)',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.03)'
                        }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            mb: 1.5,
                            alignItems: 'center'
                          }}>
                            <Typography variant="body2" sx={{ color: '#718096', fontWeight: 500 }}>
                              Precio unitario
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#2d3748', fontWeight: 600 }}>
                              S/ {entrada.precio.toFixed(2)}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            mb: 1.5,
                            alignItems: 'center'
                          }}>
                            <Typography variant="body2" sx={{ color: '#718096', fontWeight: 500 }}>
                              Cantidad
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#2d3748', fontWeight: 600 }}>
                              {entrada.cantidad}
                            </Typography>
                          </Box>
                          
                          <Divider sx={{ 
                            my: 2, 
                            borderColor: 'rgba(226,232,240,0.8)',
                            borderWidth: '1px'
                          }} />
                          
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2.5
                          }}>
                            <Typography variant="body1" sx={{ 
                              fontWeight: 700, 
                              color: '#2d3748',
                              fontSize: '1.1rem'
                            }}>
                              Total pagado
                            </Typography>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 800, 
                              color: '#2b6cb0',
                              fontSize: '1.4rem'
                            }}>
                              S/ {entrada.monto_total.toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Sección de información del usuario */}
                  <Box sx={{ 
                    p: 4, 
                    pt: 3, 
                    background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
                    borderTop: '1px solid rgba(226,232,240,0.8)',
                    borderRadius: '0 0 16px 16px'
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      mb: 2.5,
                      color: '#2d3748',
                      position: 'relative',
                      display: 'inline-block',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -8,
                        left: 0,
                        width: '40px',
                        height: '3px',
                        background: 'linear-gradient(90deg, #4299e1, #3182ce)',
                        borderRadius: 2
                      }
                    }}>
                      Información del Comprador
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mt: 2
                    }}>
                      <Avatar sx={{ 
                        background: 'linear-gradient(135deg, #4299e1, #3182ce)',
                        mr: 2.5,
                        width: 50,
                        height: 50,
                        fontSize: '1.5rem',
                        fontWeight: 600
                      }}>
                        {userData?.nombre?.charAt(0) || 'U'}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 700, 
                          color: '#2d3748',
                          fontSize: '1.1rem'
                        }}>
                          {userData?.nombre || 'Usuario'}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: '#718096', 
                          fontWeight: 500,
                          mt: 0.5
                        }}>
                          {userData?.email || ''}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
                
                {/* Acciones con efectos premium */}
                <Box sx={{ 
                  p: 3, 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  background: 'rgba(255,255,255,0.7)',
                  borderTop: '1px solid rgba(237,242,247,0.8)',
                  borderRadius: '0 0 16px 16px'
                }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<DownloadIcon />}
                    sx={{ 
                      mr: 2,
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      borderRadius: 2,
                      borderWidth: '2px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
                        borderWidth: '2px',
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={() => descargarEntrada(entrada.id_registro)}
                  >
                    Descargar
                  </Button>
                  <Button 
                    variant="contained" 
                    startIcon={<ShareIcon />}
                    sx={{ 
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #4299e1, #3182ce)',
                      boxShadow: '0 4px 10px rgba(66,153,225,0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #3182ce, #2b6cb0)',
                        boxShadow: '0 6px 15px rgba(66,153,225,0.4)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={() => compartirEntrada(entrada.id_registro)}
                  >
                    Compartir
                  </Button>
                </Box>
              </Card>
            </motion.div>
          ))}
        </Stack>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            p: 8,
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            boxShadow: '0 15px 40px rgba(0,0,0,0.05)',
            border: '1px solid rgba(237,242,247,0.8)',
            maxWidth: 600,
            mx: 'auto'
          }}>
            <Box sx={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
              mb: 3,
              animation: `${pulse} 2s infinite ease-in-out`
            }}>
              <EventIcon sx={{ 
                fontSize: 50, 
                color: theme.palette.primary.main,
              }} />
            </Box>
            <Typography variant="h5" sx={{ 
              fontWeight: 700, 
              mb: 1.5,
              color: '#2d3748'
            }}>
              No tienes entradas compradas
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: 3, 
              maxWidth: 500, 
              mx: 'auto',
              color: '#718096',
              fontSize: '1.1rem'
            }}>
              Aún no has adquirido entradas para ningún evento. Explora nuestras experiencias premium disponibles.
            </Typography>
            <Button 
              variant="contained" 
              sx={{ 
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4299e1, #3182ce)',
                boxShadow: '0 4px 10px rgba(66,153,225,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3182ce, #2b6cb0)',
                  boxShadow: '0 6px 15px rgba(66,153,225,0.4)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Descubrir eventos
            </Button>
          </Box>
        </motion.div>
      )}
    </Container>
  );
};

export default AppEntradas;