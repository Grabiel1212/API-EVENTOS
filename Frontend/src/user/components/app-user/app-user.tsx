// src/user/components/app-user/app-user.tsx
import { CameraAlt, Check, Close, Edit } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Fade,
  Grow,
  Slide,
  Snackbar,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useActualizarUsuario } from '../../../services/usuarios/useActualizarUsuarioNormal'; // Importa el hook

interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  active: boolean;
  dateCreate: string;
  lastname: string; // Asegurar que tenemos este campo
}

const AppUser: React.FC = () => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estado para los datos del usuario
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    email: '',
    photo: ''
  });
  
  // Estado para el usuario actual y archivo seleccionado
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Usamos el hook de actualización
  const { actualizarUsuario } = useActualizarUsuario();

  // Obtener usuario del localStorage al cargar
  useEffect(() => {
    const getUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedUserData = localStorage.getItem('userData');
        
        const userInfo = storedUserData 
          ? JSON.parse(storedUserData) 
          : storedUser 
            ? JSON.parse(storedUser) 
            : null;
        
        if (userInfo) {
          setCurrentUser(userInfo);
          setUserData({
            name: userInfo.name || '',
            lastname: userInfo.lastname || '',
            email: userInfo.email || '',
            photo: userInfo.photo || ''
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)';
    getUserFromStorage();
    
    // Escuchar eventos de cambio
    const handleStorageChange = () => {
      getUserFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChanged', handleStorageChange);

    return () => {
      document.body.style.background = '';
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleStorageChange);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setUserData(prev => ({ ...prev, photo: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!currentUser) return;
    
    setSaving(true);
    try {
      // Obtener token del localStorage
      const token = localStorage.getItem('token') || '';
      
      // Llamar a la API de actualización
      const response = await actualizarUsuario(
        parseInt(currentUser.id),
        userData.name,
        userData.lastname,
        selectedFile,
        token
      );
      
      // Actualizar datos del usuario con la respuesta
      const updatedUser = {
        ...currentUser,
        name: response.data.name,
        lastname: response.data.lastname,
        photo: response.data.photo || currentUser.photo
      };
      
      // Actualizar localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      
      // Actualizar estados
      setCurrentUser(updatedUser);
      setSelectedFile(null);
      
      // Notificar a otros componentes
      window.dispatchEvent(new Event('authStateChanged'));
      window.dispatchEvent(new Event('storage'));
      
      setSaving(false);
      setEditMode(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error updating user:', error);
      setSaving(false);
      setShowError(true);
    }
  };

  const handleCancel = () => {
    // Restaurar datos originales
    if (currentUser) {
      setUserData({
        name: currentUser.name,
        lastname: currentUser.lastname || '',
        email: currentUser.email,
        photo: currentUser.photo
      });
    }
    setSelectedFile(null);
    setEditMode(false);
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!currentUser) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)',
      py: 4,
      px: 2
    }}>
      <Slide in timeout={500} direction="up">
        <Card
          sx={{
            width: '100%',
            maxWidth: 500,
            p: 4,
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.08)',
            background: 'linear-gradient(to bottom right, #ffffff, #f8fbff)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            overflow: 'visible',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 12px 30px rgba(0,0,0,0.12)'
            }
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box 
              sx={{ 
                position: 'relative',
                mb: 3,
                cursor: editMode ? 'pointer' : 'default'
              }}
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
              onClick={editMode ? handleTriggerFileInput : undefined}
            >
              <Avatar
                src={userData.photo}
                alt={`${userData.name} ${userData.lastname}`}
                sx={{
                  width: 140,
                  height: 140,
                  border: `4px solid ${theme.palette.primary.main}`,
                  boxShadow: 3,
                  transition: 'transform 0.3s, filter 0.3s',
                  transform: avatarHover && editMode ? 'scale(1.05)' : 'none',
                  filter: avatarHover && editMode ? 'brightness(0.7)' : 'none',
                }}
              />
              
              {editMode && (
                <Fade in={avatarHover}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'white',
                      textAlign: 'center',
                      pointerEvents: 'none'
                    }}
                  >
                    <CameraAlt sx={{ fontSize: 40 }} />
                    <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold' }}>
                      Cambiar foto
                    </Typography>
                  </Box>
                </Fade>
              )}
              
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Box>

            {editMode ? (
              <Fade in={editMode} timeout={500}>
                <Box sx={{ width: '100%' }}>
                  <TextField
                    label="Nombre"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Edit sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                  <TextField
                    label="Apellido"
                    name="lastname"
                    value={userData.lastname}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Edit sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Box>
              </Fade>
            ) : (
              <Grow in={!editMode} timeout={500}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    fontWeight="bold" 
                    sx={{ 
                      color: 'primary.main',
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                      letterSpacing: '-0.5px'
                    }}
                  >
                    {userData.name} {userData.lastname}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: 'text.secondary',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    {userData.email}
                  </Typography>
                </Box>
              </Grow>
            )}
          </Box>

          <Divider sx={{ 
            my: 4, 
            borderColor: 'divider',
            borderBottomWidth: 1,
            background: 'linear-gradient(to right, transparent, #e0e0e0, transparent)'
          }} />

          <CardContent>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center"
              sx={{ 
                fontStyle: 'italic', 
                opacity: 0.8,
                background: 'rgba(33, 150, 243, 0.05)',
                p: 1.5,
                borderRadius: 2
              }}
            >
              Este perfil refleja tu información personal. 
            </Typography>
          </CardContent>

          <CardActions sx={{ justifyContent: 'center', mt: 3, gap: 2 }}>
            {editMode ? (
              <>
                <Button 
                  variant="contained" 
                  color="success" 
                  onClick={handleSave}
                  disabled={saving}
                  startIcon={saving ? <CircularProgress size={20} /> : <Check />}
                  sx={{
                    minWidth: 120,
                    borderRadius: 50,
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 14px rgba(76, 175, 80, 0.4)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </Button>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={handleCancel}
                  startIcon={<Close />}
                  sx={{
                    minWidth: 120,
                    borderRadius: 50,
                    fontWeight: 'bold',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <Button 
                variant="contained" 
                onClick={() => setEditMode(true)}
                startIcon={<Edit />}
                sx={{
                  minWidth: 180,
                  borderRadius: 50,
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 14px rgba(33, 150, 243, 0.4)',
                    background: 'linear-gradient(45deg, #1e88e5 30%, #1bb6e8 90%)',
                  }
                }}
              >
                Editar perfil
              </Button>
            )}
          </CardActions>
        </Card>
      </Slide>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', boxShadow: 3 }}>
          ¡Perfil actualizado correctamente!
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%', boxShadow: 3 }}>
          Error al actualizar el perfil
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AppUser;