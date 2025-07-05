import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/Lock';
import {
  Box, Button,
  CircularProgress,
  Divider, IconButton,
  InputAdornment, Paper, TextField, Typography
} from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logoDark.svg';
import { useLogin } from '../../services/login/useUserLogin';
import { useCheckEmail } from '../../services/validaciones/useCheckEmailRegistro'; // Importamos useCheckEmail
import { useAuthHandler } from '../hooks/states/useAuthHandler';

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  // Estados para manejar la autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPlayable, setIsPlayable] = useState(false);
  
  // Usar hook de login
  const {
    user,
    loading,
    error: loginError,
    message: loginMessage,
    loginWithEmail,
    loginWithGoogle,
    logout
  } = useLogin();
  
  // Estado local para mostrar errores
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

     // Usamos el hook existente para verificar emails
  const { checkEmailExists } = useCheckEmail();

  // Usar el handler de autenticación
  useAuthHandler({
    isAuthenticated,
    setIsAuthenticated,
    setIsEnabled,
    setIsPlayable
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Sincronizar errores y mensajes del hook
  useEffect(() => {
    if (loginError) setError(loginError);
    if (loginMessage) setMessage(loginMessage);
  }, [loginError, loginMessage]);

  // Manejar autenticación exitosa
  useEffect(() => {
    if (user) {
      // Verificar el rol del usuario
      if (user.role === 'ADMIN') {
        setError('Usted es un administrador, su cuenta no es válida en esta sección');
        logout();
      } else if (user.role === 'USUARIO') {
        setIsAuthenticated(true);
      }
    }
  }, [user, logout, setIsAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    
    // Validar campos
    if (!email || !password) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    await loginWithEmail(email, password);
  };

  const handleGoogleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    setGoogleLoading(true);
    
    try {
      // Obtener información de Google
      const userInfoResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      
      const userInfo = userInfoResponse.data;
      const email = userInfo.email;

      // Verificar si el email existe
      const result = await checkEmailExists(email);
      
      if (result.canRegister) {
        // Redirigir a registro si el usuario no existe
        navigate('/user/registro', {
          state: {
            googleUser: {
              email: userInfo.email,
              firstName: userInfo.given_name,
              lastName: userInfo.family_name || '',
              googleID: userInfo.sub
            }
          }
        });
      } else {
        // Determinar el tipo de cuenta por el mensaje
        if (result.message.includes("Google")) {
          // Si el mensaje menciona Google, intentar login
          await loginWithGoogle(userInfo.sub);
        } else {
          // Si no menciona Google, asumir que es cuenta con contraseña
          setError('Este correo ya está registrado con email y contraseña. Por favor, inicia sesión con tu contraseña.');
        }
      }
    } catch (error: any) {
      console.error('Error en el proceso de Google:', error);
      setError('Error en el inicio de sesión con Google: ' + error.message);
    } finally {
      setGoogleLoading(false);
    }
  },
    onError: (errorResponse) => {
      console.error('Error en login con Google:', errorResponse);
      setError('Error en la autenticación con Google');
      setGoogleLoading(false);
    },
  });
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
          Iniciar sesión
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
        
        {message && (
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
            {message}
          </Typography>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{
            '& > *': {
              transform: loaded ? 'translateY(0)' : 'translateY(10px)',
              opacity: loaded ? 1 : 0,
              transition: 'all 0.5s ease'
            },
            '& > :nth-of-type(1)': { transitionDelay: '0.4s' },
            '& > :nth-of-type(2)': { transitionDelay: '0.5s' },
            '& > :nth-of-type(3)': { transitionDelay: '0.6s' },
            '& > :nth-of-type(4)': { transitionDelay: '0.7s' },
            '& > :nth-of-type(5)': { transitionDelay: '0.8s' },
            '& > :nth-of-type(6)': { transitionDelay: '0.9s' },
            '& > :nth-of-type(7)': { transitionDelay: '1.0s' },
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
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
              mb: 2,
              '& .MuiInputBase-input': {
                color: '#e0f7fa',
              },
              '& .MuiInputLabel-root': {
                color: '#b2ebf2',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(178, 235, 242, 0.3)',
                },
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
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="medium"
                    sx={{ color: '#80deea' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 1,
              '& .MuiInputBase-input': {
                color: '#e0f7fa',
              },
              '& .MuiInputLabel-root': {
                color: '#b2ebf2',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(178, 235, 242, 0.3)',
                },
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

          <Typography variant="body2" align="right" sx={{ mb: 3, mt: 1 }}>
      <a 
        href="#" 
        style={{ 
          textDecoration: 'none', 
          color: '#80deea',
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          transition: 'color 0.3s ease, text-decoration 0.3s ease',
        }}
        onClick={(e) => {
          e.preventDefault(); // evita recarga
          navigate("/user/recuperar"); // <- Redirección con React Router
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#00bcd4';
          e.currentTarget.style.textDecoration = 'underline';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#80deea';
          e.currentTarget.style.textDecoration = 'none';
        }}
      >
        ¿Olvidaste tu contraseña?
      </a>
    </Typography>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              mb: 2,
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              background: 'linear-gradient(45deg, #00bcd4, #0097a7)',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 188, 212, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0, 188, 212, 0.4)',
                background: 'linear-gradient(45deg, #00bcd4, #00838f)'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s ease',
              },
              '&:hover::after': {
                transform: 'translateX(100%)'
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
          </Button>
          
          <Divider sx={{ 
            my: 3, 
            position: 'relative',
            borderColor: 'rgba(178, 235, 242, 0.2)',
            '&::before, &::after': { 
              borderColor: 'rgba(178, 235, 242, 0.2)'
            },
            '&::after': {
              content: '"o"',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(26, 26, 46, 0.7)',
              padding: '0 12px',
              color: '#80deea',
              fontWeight: 500,
              fontSize: '0.875rem'
            }
          }} />
          
          <Button
            fullWidth
            variant="outlined"
            startIcon={googleLoading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
            onClick={() => handleGoogleLogin()}
            disabled={googleLoading || loading}
            sx={{
              py: 1.5,
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              borderColor: 'rgba(178, 235, 242, 0.3)',
              color: '#e0f7fa',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#00bcd4',
                backgroundColor: 'rgba(0, 188, 212, 0.1)',
                boxShadow: '0 4px 12px rgba(0, 188, 212, 0.15)',
                transform: 'translateY(-2px)'
              },
              '& .MuiButton-startIcon': {
                transition: 'transform 0.3s ease',
              },
              '&:hover .MuiButton-startIcon': {
                transform: 'scale(1.1)'
              }
            }}
          >
            {googleLoading ? 'Autenticando...' : 'Continuar con Google'}
          </Button>
          
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
            ¿No tienes una cuenta?{' '}
            <a 
              href="registro" 
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
              Regístrate
            </a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;