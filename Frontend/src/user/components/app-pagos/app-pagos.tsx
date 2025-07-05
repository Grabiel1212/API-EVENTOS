import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRegistrarPago } from '../../../services/pagos/useRegistrarPago'; // Importamos el hook
import usePagoFormulario from '../../hooks/pagos/usePagoFormulario';
import './app-pagos.css';

const PagoFormulario = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [compraData, setCompraData] = useState<any>(null);
  const [userId, setUserId] = useState<number | null>(null);
  
  // Obtener datos de localStorage al montar el componente
  useEffect(() => {
    const savedCompraData = localStorage.getItem('compraData');
    const savedUserData = localStorage.getItem('userData');
    
    if (savedCompraData) {
      setCompraData(JSON.parse(savedCompraData));
    }
    
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      setUserId(userData.id);
    }
  }, []);

  const {
    cardData,
    formData,
    errors,
    isFlipped,
    setIsFlipped,
    handleChange,
    handleSubmit: handleFormSubmit
  } = usePagoFormulario();

  // Hook para registrar el pago
  const { registrarPago, loading: pagoLoading, error: pagoError } = useRegistrarPago();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario
    handleFormSubmit(e);
    
    if (Object.keys(errors).length === 0 && compraData && userId && eventId) {
      // Preparar datos para el pago
      const pagoRequest = {
        pago: {
          id_usuario: userId
        },
        registro: {
          id_evento: compraData.eventoId,
          cantidad: compraData.cantidad
        }
      };
      
      // Registrar el pago
      const resultado = await registrarPago(pagoRequest);
      
      if (resultado && resultado.success) {
        // Redirigir a página de éxito
        navigate(`/user/compra/${eventId}/exito`, {
          state: {
            evento: compraData.evento,
            cantidad: compraData.cantidad,
            precioTotal: compraData.precioTotal,
            pagoId: resultado.data.id // Asumiendo que la API devuelve un ID de pago
          }
        });
        
        // Limpiar localStorage
        localStorage.removeItem('compraData');
      }
    }
  };

  // Si estamos cargando los datos
  if (!compraData || !userId) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <div className="app-pagos">
      <div className="container">
        <div className="resumen-compra">
          <h2>Resumen de Compra</h2>
          <div className="evento-info">
            <h3>{compraData.evento.titulo}</h3>
            <p>Cantidad: {compraData.cantidad} entradas</p>
            <p>Precio unitario: S/ {compraData.evento.precio.toFixed(2)}</p>
            <p className="total">Total: S/ {compraData.precioTotal.toFixed(2)}</p>
          </div>
        </div>
        
        <h1 className="title">Formulario de Pago</h1>
        
        <div className="card-container">
          {/* Tarjeta animada */}
          <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="heading_8264">MASTERCARD</p>
                <svg className="logo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48">
                  <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                  <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                  <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path>
                </svg>
                <svg className="chip" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 50 50">
                  <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAACNcTiVeUKVeUOYfEaafEeUeUSYfEWZfEaykleyklaXe0SWekSZZjOYfEWYe0WXfUWXe0WcgEicfkiXe0SVekSXekSWekKYe0a9nF67m12ZfUWUeEaXfESVekOdgEmVeUKVeUOrjFKYfEWliE6WeESZe0GSe0WYfES7ml2Xe0WXeESUeEOWfEWcf0eWfESXe0SXfEWYekSVeUKXfEWxklawkVaZfEWWekOUekOWekSYfESZe0eXekWYfEWZe0WZe0eVeUSWeETAnmDCoWLJpmbxy4P1zoXwyoLIpWbjvXjivnjgu3bfu3beunWvkFWxkle/nmDivXiWekTnwXvkwHrCoWOuj1SXe0TEo2TDo2PlwHratnKZfEbQrWvPrWugfUfbt3PJp2agg0v0zYX0zYSfgkvKp2frxX7mwHrlv3rsxn/yzIPgvHfduXWXe0XuyIDzzISsjVO1lVm0lFitjVPzzIPqxX7duna0lVncuHTLqGjvyIHeuXXxyYGZfUayk1iyk1e2lln1zYTEomO2llrbtnOafkjFpGSbfkfZtXLhvHfkv3nqxH3mwXujhU3KqWizlFilh06khk2fgkqsjlPHpWXJp2erjVOhg0yWe0SliE+XekShhEvAn2D///+gx8TWAAAARnRSTlMACVCTtsRl7Pv7+vxkBab7pZv5+ZlL/UnU/f3SJCVe+Fx39naA9/75XSMh0/3SSkia+pil/KRj7Pr662JPkrbP7OLQ0JFOijI1MwAAAAFiS0dEorDd34wAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IDx2lsiuJAAACLElEQVRIx2NgGAXkAUYmZhZWPICFmYkRVQcbOwenmzse4MbFzc6DpIGXj8PD04sA8PbhF+CFaxEU8iWkAQT8hEVgOkTF/InR4eUVICYO1SIhCRMLDAoKDvFDVhUaEhwUFAjjSUlDdMiEhcOEItzdI6OiYxA6YqODIt3dI2DcuDBZsBY5eVTr4xMSYdyk5BRUOXkFsBZFJTQnp6alQxgZmVloUkrKYC0qqmji2WE5EEZuWB6alKoKdi35YQUQRkFYPpFaCouKIYzi6EDitJSUlsGY5RWVRGjJLyxNy4ZxqtIqqvOxaVELQwZFZdkIJdU1RSiSalAt6rUwUBdWG1CP6pT6gNqwOrgCdQyHNYR5YQFhDXj8MiK1IAeyN6aORiyBjByVTc0FqBoKWpqwRCVSgilOaY2OaUPw29qjMzqLvTAchpos47u6EZyYnngUSRwpuTe6D+6qaFQdOPNLRzOM1dzhRZyW+CZouHk3dWLXglFcFIflQhj9YWjJGlZcaKAVSvjyPrRQ0oQVKDAQHlYFYUwIm4gqExGmBSkutaVQJeomwViTJqPK6OhCy2Q9sQBk8cY0DxjTJw0lAQWK6cOKfgNhpKK7ZMpUeF3jPa28BCETamiEqJKM+X1gxvWXpoUjVIVPnwErw71nmpgiqiQGBjNzbgs3j1nus+fMndc+Cwm0T52/oNR9lsdCS24ra7Tq1cbWjpXV3sHRCb1idXZ0sGdltXNxRateRwHRAACYHutzk/2I5QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xM1QwODoxNToyOSswMDowMEUnN7UAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDItMTNUMDg6MTU6MjkrMDA6MDA0eo8JAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAyLTEzVDA4OjE1OjI5KzAwOjAwY2+u1gAAAABJRU5ErkJggg==" />
                </svg>
                <svg className="contactless" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 50 50">
                  <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IEzgIwaKTAAADDklEQVRYw+1XS0iUURQ+f5qPyjQflGRFEEFK76koKGxRbWyVVLSOgsCgwjZBJJYuKogSIoOonUK4q3U0WVBWFPZYiIE6kuArG3VGzK/FfPeMM/MLt99/NuHdfPd889/57jn3nvsQWWj/VcMlvMMd5KRTogqx9iCdIjUUmcGR9ImUYowyP3xNGQJoRLVaZ2DaZf8kyjEJALhI28ELioyiwC/Rc3QZwRYyO/DH51hQgWm6DMIh10KmD4u9O16K49itVoPOAmcGAWWOepXIRScAoJZ2Frro8oN+EyTT6lWkkg6msZfMSR35QTJmjU0g15tIGSJ08ZZMJkJkHpNZgikyXosS13TkJpZ62mPIJvOSzC1bp8vRhhCakEk7G9/o4gmZdbpsTcKu0m63FbnBP9Qrc15zbkbemfgNDtEOI8NO5L5O9VYyRYgmJayZ9nPaxZrSjW4+F6Uw9yQqIiIZwhp2huQTf6OIvCZyGM6gDJBZbyXifJXr7FZjGXsdxADxI7HUJFB6iWvsIhFpkoiIiGTJfjJfiCuJg2ZEspq9EHGVpYgzKqwJqSAOEwuJQ/pxPvE3cYltJCLdxBLiSKKIE5HxJKcTRNeadxfhDiuYw44zVs1dxKwRk/uCxIiQkxKBsSctRVAge9g1E15EHE6yRUaJecRxcWlukdRIbGFOSZCMWQA/iWauIP3slREHXPyliqBcrrD71AmzZ+rD1Mt2Yr8TZc/UR4/YtFnbijnHi3UrN9vKQ9rPaJf867ZiaqDB+czeKYmd3pNa6fuI75MiC0uXXSR5aEMf7s7a6r/PudVXkjFb/SsrCRfROk0Fx6+H1i9kkTGn/E1vEmt1m089fh+RKdQ5O+xNJPUiCUIjO0Dm7HwvErEr0YxeibL1StSh37STafE4I7zcBdRq1DiOkdmlTJVnkQTBTS7X1FYyvfO4piaInKbDCDaT2anLudYXCRFsQBgAcIF2/Okwgvz5+Z4tsw118dzruvIvjhTB+HOuWy8UvovEH6beitBKxDyxi9MmISKCWrzB7bSlaqGlsf0FC0gMjzTg6GgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDItMTNUMDg6MTk6NTYrMDA6MDCjlq7LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTEzVDA4OjE5OjU2KzAwOjAw0ssWdwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAy3LTAyLTEzVDA4OjE5OjU2KzAwOjAwIXeN6gAAAAASUVORK5CYII=" />
                </svg>
                <p className="number">{cardData.number}</p>
                <p className="valid_thru">VALID THRU</p>
                <p className="date_8264">{cardData.expiryMonth}/{cardData.expiryYear}</p>
                <p className="name">{cardData.name}</p>
              </div>
              <div className="flip-card-back">
                <div className="strip"></div>
                <div className="mstrip"></div>
                <div className="sstrip">
                  <p className="code">{cardData.cvv}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Formulario de pago */}
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Número de Tarjeta</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
            />
            {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="cardHolder">Nombre del Titular</label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              value={formData.cardHolder}
              onChange={handleChange}
              placeholder="Como aparece en la tarjeta"
            />
            {errors.cardHolder && <span className="error">{errors.cardHolder}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Fecha de Expiración</label>
              <div className="expiry-row">
                <input
                  type="text"
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  placeholder="MM"
                  maxLength={2}
                />
                <span>/</span>
                <input
                  type="text"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleChange}
                  placeholder="AA"
                  maxLength={2}
                />
              </div>
              {(errors.expiryMonth || errors.expiryYear) && (
                <span className="error">{errors.expiryMonth || errors.expiryYear}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="***"
                maxLength={3}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
              />
              {errors.cvv && <span className="error">{errors.cvv}</span>}
            </div>
          </div>
          
          <button 
            type="submit" 
            className="pay-button"
            disabled={pagoLoading}
          >
            {pagoLoading ? 'Procesando pago...' : 'Pagar Ahora'}
          </button>
          
          {pagoError && (
            <div className="error-message">
              <Typography color="error">{pagoError}</Typography>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PagoFormulario;