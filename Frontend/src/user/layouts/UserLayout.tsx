// src/user/layouts/UserLayout.tsx ✅
import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../../layout/footer-app/footer-app';
import MenuBar from '../components/menu-bar/menu-bar';

const UserLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <MenuBar />
      <Box component="main" sx={{ flex: 1, mt: { xs: 8, sm: 10 }, px: 2 }}>
        <Outlet /> {/* Aquí se cargará Home, AppUser, etc */}
      </Box>
      <Footer />
    </Box>
  );
};

export default UserLayout;
