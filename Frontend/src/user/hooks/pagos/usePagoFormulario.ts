import { useState } from 'react';
import { type CardData, type FormData, type FormErrors } from './PagoTypes';

const usePagoFormulario = () => {
  // Estados para los datos de la tarjeta
  const [cardData, setCardData] = useState<CardData>({
    number: '9759 2484 5269 6576',
    name: 'BRUCE WAYNE',
    expiryMonth: '12',
    expiryYear: '24',
    cvv: '***'
  });
  
  // Estados para los campos del formulario
  const [formData, setFormData] = useState<FormData>({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  
  // Estado para errores de validación
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Estado para voltear la tarjeta al enfocar el CVV
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Función para manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validación para el número de tarjeta
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 16);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      
      const formattedCard = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
      setCardData(prev => ({
        ...prev,
        number: formattedCard || '9759 2484 5269 6576'
      }));
      return;
    }
    
    // Validación para CVV
    if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 3);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      
      setCardData(prev => ({
        ...prev,
        cvv: formattedValue ? '•'.repeat(formattedValue.length) : '***'
      }));
      return;
    }
    
    // Validación para nombre del titular
    if (name === 'cardHolder') {
      const formattedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      
      setCardData(prev => ({
        ...prev,
        name: formattedValue || 'BRUCE WAYNE'
      }));
      return;
    }
    
    // Validación para mes de expiración
    if (name === 'expiryMonth') {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue > '12') formattedValue = '12';
      if (formattedValue.length > 2) formattedValue = formattedValue.substring(0, 2);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      
      setCardData(prev => ({
        ...prev,
        expiryMonth: formattedValue || '12'
      }));
      return;
    }
    
    // Validación para año de expiración
    if (name === 'expiryYear') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 2);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      
      setCardData(prev => ({
        ...prev,
        expiryYear: formattedValue || '24'
      }));
      return;
    }
  };
  
  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de campos
    const newErrors: FormErrors = {};
    
    if (!formData.cardNumber || formData.cardNumber.length < 16) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }
    
    if (!formData.cardHolder || formData.cardHolder.length < 3) {
      newErrors.cardHolder = 'Nombre del titular requerido';
    }
    
    if (!formData.expiryMonth || formData.expiryMonth.length < 2) {
      newErrors.expiryMonth = 'Mes inválido';
    }
    
    if (!formData.expiryYear || formData.expiryYear.length < 2) {
      newErrors.expiryYear = 'Año inválido';
    }
    
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'CVV inválido';
    }
    
    setErrors(newErrors);
    
    // Si no hay errores, procesar el pago
    if (Object.keys(newErrors).length === 0) {
      alert('¡Pago procesado con éxito!');
      // Aquí iría la lógica para procesar el pago
    }
  };

  return {
    cardData,
    formData,
    errors,
    isFlipped,
    setIsFlipped,
    handleChange,
    handleSubmit
  };
};

export default usePagoFormulario;