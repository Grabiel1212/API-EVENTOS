// src/components/AppEntradas/types.ts
export interface Evento {
  titulo: string;
  fecha: string;
  hora: string;
  lugar: string;
  imagen: string;
  categoria: string;
}

export interface Compra {
  fecha: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
  metodo: string;
  numeroOrden: string;
}

export interface Usuario {
  nombre: string;
  email: string;
}

export interface Entrada {
  id: number;
  evento: Evento;
  compra: Compra;
  usuario: Usuario;
  codigoQr?: string;
}