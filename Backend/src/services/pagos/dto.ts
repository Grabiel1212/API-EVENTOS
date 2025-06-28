import { Pagos } from "../../model/pagos/pagos";
import { Registro } from "../../model/registro/registro";

export interface PagoConRegistroInput {
  pago: Omit<Pagos, 'id_pago' | 'fecha_pago'>;
  registro: Pick<Registro, 'id_evento' | 'cantidad'>;
}
