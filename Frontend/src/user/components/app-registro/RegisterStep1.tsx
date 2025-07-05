import EmailIcon from '@mui/icons-material/Email';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';

const RegisterStep1 = ({ formData, handleChange, nextStep, emailError }: any) => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  return (
    <Box sx={{ transition: 'all 0.5s ease' }}>
      <TextField
        fullWidth
        margin="normal"
        id="email"
        label="Correo electrónico"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon sx={{ color: '#80deea' }} />
            </InputAdornment>
          ),
          
        }}
         error={!!emailError}
        helperText={emailError}
        sx={{ 
          mb: 3,
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
            },
             '& .MuiFormHelperText-root': {
            color: emailError ? '#f44336' : '#b2ebf2'
          },
          },
        }}
      />

     <Button
        fullWidth
        variant="contained"
        onClick={nextStep}
        disabled={!isValidEmail || !!emailError}
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

      <Typography 
        variant="body2" 
        align="center" 
        sx={{ 
          mt: 3, 
          color: '#b2ebf2',
        }}
      >
        Paso 1 de 3
      </Typography>
    </Box>
  );
};

export default RegisterStep1;