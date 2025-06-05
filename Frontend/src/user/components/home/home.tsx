import { Box } from '@mui/material';
import Footer from '../../../layout/footer-app/footer-app';
import Carousel from '../carusel-app/carousel-app';
import ContentApp from '../content/content-app';
import MenuBar from '../menu-bar/menu-bar';

export const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <MenuBar />

     
    <Box component="main" sx={{ flex: 1, p: 0 }}>
  <Carousel />
  <ContentApp/>
</Box>


      <Footer />
    </Box>
  );
};

export default Home;
