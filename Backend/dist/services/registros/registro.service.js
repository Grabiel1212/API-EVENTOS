"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroService = void 0;
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
class RegistroService {
    obtenerReporteGeneral() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.$queryRaw `
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
        });
    }
    obtenerResumenUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.$queryRaw `
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
        });
    }
    obtenerReportePorUsuario(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.$queryRaw `
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
        });
    }
}
exports.RegistroService = RegistroService;
