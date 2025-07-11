import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RegistroService {
  async obtenerReporteGeneral() {
    return await prisma.$queryRaw`
      SELECT 
        u.id_usuario AS id_usuario,
        u.nombre AS nombre,
        u.apellidos AS apellidos,
        u.correo AS correo,
        e.id_evento AS id_evento,
        e.titulo AS nombre_evento,
        c.nombre AS categoria,
        r.cantidad,
        p.monto,
        p.metodo_pago,
        p.estado_pago,
        TO_CHAR(r.fecha_registro, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS fecha_registro
      FROM registros r
      INNER JOIN usuarios u ON r.id_usuario = u.id_usuario
      INNER JOIN eventos e ON r.id_evento = e.id_evento
      INNER JOIN categorias c ON e.id_categoria = c.id_categoria
      INNER JOIN pagos p ON r.id_pago = p.id_pago
      ORDER BY r.fecha_registro DESC;
    `;
  }

  async obtenerResumenUsuarios() {
    return await prisma.$queryRaw`
      SELECT 
        u.id_usuario AS id_usuario,
        u.nombre || ' ' || u.apellidos AS nombre_completo,
        COUNT(r.id_registro) AS total_compras,
        SUM(p.monto) AS total_pagado
      FROM registros r
      INNER JOIN usuarios u ON r.id_usuario = u.id_usuario
      INNER JOIN pagos p ON r.id_pago = p.id_pago
      GROUP BY u.id_usuario, u.nombre, u.apellidos
      ORDER BY total_pagado DESC;
    `;
  }

  async obtenerReportePorUsuario(id_usuario: number) {
    return await prisma.$queryRaw`
      SELECT 
        u.id_usuario AS id_usuario,
        u.nombre || ' ' || u.apellidos AS nombre_completo,
        u.correo AS correo,
        e.titulo AS evento,
        c.nombre AS categoria,
        r.cantidad,
        p.monto,
        p.metodo_pago,
        p.estado_pago,
          TO_CHAR(r.fecha_registro, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS fecha_registro
      FROM registros r
      INNER JOIN usuarios u ON r.id_usuario = u.id_usuario
      INNER JOIN eventos e ON r.id_evento = e.id_evento
      INNER JOIN categorias c ON e.id_categoria = c.id_categoria
      INNER JOIN pagos p ON r.id_pago = p.id_pago
      WHERE u.id_usuario = ${id_usuario}
      ORDER BY r.fecha_registro DESC;
    `;
  }
}
