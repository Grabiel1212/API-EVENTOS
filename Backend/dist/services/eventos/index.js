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
const createEventos_1 = require("./createEventos");
const deleteEventos_1 = require("./deleteEventos");
const ListarEventos_1 = require("./ListarEventos");
const ListarEventosID_1 = require("./ListarEventosID");
const updateEventos_1 = require("./updateEventos");
const BuscarEvento_1 = require("./BuscarEvento");
const ListarEventosAva_1 = require("./ListarEventosAva"); // Ajusta el nombre si lo tienes diferente
class EventosService {
    // 1. Obtener todos los eventos
    getEventos() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, ListarEventos_1.listarEventos)();
        });
    }
    // 2. Obtener evento por ID
    getEventoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, ListarEventosID_1.ListarEventosID)(Number(id));
        });
    }
    // 3. Crear evento
    createEvento(evento, buffer, isAdminRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, createEventos_1.createEventos)(evento, buffer, isAdminRequest);
        });
    }
    // 4. Actualizar evento
    // 4. Actualizar evento
    updateEvento(id_1, data_1, buffer_1) {
        return __awaiter(this, arguments, void 0, function* (id, data, buffer, isAdminRequest = false) {
            return (0, updateEventos_1.updateEvento)(Number(id), data, buffer, isAdminRequest);
        });
    }
    // 5. Eliminar evento (lógico)
    deleteEvento(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, deleteEventos_1.deleteEventos)(Number(id));
            return true;
        });
    }
    // 6. Listar eventos ordenados por fecha de creación (asc o desc)
    listOrdered() {
        return __awaiter(this, arguments, void 0, function* (order = 'asc') {
            return (0, ListarEventosAva_1.listarEventosOrdenados)(order);
        });
    }
    // 7. Listar eventos aleatorios
    listRandom() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, ListarEventosAva_1.listarEventosAleatorios)();
        });
    }
    // 8. Listar por categoría
    listByCategory(id_categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, ListarEventosAva_1.listarEventosPorCategoria)(id_categoria);
        });
    }
    // 9. Listar por ubicación (distrito)
    listByLocation(distrito) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, ListarEventosAva_1.listarEventosPorUbicacion)(distrito);
        });
    }
    // 10. Listar por rango de fechas (ya usando Date)
    listByDateRange(desde, hasta) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, ListarEventosAva_1.listarEventosPorRangoFechas)(desde, hasta);
        });
    }
    // 11. Buscar eventos por nombre
    searchByName(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, BuscarEvento_1.buscarEventosPorNombre)(nombre);
        });
    }
}
exports.default = new EventosService();
