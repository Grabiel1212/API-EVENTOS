export interface Eventos {
  id: number;
  titulo: string;
  descripcion?: string | null;
  ubicacion?: string | null;
  fecha_inicio: Date;
  fecha_fin: Date;
  precio?: number | null;
  imagen?: string | null;
  creado_evento?: Date | null;
  actualizado_evento?: Date | null;
  id_categoria: number;
}
