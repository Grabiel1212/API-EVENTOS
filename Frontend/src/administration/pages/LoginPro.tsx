import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';

import logo from '../../administration/assets/logo.jpeg'; // Asegúrate de que la ruta es correcta
import backgroundMusic from "../assets/RadioHead_Nude.mp3";

const LoginPro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.play().catch(() => {
        console.warn('Autoplay bloqueado por el navegador.');
      });
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'julio' && password === '123') {
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: 'Administrador',
          lastName: 'Eventos',
          email,
          photo: 'https://i.pravatar.cc/150?img=32',
        })
      );
      window.location.href = '/admin/home';
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage:
          'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      {/* Música de fondo */}
      <audio ref={audioRef} loop>
        <source src={backgroundMusic} type="audio/mpeg" />
        Tu navegador no soporta audio HTML5.
      </audio>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 5,
            width: 400,
            borderRadius: 5,
            textAlign: 'center',
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            color: '#fff',
          }}
        >
          {/* Logo */}
          <Box sx={{ mb: 2 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: 70, objectFit: 'contain' }}
            />
          </Box>

          <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            LOGIN ADMINISTRATIVO
          </Typography>

          <Typography variant="body2" color="gray" gutterBottom>
            Plataforma de gestión profesional de conciertos y eventos
          </Typography>

          <form onSubmit={handleLogin} noValidate>
            <TextField
              label="Correo electrónico"
              type="email"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
            <TextField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{
                style: { color: '#fff' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#fff' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
            >
              Ingresar
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default LoginPro;
