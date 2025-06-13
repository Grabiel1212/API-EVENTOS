import { Box, Grow, Paper, Slide, Typography, keyframes } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Logo from '../../../assets/logoDark.svg';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';

// Animaciones personalizadas
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 193, 212, 0); }
  50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(0, 193, 212, 0.4); }
  100% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 193, 212, 0); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [loaded, setLoaded] = useState(false);
  const [stepLoaded, setStepLoaded] = useState(true);

  useEffect(() => {
    // Animación de entrada
    setLoaded(true);
    
    // Animación de los pasos
    setStepLoaded(false);
    const timer = setTimeout(() => {
      setStepLoaded(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [step]);

  const nextStep = () => {
    setStepLoaded(false);
    setTimeout(() => {
      setStep(step + 1);
    }, 300);
  };

  const prevStep = () => {
    setStepLoaded(false);
    setTimeout(() => {
      setStep(step - 1);
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí iría la lógica para enviar los datos al backend
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
      <Grow in={loaded} timeout={800} style={{ transformOrigin: 'center' }}>
        <Paper
          elevation={0}
          sx={{
            width: 500,
            maxWidth: '95%',
            borderRadius: '24px',
            padding: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            animation: `${pulse} 3s infinite`,
            transition: 'all 0.5s ease',
            '&:hover': {
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)'
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #00c1d4, #00a8b5, #007bff)',
              backgroundSize: '300% 100%',
              animation: `${gradientAnimation} 3s ease infinite`,
              zIndex: 2
            }
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 3,
              animation: `${fadeIn} 0.8s ease-out`
            }}
          >
           <Box
  component="img"
  src={Logo}
  alt="Logo de la empresa"
  sx={{
    height: '80px',
    width: 'auto',
    filter: 'drop-shadow(0 4px 12px rgba(0, 193, 212, 0.3))',
    transition: 'transform 0.5s ease',
    '&:hover': {
      transform: 'scale(1.05) rotate(-2deg)'
    }
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
              animation: `${fadeIn} 1s ease-out`,
              '&::after': {
                content: '""',
                display: 'block',
                width: '50px',
                height: '3px',
                background: 'linear-gradient(90deg, #00c1d4, transparent)',
                margin: '16px auto 0',
                borderRadius: '3px',
                transition: 'all 0.5s ease',
                animation: `${fadeIn} 1.2s ease-out`
              }
            }}
          >
            Crear cuenta
          </Typography>

          {/* Indicador de progreso */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 4,
              position: 'relative',
              animation: `${fadeIn} 1.4s ease-out`,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '2px',
                background: 'rgba(178, 235, 242, 0.2)',
                zIndex: 1,
                transition: 'all 0.5s ease'
              }
            }}
          >
            {[1, 2, 3].map((num) => (
              <Grow 
                key={num} 
                in={loaded} 
                timeout={500 + num * 200}
                style={{ transformOrigin: 'center' }}
              >
                <Box sx={{ 
                  position: 'relative', 
                  zIndex: 2,
                  mx: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: step >= num ? '#00bcd4' : 'rgba(178, 235, 242, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: step >= num ? '#fff' : '#b2ebf2',
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: step >= num ? '0 0 10px rgba(0, 188, 212, 0.5)' : 'none',
                      transition: 'all 0.5s ease',
                      animation: step === num ? `${pulse} 2s infinite` : 'none'
                    }}
                  >
                    {num}
                  </Box>
                </Box>
              </Grow>
            ))}
          </Box>

          {/* Contenido del formulario basado en el paso actual */}
          <Box component="form" onSubmit={handleSubmit}>
            <Slide 
              direction={step === 1 ? 'right' : step === 2 ? 'left' : 'right'} 
              in={stepLoaded} 
              mountOnEnter 
              unmountOnExit
              timeout={300}
            >
              <div>
                {step === 1 && (
                  <RegisterStep1 
                    formData={formData} 
                    handleChange={handleChange} 
                    nextStep={nextStep} 
                  />
                )}
              </div>
            </Slide>
            
            <Slide 
              direction={step === 2 ? 'right' : step === 3 ? 'left' : 'right'} 
              in={step === 2 && stepLoaded} 
              mountOnEnter 
              unmountOnExit
              timeout={300}
            >
              <div>
                {step === 2 && (
                  <RegisterStep2 
                    formData={formData} 
                    handleChange={handleChange} 
                    nextStep={nextStep}
                    prevStep={prevStep}
                  />
                )}
              </div>
            </Slide>
            
            <Slide 
              direction={step === 3 ? 'right' : 'left'} 
              in={step === 3 && stepLoaded} 
              mountOnEnter 
              unmountOnExit
              timeout={300}
            >
              <div>
                {step === 3 && (
                  <RegisterStep3 
                    formData={formData} 
                    handleChange={handleChange} 
                    prevStep={prevStep}
                    handleSubmit={handleSubmit}
                  />
                )}
              </div>
            </Slide>
          </Box>
        </Paper>
      </Grow>
    </Box>
  );
};

export default RegisterForm;