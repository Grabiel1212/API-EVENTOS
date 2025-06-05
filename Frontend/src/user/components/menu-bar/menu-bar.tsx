import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import React, { useState } from 'react';

import { keyframes } from '@emotion/react'; // ✅ Para animaciones personalizadas
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import Grow from '@mui/material/Grow'; // ✅ Para animación de aparición
import Logo from '../../../assets/logo.svg';
import FilterPopover from '../../layouts/FilterPopover';
import UserPanel from '../../layouts/UserPanel';

// Animación de pulso sutil para elementos activos
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    transform: 'scale(1.02)',
  },
  width: '550px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create(['width', 'box-shadow'], {
      duration: 300,
      easing: 'ease-in-out',
    }),
    '&:focus': {
      boxShadow: `0 0 0 2px ${alpha(theme.palette.success.main, 0.5)}`,
    },
  },
}));

export default function MenuBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>, type: string) => {
    setAnchorEl(event.currentTarget);
    setActiveFilter(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveFilter(null);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ 
      backgroundColor: '#111827', 
      boxShadow: 'none',
      backgroundImage: 'linear-gradient(to bottom, #1a202c, #111827)' // ✅ Degradado sutil
    }}>
      <Toolbar sx={{ 
        justifyContent: 'space-between', 
        px: 2,
        transition: 'padding 0.3s ease'
      }}>

        {/* Logo y Buscador */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 15,
          transition: 'gap 0.3s ease' 
        }}>
          <Box sx={{
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.05) rotate(-2deg)' }
          }}>
            <img 
              src={Logo} 
              alt="Logo" 
              style={{ 
                height: 92,
                filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))' // ✅ Sombra verde sutil
              }} 
            />
          </Box>

          <Search>
            <SearchIconWrapper sx={{
              transform: activeFilter ? 'scale(1.1)' : 'scale(1)'
            }}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Encuentra eventos, lugares, organizadores, etc..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>

        {/* Filtros con animación */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 4,
          transition: 'gap 0.3s ease'
        }}>
          {[
            { icon: <LocalOfferIcon />, label: 'Categorías' },
            { icon: <LocationOnIcon />, label: 'Ciudad' },
            { icon: <CalendarTodayIcon />, label: 'Fechas' },
          ].map(({ icon, label }) => (
            <Box
              key={label}
              onClick={(e) => handleOpen(e, label)}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5, 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: activeFilter === label ? '#10b981' : 'inherit',
                transform: activeFilter === label ? 'translateY(-2px)' : 'none',
                animation: activeFilter === label ? `${pulseAnimation} 1.5s infinite` : 'none',
                '&:hover': {
                  color: '#10b981',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {React.cloneElement(icon, {
                sx: { 
                  transition: 'transform 0.3s ease',
                  transform: activeFilter === label ? 'scale(1.2)' : 'scale(1)'
                }
              })}
              <Typography variant="subtitle1" fontWeight="500">
                {label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Usuario / Sesión con animaciones */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mr: 6,
          transition: 'margin 0.3s ease'
        }}>
          {!isLoggedIn ? (
            <>
              <Button 
                variant="contained" 
                color="success" 
                onClick={handleLogin}
                sx={{
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 8px rgba(16, 185, 129, 0.4)'
                  }
                }}
              >
                Iniciar sesión
              </Button>
              <Button 
                variant="outlined" 
                color="success"
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)'
                  }
                }}
              >
                Registrarse
              </Button>
            </>
          ) : (
            <Avatar
              onClick={(e) => setProfileAnchorEl(e.currentTarget)}
              sx={{
                bgcolor: '#10b981',
                width: 48,
                height: 48,
                cursor: 'pointer',
                transition: 'all 0.3s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)',
                '&:hover': {
                  transform: 'scale(1.1) rotate(8deg)',
                  boxShadow: '0 6px 10px rgba(16, 185, 129, 0.5)'
                }
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 30 }} />
            </Avatar>
          )}
        </Box>

      </Toolbar>

      {/* Componentes con animación de aparición */}
      <Grow in={Boolean(anchorEl)} timeout={300}>
        <div>
          <FilterPopover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            activeFilter={activeFilter}
          />
        </div>
      </Grow>

      <Grow in={Boolean(profileAnchorEl)} timeout={300}>
        <div>
          <UserPanel
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={() => setProfileAnchorEl(null)}
            onLogout={handleLogout}
          />
        </div>
      </Grow>
    </AppBar>
  );
}