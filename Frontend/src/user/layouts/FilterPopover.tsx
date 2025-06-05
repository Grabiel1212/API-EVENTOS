import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

interface FilterPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  activeFilter: string | null;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({ anchorEl, open, onClose, activeFilter }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const cities = [
    "Lima", "Arequipa", "Cusco", "Tarapoto", "Ica", "Puno", "Trujillo",
    "Piura", "Chiclayo", "Tacna", "Huancayo", "Iquitos", "Callao"
  ];

  const categories = [
    "Conciertos", "Teatro", "Talleres", "Ferias", "Deportes", "Tecnología"
  ];

  const dateOptions = [
    "Hoy", "Este fin de semana", "Esta semana", "Este mes", "Este año"
  ];

  const renderContent = () => {
    if (activeFilter === 'Ciudad') {
      return cities.map((item) => <Chip key={item} label={item} variant="outlined" />);
    }
    if (activeFilter === 'Categorías') {
      return categories.map((item) => <Chip key={item} label={item} variant="outlined" />);
    }
    if (activeFilter === 'Fechas') {
      return (
        <>
          {dateOptions.map(option => (
            <Chip key={option} label={option} variant="outlined" />
          ))}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, width: '100%' }}>
            <TextField
              label="Desde"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
            />
            <TextField
              label="Hasta"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
            />
          </Box>
        </>
      );
    }
    return null;
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      PaperProps={{
        sx: {
          p: 2,
          maxWidth: 400,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          bgcolor: '#f4fafa',
        },
      }}
    >
      {renderContent()}

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button color="error" onClick={onClose}>Eliminar filtro</Button>
        <Button variant="contained" color="success" onClick={onClose}>Aplicar</Button>
      </Box>
    </Popover>
  );
};

export default FilterPopover;
