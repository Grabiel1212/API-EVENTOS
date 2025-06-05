import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';

const events = [
  {
    id: 1,
    title: "Concierto Dejavu",
    image: "https://via.placeholder.com/600x300", // reemplaza con tu URL real
    date: "10 Junio 2025",
    time: "20:00 hrs"
  },
  {
    id: 2,
    title: "Festival Noche Luminosa",
    image: "https://via.placeholder.com/600x300",
    date: "15 Junio 2025",
    time: "21:30 hrs"
  }
];

const ContentApp = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* Título con icono */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <StarIcon color="warning" sx={{ mr: 1 }} />
        <Typography variant="h5" fontWeight="bold">
          Eventos Destacados
        </Typography>
      </Box>

      {/* Cards con Box en lugar de Grid */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {events.map((event) => (
          <Box key={event.id} sx={{ width: '100%', maxWidth: 400 }}>
            <Card elevation={4}>
              <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={event.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {event.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {event.date} - {event.time}
                  </Typography>
                </Box>

                <Button variant="contained" color="primary" fullWidth>
                  Comprar
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContentApp;
