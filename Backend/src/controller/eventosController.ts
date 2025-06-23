import { Request, Response } from 'express';
import { ApiResponse } from '../helpers/ApiRespose';
import { logger } from '../helpers/logger';
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR } from '../helpers/status';
import { eventoSchema } from '../schemas/eventos/eventos.validation';
import EventosService from '../services/eventos';

class EventosController {
  private Servicio = EventosService;

  constructor() {
    this.listAllEventos = this.listAllEventos.bind(this);
    this.getEventoById = this.getEventoById.bind(this);
    this.createEvento = this.createEvento.bind(this);
    this.updateEvento = this.updateEvento.bind(this);
    this.deleteEvento = this.deleteEvento.bind(this);
    this.listByCategory = this.listByCategory.bind(this);
    this.listByUbicacion = this.listByUbicacion.bind(this);
    this.listByDateRange = this.listByDateRange.bind(this);
    this.buscarPorNombre = this.buscarPorNombre.bind(this);
    this.listAleatorios = this.listAleatorios.bind(this);
    this.listOrdenados = this.listOrdenados.bind(this);
  }

  async listAllEventos(req: Request, res: Response): Promise<void> {
    try {
      const eventos = await this.Servicio.getEventos();
      res.json(ApiResponse.ok('Eventos listados correctamente', eventos));
    } catch (error) {
      logger.error('Error al listar eventos:', error);
      res.status(500).json(ApiResponse.fail('Error al listar eventos'));
    }
  }

  async getEventoById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const evento = await this.Servicio.getEventoById(id);
      if (!evento) {
        res.status(404).json(ApiResponse.fail('Evento no encontrado'));
        return;
      }
      res.json(ApiResponse.ok('Evento encontrado', evento));
    } catch (error) {
      logger.error('Error al obtener evento:', error);
      res.status(500).json(ApiResponse.fail('Error al obtener evento'));
    }
  }

  async createEvento(req: Request, res: Response): Promise<void> {
    try {
      const buffer = req.file?.buffer;
      const { error, value } = eventoSchema.validate(req.body);
      if (error) {
        res.status(STATUS_BAD_REQUEST).json(ApiResponse.fail('Error de validación', error.details[0].message));
        return;
      }
      const evento = await this.Servicio.createEvento(value, buffer);
      res.status(201).json(ApiResponse.ok('Evento creado correctamente', evento));
    } catch (err: unknown) {
      logger.error('Error al crear evento:', err);
      res.status(STATUS_INTERNAL_SERVER_ERROR).json(ApiResponse.fail('Error al crear evento'));
    }
  }

  async updateEvento(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const buffer = req.file?.buffer;
      const evento = await this.Servicio.updateEvento(id, req.body, buffer);
      res.json(ApiResponse.ok('Evento actualizado correctamente', evento));
    } catch (error) {
      logger.error('Error al actualizar evento:', error);
      res.status(500).json(ApiResponse.fail('Error al actualizar evento'));
    }
  }

  async deleteEvento(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await this.Servicio.deleteEvento(id);
      res.json(ApiResponse.ok('Evento eliminado correctamente'));
    } catch (error) {
      logger.error('Error al eliminar evento:', error);
      res.status(500).json(ApiResponse.fail('Error al eliminar evento'));
    }
  }

  async listByCategory(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const eventos = await this.Servicio.listByCategory(id);
      res.json(ApiResponse.ok('Eventos por categoría', eventos));
    } catch (error) {
      logger.error('Error al listar eventos por categoría:', error);
      res.status(500).json(ApiResponse.fail('Error al listar eventos por categoría'));
    }
  }

  async listByUbicacion(req: Request, res: Response): Promise<void> {
    try {
      const distrito = req.params.distrito;
      const eventos = await this.Servicio.listByLocation(distrito);
      res.json(ApiResponse.ok('Eventos por ubicación', eventos));
    } catch (error) {
      logger.error('Error al listar eventos por ubicación:', error);
      res.status(500).json(ApiResponse.fail('Error al listar eventos por ubicación'));
    }
  }

  async listByDateRange(req: Request, res: Response): Promise<void> {
    try {
      const { desde, hasta } = req.query;
      
      if (!desde || !hasta) {
        res.status(400).json(ApiResponse.fail('Parámetros de fecha requeridos'));
        return;
      }
      const eventos = await this.Servicio.listByDateRange(new Date(desde as string), new Date(hasta as string));
      res.json(ApiResponse.ok('Eventos por rango de fechas', eventos));
    } catch (error) {
      logger.error('Error al listar eventos por rango de fechas:', error);
      res.status(500).json(ApiResponse.fail('Error al listar eventos por rango de fechas'));
    }
  }

  async buscarPorNombre(req: Request, res: Response): Promise<void> {
    try {
      const nombre = req.query.nombre as string;
      if (!nombre) {
        res.status(400).json(ApiResponse.fail('El parámetro nombre es obligatorio'));
        return;
      }
      const eventos = await this.Servicio.searchByName(nombre);
      res.json(ApiResponse.ok('Eventos encontrados', eventos));
    } catch (error) {
      logger.error('Error al buscar eventos por nombre:', error);
      res.status(500).json(ApiResponse.fail('Error al buscar eventos por nombre'));
    }
  }

  async listAleatorios(req: Request, res: Response): Promise<void> {
    try {
      const eventos = await this.Servicio.listRandom;
      res.json(ApiResponse.ok('Eventos aleatorios', eventos));
    } catch (error) {
      logger.error('Error al listar eventos aleatorios:', error);
      res.status(500).json(ApiResponse.fail('Error al listar eventos aleatorios'));
    }
  }

  async listOrdenados(req: Request, res: Response): Promise<void> {
    try {
      const order = (req.query.order as 'asc' | 'desc') || 'asc';
      const eventos = await this.Servicio.listOrdered(order);
      res.json(ApiResponse.ok('Eventos ordenados', eventos));
    } catch (error) {
      logger.error('Error al listar eventos ordenados:', error);
      res.status(500).json(ApiResponse.fail('Error al listar eventos ordenados'));
    }
  }
}

export default new EventosController();
