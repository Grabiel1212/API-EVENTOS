import {
    ArrowForward as ArrowForwardIcon,
    Event as EventIcon,
    Explore as ExploreIcon,
    People as PeopleIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';
import {
    Box, Button,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Fade,
    Grow,
    Slide,
    Typography,
    useMediaQuery, useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  const features = [
    { 
      icon: <EventIcon sx={{ fontSize: 40 }} />, 
      title: 'Eventos Diversos', 
      text: 'Conciertos, conferencias, deportes y mucho más en un solo lugar' 
    },
    { 
      icon: <PeopleIcon sx={{ fontSize: 40 }} />, 
      title: 'Comunidad Activa', 
      text: 'Conecta con otros asistentes y comparte experiencias' 
    },
    { 
      icon: <ExploreIcon sx={{ fontSize: 40 }} />, 
      title: 'Recomendaciones', 
      text: 'Eventos personalizados basados en tus intereses' 
    },
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: '#e2e8f0',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 30%, rgba(45, 78, 255, 0.15) 0%, transparent 40%),
                    radial-gradient(circle at 80% 70%, rgba(94, 234, 212, 0.15) 0%, transparent 40%)`,
        zIndex: 0
      }
    }}>
      {/* Partículas decorativas */}
      {[...Array(15)].map((_, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: '#94a3b8',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.4,
          animation: 'pulse 4s infinite',
          animationDelay: `${Math.random() * 2}s`,
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.3 },
            '50%': { transform: 'scale(1.5)', opacity: 0.6 }
          }
        }} />
      ))}
      
      <Container sx={{ 
        position: 'relative', 
        zIndex: 1, 
        py: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Cabecera */}
        <Slide in={loaded} direction="down" timeout={500}>
          <Box sx={{ textAlign: 'center', mb: 8, width: '100%' }}>
            <Typography variant="h3" component="h1" sx={{ 
              fontWeight: 800, 
              mb: 2,
              background: 'linear-gradient(90deg, #818cf8, #0ea5e9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Bienvenido a SAVAGE EVENTS
            </Typography>
            <Typography variant="h6" sx={{ 
              maxWidth: 700, 
              mx: 'auto', 
              color: '#cbd5e1',
              fontWeight: 300 
            }}>
              Plataforma integral para descubrir eventos y gestionar experiencias únicas
            </Typography>
          </Box>
        </Slide>
        
        {/* Tarjetas de opciones */}
        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          gap: 4,
          width: '100%',
          maxWidth: 1200,
          mt: 8
        }}>
          {/* Tarjeta 1: Iniciar Experiencia */}
          <Grow in={loaded} timeout={800}>
            <Card sx={{ 
              borderRadius: 4, 
              background: 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(148, 163, 184, 0.1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              flex: 1,
              minWidth: isMobile ? '100%' : 300,
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 15px 40px rgba(56, 189, 248, 0.2)',
                borderColor: 'rgba(56, 189, 248, 0.3)'
              }
            }}>
              <CardActionArea onClick={() => navigate('/user')} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4, height: '100%' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', 
                    alignItems: 'center',
                    height: '100%'
                  }}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: isMobile ? '100%' : 120,
                      height: 120,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
                      mb: isMobile ? 3 : 0,
                      mr: isMobile ? 0 : 3,
                      flexShrink: 0
                    }}>
                      <ExploreIcon sx={{ fontSize: 48, color: 'white' }} />
                    </Box>
                    
                    <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                      <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                        Iniciar Experiencia
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#94a3b8', mb: 2 }}>
                        Descubre eventos increíbles, reserva entradas y vive experiencias únicas diseñadas especialmente para ti.
                      </Typography>
                      <Button 
                        variant="outlined" 
                        endIcon={<ArrowForwardIcon />}
                        sx={{ 
                          mt: 2,
                          color: '#e0f2fe',
                          borderColor: '#38bdf8',
                          '&:hover': {
                            backgroundColor: 'rgba(56, 189, 248, 0.1)',
                            borderColor: '#7dd3fc'
                          }
                        }}
                      >
                        Explorar Eventos
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grow>
          
          {/* Tarjeta 2: Gestionar Eventos */}
          <Grow in={loaded} timeout={1000}>
            <Card sx={{ 
              borderRadius: 4, 
              background: 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(148, 163, 184, 0.1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              flex: 1,
              minWidth: isMobile ? '100%' : 300,
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 15px 40px rgba(74, 222, 128, 0.2)',
                borderColor: 'rgba(74, 222, 128, 0.3)'
              }
            }}>
              <CardActionArea onClick={() => navigate('/login')} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4, height: '100%' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', 
                    alignItems: 'center',
                    height: '100%'
                  }}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: isMobile ? '100%' : 120,
                      height: 120,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10b981 0%, #22d3ee 100%)',
                      mb: isMobile ? 3 : 0,
                      mr: isMobile ? 0 : 3,
                      flexShrink: 0
                    }}>
                      <SettingsIcon sx={{ fontSize: 48, color: 'white' }} />
                    </Box>
                    
                    <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                      <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                        Gestionar Eventos
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#94a3b8', mb: 2 }}>
                        Accede al panel de administración para crear eventos, gestionar asistentes y analizar estadísticas.
                      </Typography>
                      <Button 
                        variant="outlined" 
                        endIcon={<ArrowForwardIcon />}
                        sx={{ 
                          mt: 2,
                          color: '#e0f2fe',
                          borderColor: '#4ade80',
                          '&:hover': {
                            backgroundColor: 'rgba(74, 222, 128, 0.1)',
                            borderColor: '#86efac'
                          }
                        }}
                      >
                        Panel Administración
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grow>
        </Box>
        
        {/* Características */}
        <Fade in={loaded} timeout={1500}>
          <Box sx={{ 
            mt: 12, 
            textAlign: 'center',
            width: '100%',
            maxWidth: 1200
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, color: '#e2e8f0' }}>
              Descubre todas nuestras funcionalidades
            </Typography>
            
            <Box sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'center',
              gap: 4,
              width: '100%'
            }}>
              {features.map((feature, index) => (
                <Box key={index} sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(15, 23, 42, 0.5)',
                  flex: 1,
                  minWidth: 200,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    background: 'rgba(30, 41, 59, 0.7)'
                  }
                }}>
                  <Box sx={{ 
                    width: 70, 
                    height: 70, 
                    borderRadius: '50%', 
                    background: 'rgba(56, 189, 248, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    mx: 'auto'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    {feature.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Fade>
        
        {/* Footer */}
        <Fade in={loaded} timeout={2000}>
          <Box sx={{ 
            mt: 8, 
            pt: 4, 
            borderTop: '1px solid rgba(148, 163, 184, 0.1)', 
            textAlign: 'center',
            width: '100%'
          }}>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              © 2023 EventFlow - Todos los derechos reservados
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default LandingPage;