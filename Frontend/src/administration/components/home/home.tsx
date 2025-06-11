import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme,
  Grid,
  type GridProps,
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);

const MotionGridItem = motion(
  React.forwardRef<HTMLDivElement, GridProps>((props, ref) => (
    <Grid ref={ref} {...props} />
  ))
) as React.ComponentType<GridProps & React.RefAttributes<HTMLDivElement>>;

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <MotionGridItem
    span={{ xs: 12, md: 4 }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -10 }}
  >
    <MotionPaper elevation={6} sx={{
      p: 3,
      height: '100%',
      borderRadius: 4,
      background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{icon}</Typography>
      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
    </MotionPaper>
  </MotionGridItem>
);

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const PremiumHome: React.FC = () => {
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const features = [
    {
      icon: "📅",
      title: "Gestión de Eventos",
      description: "Crea, programa y gestiona eventos con nuestra interfaz intuitiva."
    },
    {
      icon: "👥",
      title: "Control de Asistentes",
      description: "Registro avanzado de participantes con seguimiento en tiempo real."
    },
    {
      icon: "📊",
      title: "Analíticas Avanzadas",
      description: "Métricas detalladas para optimizar tus eventos."
    }
  ];

  return (
    <Box ref={ref} sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      color: '#fff',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <MotionBox 
        component="div"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0%, transparent 20%)',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 15, pb: 10 }}>
        <MotionBox
          component="div"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          sx={{ textAlign: 'center', mb: 10 }}
        >
          <MotionTypography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(90deg, #fff, #aaa)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
            variants={fadeInUp}
          >
            EventMaster Pro
          </MotionTypography>

          <MotionTypography
            variant="h5"
            component="h2"
            sx={{
              mb: 4,
              fontWeight: 400,
              color: theme.palette.grey[300],
              maxWidth: '700px',
              mx: 'auto'
            }}
            variants={fadeInUp}
          >
            La plataforma definitiva para la gestión de eventos de élite
          </MotionTypography>

          <MotionBox component="div" variants={fadeInUp}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  borderRadius: 2,
                  px: 6,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                Comenzar ahora
              </Button>
            </motion.div>
          </MotionBox>
        </MotionBox>

        <MotionBox
          component="div"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          sx={{ mb: 15 }}
        >
          <MotionTypography
            variant="h4"
            component="h2"
            sx={{ mb: 6, textAlign: 'center', fontWeight: 600 }}
            variants={fadeInUp}
          >
            Características Premium
          </MotionTypography>

          <Grid container columns={{ xs: 12, md: 12 }} spacing={4}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.2}
              />
            ))}
          </Grid>
        </MotionBox>

        <MotionBox
          component="div"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          sx={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            borderRadius: 4,
            p: 6,
            mb: 15,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Grid container columns={{ xs: 12, md: 12 }} spacing={6}>
            <Grid span={{ xs: 12, md: 6 }}>
              <MotionTypography
                variant="h4"
                component="h3"
                sx={{ mb: 3, fontWeight: 600 }}
              >
                Interfaz intuitiva y poderosa
              </MotionTypography>
              <Typography variant="body1" sx={{ mb: 3, color: theme.palette.grey[300] }}>
                Diseñada para profesionales que exigen lo mejor. Controla cada aspecto de tus eventos con nuestra interfaz premium.
              </Typography>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  color: '#fff',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': { borderColor: 'rgba(255, 255, 255, 0.7)' }
                }}
              >
                Ver demostración
              </Button>
            </Grid>
            <Grid span={{ xs: 12, md: 6 }}>
              <MotionBox
                component="div"
                sx={{
                  height: '300px',
                  background: 'linear-gradient(45deg, rgba(106,17,203,0.3) 0%, rgba(37,117,252,0.3) 100%)',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '1.5rem',
                  color: 'rgba(255,255,255,0.7)'
                }}>
                  Mockup de la interfaz
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default PremiumHome;
