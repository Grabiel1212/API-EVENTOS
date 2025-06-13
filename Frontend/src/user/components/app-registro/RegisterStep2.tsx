import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';

const RegisterStep2 = ({ formData, handleChange, nextStep, prevStep }: any) => {
  const isFormValid = formData.firstName.trim() && formData.lastName.trim();

  return (
    <Box sx={{ transition: 'all 0.5s ease' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          margin="normal"
          id="firstName"
          label="Nombre"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          variant="outlined"
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: '#80deea' }} />
              </InputAdornment>
            ),
          }}
          sx={{ 
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
          fullWidth
          margin="normal"
          id="lastName"
          label="Apellido"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          variant="outlined"
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: '#80deea' }} />
              </InputAdornment>
            ),
          }}
          sx={{ 
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
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={prevStep}
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
            }
          }}
        >
          Volver
        </Button>
        
        <Button
          fullWidth
          variant="contained"
          onClick={nextStep}
          disabled={!isFormValid}
          sx={{
            py: 1.5,
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
            '&:disabled': {
              background: 'rgba(178, 235, 242, 0.2)',
              color: 'rgba(224, 247, 250, 0.5)'
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
          Continuar
        </Button>
      </Box>

      <Typography 
        variant="body2" 
        align="center" 
        sx={{ 
          mt: 3, 
          color: '#b2ebf2',
        }}
      >
        Paso 2 de 3
      </Typography>
    </Box>
  );
};

export default RegisterStep2;