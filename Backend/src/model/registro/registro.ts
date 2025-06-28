
export interface Registro {
    id_pago: BigInt;
    id_usuario: BigInt;
    id_registro: number;
    id_evento: number;
    cantidad: number;
    fecha_registro?: Date;

}