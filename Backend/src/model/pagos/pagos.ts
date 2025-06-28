

export interface Pagos {
  id_pago       : number;
  id_usuario  : number  ;
  monto         : number;
  metodo_pago ?   : string ;
  estado_pago ?  : string ;
  fecha_pago ?   : Date;
 
}