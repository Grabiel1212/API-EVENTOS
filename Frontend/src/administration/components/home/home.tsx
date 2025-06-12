import {
  MusicNote as ConcertIcon,
  Mic as ConferenceIcon,
  Event as EventIcon,
  Group as GroupIcon,
  Movie as MovieIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ConfirmationNumber as TicketIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import {
  Avatar, Badge,
  Box,
  Button, Chip,
  IconButton,
  Paper, Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion'; // Importación corregida
import React, { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from 'recharts';

// Tipos de datos para TypeScript
type MetricCardProps = {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
  description?: string;
};

type EventType = {
  id: number;
  title: string;
  date: string;
  venue: string;
  type: 'concert' | 'movie' | 'conference';
  ticketsSold: number;
  capacity: number;
  revenue: number;
};

type ActivityItem = {
  id: number;
  user: string;
  action: string;
  time: string;
  event?: string;
};

// Paleta de colores vibrante para eventos
const COLORS = {
  primary: '#6a11cb',
  secondary: '#2575fc',
  success: '#00c853',
  warning: '#ffab00',
  error: '#ff5252',
  info: '#00b8d4',
  concert: '#ff4081',
  movie: '#536dfe',
  conference: '#ff6d00'
};

// Datos de ejemplo para eventos
const eventsData: EventType[] = [
  { 
    id: 1, 
    title: 'Festival de Verano', 
    date: '15 Jul 2023', 
    venue: 'Estadio Nacional', 
    type: 'concert', 
    ticketsSold: 12500, 
    capacity: 20000, 
    revenue: 375000 
  },
  { 
    id: 2, 
    title: 'Estreno: Guardianes de la Galaxia', 
    date: '22 Jul 2023', 
    venue: 'Cinepolis Mega', 
    type: 'movie', 
    ticketsSold: 480, 
    capacity: 600, 
    revenue: 7200 
  },
  { 
    id: 3, 
    title: 'Conferencia Tech 2023', 
    date: '30 Jul 2023', 
    venue: 'Centro de Convenciones', 
    type: 'conference', 
    ticketsSold: 850, 
    capacity: 1000, 
    revenue: 42500 
  },
  { 
    id: 4, 
    title: 'Tour Internacional: Coldplay', 
    date: '5 Ago 2023', 
    venue: 'Estadio Monumental', 
    type: 'concert', 
    ticketsSold: 45000, 
    capacity: 50000, 
    revenue: 2250000 
  },
];

// Datos para gráficos
const revenueData = [
  { name: 'Ene', value: 1250000 },
  { name: 'Feb', value: 1890000 },
  { name: 'Mar', value: 1420000 },
  { name: 'Abr', value: 1780000 },
  { name: 'May', value: 2100000 },
  { name: 'Jun', value: 2430000 },
  { name: 'Jul', value: 2865000 },
];

const attendanceData = [
  { name: 'Lun', asistentes: 1240 },
  { name: 'Mar', asistentes: 1890 },
  { name: 'Mié', asistentes: 1420 },
  { name: 'Jue', asistentes: 2100 },
  { name: 'Vie', asistentes: 2560 },
  { name: 'Sáb', asistentes: 3200 },
  { name: 'Dom', asistentes: 2850 },
];

const eventTypeData = [
  { name: 'Conciertos', value: 65 },
  { name: 'Películas', value: 20 },
  { name: 'Conferencias', value: 15 },
];

const eventColors = [COLORS.concert, COLORS.movie, COLORS.conference];

// Componente de tarjeta métrica con animaciones mejoradas
const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, color, description }) => {
  const isPositive = change >= 0;
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        boxShadow: `0px 10px 30px ${color}40`,
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.5 }}
    >
      <Paper 
        sx={{ 
          p: 3, 
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.background.paper}, #ffffff)`,
          height: '100%',
          boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.08)',
          borderLeft: `4px solid ${color}`,
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${color}, ${COLORS.primary})`,
          }
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} mb={1} color="text.primary">
              {value}
            </Typography>
            {description && (
              <Typography variant="body2" color="textSecondary" mb={1}>
                {description}
              </Typography>
            )}
            <Box display="flex" alignItems="center">
              {isPositive ? 
                <TrendingUpIcon sx={{ color: COLORS.success, fontSize: 18 }} /> : 
                <TrendingUpIcon sx={{ color: COLORS.error, transform: 'rotate(45deg)', fontSize: 18 }} />
              }
              <Typography 
                variant="body2" 
                fontWeight={500}
                color={isPositive ? COLORS.success : COLORS.error}
                ml={0.5}
              >
                {isPositive ? '+' : ''}{change}%
              </Typography>
              <Typography variant="body2" color="textSecondary" ml={0.5}>
                vs mes anterior
              </Typography>
            </Box>
          </Box>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Box 
              sx={{ 
                bgcolor: `${color}15`, 
                color: color, 
                borderRadius: '16px', 
                width: 60, 
                height: 60, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: `0px 5px 15px ${color}30`
              }}
            >
              {icon}
            </Box>
          </motion.div>
        </Box>
      </Paper>
    </motion.div>
  );
};

// Componente de tarjeta de evento
const EventCard: React.FC<{ event: EventType }> = ({ event }) => {
  const getEventIcon = () => {
    switch (event.type) {
      case 'concert': return <ConcertIcon />;
      case 'movie': return <MovieIcon />;
      case 'conference': return <ConferenceIcon />;
      default: return <EventIcon />;
    }
  };
  
  const getEventColor = () => {
    switch (event.type) {
      case 'concert': return COLORS.concert;
      case 'movie': return COLORS.movie;
      case 'conference': return COLORS.conference;
      default: return COLORS.primary;
    }
  };
  
  const progress = (event.ticketsSold / event.capacity) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Paper sx={{ 
        p: 2.5, 
        borderRadius: 3, 
        mb: 2, 
        boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.05)',
        borderLeft: `3px solid ${getEventColor()}`,
        background: 'linear-gradient(to right, #ffffff, #f9f9ff)'
      }}>
        <Box display="flex" alignItems="center" mb={1.5}>
          <Avatar sx={{ bgcolor: `${getEventColor()}15`, color: getEventColor(), mr: 2 }}>
            {getEventIcon()}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>{event.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {event.date} • {event.venue}
            </Typography>
          </Box>
        </Box>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2">
            <Box component="span" fontWeight={500} color={getEventColor()}>
              {event.ticketsSold.toLocaleString()}
            </Box> / {event.capacity.toLocaleString()} entradas
          </Typography>
          <Chip 
            label={`${Math.round(progress)}%`} 
            size="small" 
            sx={{ 
              bgcolor: `${getEventColor()}15`, 
              color: getEventColor(),
              fontWeight: 600 
            }} 
          />
        </Box>
        
        <Box sx={{ 
          height: 8, 
          bgcolor: 'divider', 
          borderRadius: 4, 
          overflow: 'hidden',
          mb: 2
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ 
              height: '100%', 
              background: `linear-gradient(90deg, ${getEventColor()}, ${COLORS.secondary})`,
              borderRadius: 4
            }}
          />
        </Box>
        
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            Recaudación:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            ${event.revenue.toLocaleString()}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

// Componente de actividad reciente
const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    { id: 1, user: 'Ana Pérez', action: 'vendió 5 entradas para', event: 'Coldplay', time: 'Hace 5 min' },
    { id: 2, user: 'Carlos Ruiz', action: 'agregó nuevo evento:', event: 'Tech Conference', time: 'Hace 15 min' },
    { id: 3, user: 'María López', action: 'actualizó información de', event: 'Festival de Verano', time: 'Hace 30 min' },
    { id: 4, user: 'Juan García', action: 'completó informe de ventas de', event: 'Estreno Guardianes', time: 'Hace 1 hora' },
  ];

  return (
    <Paper sx={{ 
      p: 3, 
      borderRadius: 4, 
      height: '100%', 
      background: 'linear-gradient(to bottom, #ffffff, #fafbff)',
      boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)'
    }}>
      <Typography variant="h6" fontWeight={700} mb={2} color="primary">
        Actividad Reciente
      </Typography>
      <Box>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ x: 5 }}
          >
            <Box 
              display="flex" 
              alignItems="flex-start" 
              py={2} 
              sx={{ 
                borderBottom: index < activities.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(106, 17, 203, 0.03)',
                  borderRadius: 2,
                  transform: 'translateX(5px)'
                }
              }}
            >
              <Box 
                sx={{ 
                  bgcolor: 'primary.light', 
                  color: COLORS.primary, 
                  borderRadius: '50%', 
                  minWidth: 40, 
                  height: 40, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mr: 2,
                  mt: 0.5
                }}
              >
                <PersonIcon fontSize="small" />
              </Box>
              <Box flex={1}>
                <Typography variant="body1" mb={0.5}>
                  <Box component="span" fontWeight={600}>{activity.user}</Box> {activity.action}{' '}
                  {activity.event && (
                    <Box component="span" fontWeight={600} color={COLORS.primary}>
                      {activity.event}
                    </Box>
                  )}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Box 
                    sx={{ 
                      width: 6, 
                      height: 6, 
                      bgcolor: COLORS.primary, 
                      borderRadius: '50%', 
                      mr: 1 
                    }} 
                  />
                  <Typography variant="body2" color="textSecondary">
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Paper>
  );
};

// Componente principal del Dashboard
const DashboardHome: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeEvents, setActiveEvents] = useState(eventsData);
  const [totalRevenue, setTotalRevenue] = useState(0);
  
  useEffect(() => {
    // Calcular ingresos totales
    const revenue = eventsData.reduce((sum, event) => sum + event.revenue, 0);
    setTotalRevenue(revenue);
    
    // Animación para simular ventas en tiempo real
    const interval = setInterval(() => {
      setActiveEvents(prev => 
        prev.map(event => {
          if (event.ticketsSold < event.capacity && Math.random() > 0.7) {
            const newTickets = Math.floor(Math.random() * 5) + 1;
            const updatedTickets = Math.min(event.ticketsSold + newTickets, event.capacity);
            return {
              ...event,
              ticketsSold: updatedTickets,
              revenue: Math.round(updatedTickets * (event.revenue / event.ticketsSold))
            };
          }
          return event;
        })
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calcular asistentes totales
  const totalAttendees = activeEvents.reduce((sum, event) => sum + event.ticketsSold, 0);
  
  return (
   // En DashboardHome
<Box sx={{ 
  backgroundColor: theme.palette.background.default, // Usar color del tema
  minHeight: '100vh',
  p: isMobile ? 1.5 : 3,
  pt: 7
}}>
      {/* Barra superior */}
      <Paper sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2,
        borderRadius: 0,
        background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
        boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.2)',
        color: 'white'
      }}>
        <Box display="flex" alignItems="center">
          <EventIcon sx={{ mr: 1.5, color: 'white' }} />
          <Typography variant="h6" fontWeight={700}>
            EventMaster Dashboard
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton sx={{ color: 'white' }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: 'white', mr: 1 }}>
            <SettingsIcon />
          </IconButton>
          <Avatar 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              color: 'white',
              width: 36, 
              height: 36 
            }}
          >
            <PersonIcon fontSize="small" />
          </Avatar>
        </Box>
      </Paper>
      
      {/* Contenedor principal flexbox */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        '& > *': {
          flexBasis: isMobile ? '100%' : 'calc(50% - 12px)',
          minWidth: 0,
        },
        '@media (min-width:900px)': {
          '& > *': {
            flexBasis: 'calc(25% - 18px)',
          },
          '& > *:nth-child(-n+4)': {
            flexBasis: 'calc(25% - 18px)',
          },
          '& > *:nth-child(5)': {
            flexBasis: 'calc(66.666% - 18px)',
          },
          '& > *:nth-child(6)': {
            flexBasis: 'calc(33.333% - 18px)',
          },
          '& > *:nth-child(7)': {
            flexBasis: 'calc(41.666% - 18px)',
          },
          '& > *:nth-child(8)': {
            flexBasis: 'calc(58.333% - 18px)',
          },
        }
      }}>
        {/* Tarjetas de métricas */}
        <Box>
          <MetricCard 
            title="Ingresos Totales" 
            value={`$${totalRevenue.toLocaleString()}`} 
            change={18.7} 
            icon={<TrendingUpIcon />}
            color={COLORS.success}
            description="Últimos 30 días"
          />
        </Box>
        <Box>
          <MetricCard 
            title="Asistentes" 
            value={totalAttendees.toLocaleString()} 
            change={12.3} 
            icon={<GroupIcon />}
            color={COLORS.info}
            description="Eventos activos"
          />
        </Box>
        <Box>
          <MetricCard 
            title="Eventos Activos" 
            value={activeEvents.length} 
            change={5.2} 
            icon={<EventIcon />}
            color={COLORS.warning}
            description="En curso y próximos"
          />
        </Box>
        <Box>
          <MetricCard 
            title="Ocupación" 
            value={`${Math.round((totalAttendees / activeEvents.reduce((sum, e) => sum + e.capacity, 0)) * 100)}%`} 
            change={3.8} 
            icon={<TicketIcon />}
            color={COLORS.primary}
            description="Promedio de eventos"
          />
        </Box>
        
        {/* Gráfico de ingresos */}
        <Box>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ 
              p: 3, 
              borderRadius: 4, 
              height: '100%', 
              background: 'linear-gradient(to bottom, #ffffff, #fafbff)',
              boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)'
            }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={700}>
                  Ingresos Mensuales
                </Typography>
                <Button variant="outlined" size="small" color="primary">
                  Ver Reporte
                </Button>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Ingresos']}
                    contentStyle={{ 
                      borderRadius: 12, 
                      border: 'none',
                      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
                      fontWeight: 500
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={COLORS.primary} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    animationDuration={2000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={COLORS.secondary} 
                    strokeWidth={2} 
                    dot={{ stroke: COLORS.primary, strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, stroke: COLORS.primary }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Box>
        
        {/* Gráfico circular de tipos de eventos */}
        <Box>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper sx={{ 
              p: 3, 
              borderRadius: 4, 
              height: '100%', 
              background: 'linear-gradient(to bottom, #ffffff, #fafbff)',
              boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)'
            }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Distribución por Tipo de Evento
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={eventTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={500}
                    animationDuration={1500}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {eventTypeData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={eventColors[index % eventColors.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: 12, 
                      border: 'none',
                      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
                      fontWeight: 500
                    }}
                  />
                  <Legend 
                    formatter={(value, entry, index) => (
                      <span style={{ color: eventColors[index], fontWeight: 500 }}>
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Box>
        
        {/* Lista de eventos */}
        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Paper sx={{ 
              p: 3, 
              borderRadius: 4, 
              height: '100%', 
              background: 'linear-gradient(to bottom, #ffffff, #fafbff)',
              boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)'
            }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={700}>
                  Eventos Activos
                </Typography>
                <Chip label={`${activeEvents.length} eventos`} color="primary" size="small" />
              </Box>
              <Box>
                {activeEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </Box>
            </Paper>
          </motion.div>
        </Box>
        
        {/* Contenedor para actividad reciente y gráfico de asistentes */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          height: '100%'
        }}>
          {/* Actividad reciente */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <RecentActivity />
            </motion.div>
          </Box>
          
          {/* Gráfico de asistentes */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Paper sx={{ 
                p: 3, 
                borderRadius: 4, 
                height: '100%', 
                background: 'linear-gradient(to bottom, #ffffff, #fafbff)',
                boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)'
              }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Asistencia Diaria
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: 12, 
                        border: 'none',
                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
                        fontWeight: 500
                      }}
                    />
                    <Bar 
                      dataKey="asistentes" 
                      fill={COLORS.secondary} 
                      animationBegin={800}
                      animationDuration={1500}
                      radius={[4, 4, 0, 0]}
                    >
                      {attendanceData.map((entry, index) => (
                        <motion.rect
                          key={`bar-${index}`}
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          </Box>
        </Box>
      </Box>
      
      {/* Footer */}
      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          © 2023 EventMaster Dashboard - Gestión profesional de eventos
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardHome;