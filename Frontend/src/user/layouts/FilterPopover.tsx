import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCategorias } from '../../services/categorias/useCategorias';
import { useUbicacionesUnicas } from '../../services/eventos/useUbicacionesUnicas';

interface FilterPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  activeFilter: string | null;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({ anchorEl, open, onClose, activeFilter }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const navigate = useNavigate(); 

  const { categorias, loading, error } = useCategorias();
  const { ubicaciones, loading: loadingUbicaciones, error: errorUbicaciones } = useUbicacionesUnicas();

  const handleApplyDateFilter = () => {
    if (startDate && endDate) {
      // Formatear fechas para URL (YYYY-MM-DD)
      const desde = encodeURIComponent(startDate);
      const hasta = encodeURIComponent(endDate);
      navigate(`/user/fecha/${desde}/${hasta}`);
    }
    onClose();
  };

  const renderContent = () => {
    if (activeFilter === 'Ciudad') {
      if (loadingUbicaciones) {
        return <Typography variant="body2">Cargando ubicaciones...</Typography>;
      }

      if (errorUbicaciones) {
        return <Typography variant="body2" color="error">{errorUbicaciones}</Typography>;
      }

      return ubicaciones.map((ubicacion) => (
        <Chip 
          key={ubicacion} 
          label={ubicacion} 
          variant="outlined"
          onClick={() => {
            navigate(`/user/ubicacion/${encodeURIComponent(ubicacion)}`);
            onClose();
          }}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': { 
              backgroundColor: '#e3f2fd', 
              transform: 'scale(1.05)' 
            }
          }}
        />
      ));
    }

    if (activeFilter === 'Categorías') {
      if (loading) {
        return <Typography variant="body2">Cargando categorías...</Typography>;
      }

      if (error) {
        return <Typography variant="body2" color="error">{error}</Typography>;
      }

      return categorias.map((categoria) => (
        <Chip 
          key={categoria.id_categoria} 
          label={categoria.nombre} 
          variant="outlined" 
          component={Link}
          to={`/user/categoria/${categoria.id_categoria}`}
          onClick={onClose}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#e3f2fd',
              transform: 'scale(1.05)'
            }
          }}
        />
      ));
    }

    if (activeFilter === 'Fechas') {
      return (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <TextField
              label="Desde"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              inputProps={{ max: endDate || undefined }} // Limitar fecha máxima
            />
            <TextField
              label="Hasta"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              inputProps={{ min: startDate || undefined }} // Limitar fecha mínima
            />
          </Box>
          
          {/* Botones específicos para filtro de fechas */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button 
              color="error" 
              onClick={() => {
                setStartDate('');
                setEndDate('');
              }}
            >
              Limpiar
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={handleApplyDateFilter}
              disabled={!startDate || !endDate}
            >
              Aplicar
            </Button>
          </Box>
        </Box>
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

      {/* Mostrar botones solo si el filtro no es 'Categorías' ni 'Fechas' */}
      {activeFilter !== 'Categorías' && activeFilter !== 'Fechas' && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button color="error" onClick={onClose}>Eliminar filtro</Button>
          <Button variant="contained" color="success" onClick={onClose}>Aplicar</Button>
        </Box>
      )}
    </Popover>
  );
};

export default FilterPopover;