// src/user/components/home/home.tsx
import { Box } from '@mui/material';
import React from 'react';
import Carousel from '../carusel-app/carousel-app';
import ContentApp from '../content/content-app';

const Home: React.FC = () => {
  return (
    <Box>
      <Carousel />
      <ContentApp />
    </Box>
  );
};

export default Home;
