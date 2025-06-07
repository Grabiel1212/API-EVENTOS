import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Container, IconButton, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#111827', color: '#fff', py: 4, mt: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Savage Events. Todos los derechos reservados.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" underline="none" color="inherit">Términos</Link>
            <Link href="#" underline="none" color="inherit">Privacidad</Link>
            <Link href="#" underline="none" color="inherit">Contacto</Link>
          </Box>

          <Box>
            <IconButton color="inherit" href="#" aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" href="#" aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" href="#" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
