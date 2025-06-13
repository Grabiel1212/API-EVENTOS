import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const RegisterStep3 = ({ formData, handleChange, prevStep, handleSubmit }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const passwordsMatch = formData.password === formData.confirmPassword;
  const isPasswordValid = formData.password.length >= 6;
  const isFormValid = passwordsMatch && isPasswordValid;

  return (
    <Box sx={{ transition: 'all 0.5s ease' }}>
      <TextField
        fullWidth
        margin="normal"
        name="password"
        label="Contraseña"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
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
        fullWidth
        margin="normal"
        name="confirmPassword"
        label="Confirmar contraseña"
        type={showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange}
        size="medium"
        error={!passwordsMatch && formData.confirmPassword.length > 0}
        helperText={!passwordsMatch && formData.confirmPassword.length > 0 ? "Las contraseñas no coinciden" : ""}
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
          '& .MuiInputBase-input': {
            color: '#e0f7fa',
          },
          '& .MuiInputLabel-root': {
            color: '#b2ebf2',
          },
          '& .MuiFormHelperText-root': {
            color: '#f44336'
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: !passwordsMatch && formData.confirmPassword.length > 0 
                ? '#f44336' 
                : 'rgba(178, 235, 242, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: !passwordsMatch && formData.confirmPassword.length > 0 
                ? '#f44336' 
                : '#4dd0e1',
              boxShadow: !passwordsMatch && formData.confirmPassword.length > 0 
                ? '0 0 0 3px rgba(244, 67, 54, 0.1)' 
                : '0 0 0 3px rgba(77, 208, 225, 0.1)'
            },
            '&.Mui-focused fieldset': {
              borderColor: !passwordsMatch && formData.confirmPassword.length > 0 
                ? '#f44336' 
                : '#00bcd4',
              boxShadow: !passwordsMatch && formData.confirmPassword.length > 0 
                ? '0 0 0 3px rgba(244, 67, 54, 0.2)' 
                : '0 0 0 3px rgba(0, 188, 212, 0.2)'
            }
          },
        }}
      />

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
          onClick={handleSubmit}
          disabled={!isFormValid}
          sx={{
            py: 1.5,
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            background: 'linear-gradient(45deg, #4caf50, #2e7d32)',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
              background: 'linear-gradient(45deg, #4caf50, #1b5e20)'
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
          Registrarse
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
        Paso 3 de 3
      </Typography>
    </Box>
  );
};

export default RegisterStep3;