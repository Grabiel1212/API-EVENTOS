import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {
  Box, Button, CircularProgress, IconButton, InputAdornment, Paper, TextField, Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logoDark.svg';
import { useResetPassword } from '../../../services/usuarios/useResetPassword';
import { useCheckEmail } from '../../../services/validaciones/useCheckEmail';

const PasswordRecoveryForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: Nueva contraseña
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Usamos los hooks
  const { checkEmailExists } = useCheckEmail();
  const { resetPassword, loading: resetLoading } = useResetPassword();
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleSendEmail = async () => {
    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }
    
    // Validación simple de email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Verificamos el email usando el hook
      const result = await checkEmailExists(email);
      
      // Corregido: usar canRecover en lugar de canRegister
      if (!result.canRecover) {
        // Casos donde no se puede continuar
        setError(result.message);
        setLoading(false);
        return;
      }
      
      // Si todo está bien, avanzamos al paso 2
      setStep(2);
    } catch (error: any) {
      // Manejo seguro de errores
      setError('Error al verificar el correo: ' + (error.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Por favor completa ambos campos');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Llamamos al hook para resetear la contraseña
      await resetPassword({ email, password: newPassword });
      
      setSuccess('¡Contraseña actualizada correctamente!');
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/user/login');
      }, 2000);
    } catch (error: any) {
      // Manejo seguro de errores
      setError('Error al actualizar la contraseña: ' + (error.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1: // Paso 1: Ingresar email
        return (
          <Box sx={{ transition: 'all 0.5s ease' }}>
            <Typography variant="body1" sx={{ color: '#b2ebf2', mb: 3, textAlign: 'center' }}>
              Ingresa tu correo electrónico para recuperar tu contraseña
            </Typography>
            
            <TextField
              fullWidth
              label="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#80deea' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 3,
                '& .MuiInputBase-input': { color: '#e0f7fa' },
                '& .MuiInputLabel-root': { color: '#b2ebf2' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(178, 235, 242, 0.3)' },
                  '&:hover fieldset': { 
                    borderColor: '#4dd0e1', 
                    boxShadow: '0 0 0 3px rgba(77, 208, 225, 0.1)' 
                  },
                  '&.Mui-focused fieldset': { 
                    borderColor: '#00bcd4', 
                    boxShadow: '0 0 0 3px rgba(0, 188, 212, 0.2)' 
                  }
                },
              }}
            />
            
            <Button
              fullWidth
              variant="contained"
              onClick={handleSendEmail}
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                background: 'linear-gradient(45deg, #00bcd4, #0097a7)',
                color: '#fff',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 188, 212, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0, 188, 212, 0.4)',
                  background: 'linear-gradient(45deg, #00bcd4, #00838f)'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Siguiente'}
            </Button>
          </Box>
        );
      
      case 2: // Paso 2: Nueva contraseña
        return (
          <Box sx={{ transition: 'all 0.5s ease' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton 
                onClick={() => setStep(1)}
                sx={{ color: '#80deea', mr: 1 }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="body1" sx={{ color: '#b2ebf2' }}>
                Volver
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ color: '#b2ebf2', mb: 3, textAlign: 'center' }}>
              Por favor ingresa y confirma tu nueva contraseña
            </Typography>
            
            <TextField
              fullWidth
              label="Nueva contraseña"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#80deea' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                      size="medium"
                      sx={{ color: '#80deea' }}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 2,
                '& .MuiInputBase-input': { color: '#e0f7fa' },
                '& .MuiInputLabel-root': { color: '#b2ebf2' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(178, 235, 242, 0.3)' },
                  '&:hover fieldset': { 
                    borderColor: '#4dd0e1', 
                    boxShadow: '0 0 0 3px rgba(77, 208, 225, 0.1)' 
                  },
                  '&.Mui-focused fieldset': { 
                    borderColor: '#00bcd4', 
                    boxShadow: '0 0 0 3px rgba(0, 188, 212, 0.2)' 
                  }
                },
              }}
            />
            
            <TextField
              fullWidth
              label="Confirmar contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#80deea' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="medium"
                      sx={{ color: '#80deea' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 3,
                '& .MuiInputBase-input': { color: '#e0f7fa' },
                '& .MuiInputLabel-root': { color: '#b2ebf2' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(178, 235, 242, 0.3)' },
                  '&:hover fieldset': { 
                    borderColor: '#4dd0e1', 
                    boxShadow: '0 0 0 3px rgba(77, 208, 225, 0.1)' 
                  },
                  '&.Mui-focused fieldset': { 
                    borderColor: '#00bcd4', 
                    boxShadow: '0 0 0 3px rgba(0, 188, 212, 0.2)' 
                  }
                },
              }}
            />
            
            <Button
              fullWidth
              variant="contained"
              onClick={handleResetPassword}
              disabled={loading || resetLoading}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                background: 'linear-gradient(45deg, #00bcd4, #0097a7)',
                color: '#fff',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 188, 212, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0, 188, 212, 0.4)',
                  background: 'linear-gradient(45deg, #00bcd4, #00838f)'
                }
              }}
            >
              {(loading || resetLoading) ? <CircularProgress size={24} color="inherit" /> : 'Actualizar contraseña'}
            </Button>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: `
          radial-gradient(circle at center, #1a1a2e 0%, #16213e 70%, #0f3460 100%)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: 0
        }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 420,
          maxWidth: '90%',
          borderRadius: '24px',
          padding: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.5s ease',
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          opacity: loaded ? 1 : 0,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #00c1d4, #00a8b5, #007bff)',
            zIndex: 2
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 4,
          transform: loaded ? 'scale(1)' : 'scale(0.8)',
          opacity: loaded ? 1 : 0,
          transition: 'all 0.5s ease 0.2s'
        }}>
          <img 
            src={Logo} 
            alt="Logo de la empresa" 
            style={{ 
              height: '150px', 
              width: 'auto',
              filter: 'drop-shadow(0 4px 12px rgba(0, 193, 212, 0.3))'
            }} 
          />
        </Box>

        <Typography 
          variant="h5" 
          component="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            color: '#e0f7fa',
            mb: 3,
            position: 'relative',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            transform: loaded ? 'translateY(0)' : 'translateY(10px)',
            opacity: loaded ? 1 : 0,
            transition: 'all 0.5s ease 0.3s',
            '&::after': {
              content: '""',
              display: 'block',
              width: '50px',
              height: '3px',
              background: 'linear-gradient(90deg, #00c1d4, transparent)',
              margin: '16px auto 0',
              borderRadius: '3px'
            }
          }}
        >
          Recuperar contraseña
        </Typography>

        {/* Mostrar mensajes de error o éxito */}
        {error && (
          <Typography 
            color="error" 
            align="center" 
            sx={{ 
              mb: 2,
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 0, 0, 0.2)'
            }}
          >
            {error}
          </Typography>
        )}
        
        {success && (
          <Typography 
            color="success.main" 
            align="center" 
            sx={{ 
              mb: 2,
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(0, 255, 0, 0.2)'
            }}
          >
            {success}
          </Typography>
        )}

        <Box 
          sx={{
            position: 'relative',
            height: step === 1 ? '260px' : '390px',
            overflow: 'hidden',
            transition: 'height 0.5s ease'
          }}
        >
          {renderStep()}
        </Box>

        <Typography 
          variant="body2" 
          align="center" 
          sx={{ 
            mt: 3, 
            color: '#b2ebf2',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease 1.1s'
          }}
        >
          ¿Recordaste tu contraseña?{' '}
          <a 
            href="login" 
            style={{ 
              color: '#00bcd4',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'text-decoration 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            Inicia sesión
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default PasswordRecoveryForm;