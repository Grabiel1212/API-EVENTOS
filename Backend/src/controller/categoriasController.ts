

import { Request, Response } from 'express';
import { ApiResponse } from '../helpers/ApiRespose';
import { logger } from '../helpers/logger';
import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR
} from '../helpers/status';
import { categoriaSchema } from '../schemas/categorias/categorias.validation';
import CategoriasService from '../services/categorias'; 

class CategoriasController {
  private Servicio = CategoriasService;

  constructor() {
    this.listarCategorias = this.listarCategorias.bind(this);
    this.buscarCategoria = this.buscarCategoria.bind(this);
    this.createCategoria = this.createCategoria.bind(this);
    this.updateCategoria = this.updateCategoria.bind(this);
    this.deleteCategoria = this.deleteCategoria.bind(this);
  }

  /** GET /categorias */
  async listarCategorias(req: Request, res: Response): Promise<void> {
    try {
      const categorias = await this.Servicio.getCategorias();
      res.json(ApiResponse.ok('Categorías listadas correctamente', categorias));
    } catch (error) {
      logger.error('Error al listar categorías:', error);
      res.status(STATUS_INTERNAL_SERVER_ERROR).json(ApiResponse.fail('Error al listar categorías'));
    }
  }

  /** POST /categorias/buscar */
  async buscarCategoria(req: Request, res: Response): Promise<void> {
    try {
      const { nombre } = req.body;
      if (!nombre) {
        res.status(STATUS_BAD_REQUEST).json(ApiResponse.fail('El parámetro nombre es obligatorio'));
        return;
      }
      const categorias = await this.Servicio.searchByName(nombre);
      res.json(ApiResponse.ok('Categorías encontradas', categorias));
    } catch (error) {
      logger.error('Error al buscar categorías:', error);
      res.status(STATUS_INTERNAL_SERVER_ERROR).json(ApiResponse.fail('Error al buscar categorías'));
    }
  }

  /** POST /categorias */
  async createCategoria(req: Request, res: Response): Promise<void> {
    try {
      
      const adminRequired=req.user?.rol === 'ADMIN';
      if (!adminRequired) {
        res.status(STATUS_BAD_REQUEST).json(ApiResponse.fail('Acceso denegado: se requiere rol de administrador'));
        return;
      }
      const { error, value } = categoriaSchema.validate(req.body);
      if (error) {
        res.status(STATUS_BAD_REQUEST).json(ApiResponse.fail('Error de validación', error.details[0].message));
        return;
      }

      const categoria = await this.Servicio.createCategoria(value, adminRequired);
      res.status(201).json(ApiResponse.ok('Categoría creada correctamente', categoria));
    } catch (error) {
      logger.error('Error al crear categoría:', error);
      res.status(STATUS_INTERNAL_SERVER_ERROR).json(ApiResponse.fail('Error al crear categoría'));
    }
  }

  /** PUT /categorias/:id */
  async updateCategoria(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const adminRequired = req.user?.rol === 'ADMIN';
      if (!adminRequired) {
        res.status(STATUS_BAD_REQUEST).json(ApiResponse.fail('Acceso denegado: se requiere rol de administrador'));
        return;
      }

      if (isNaN(id)) {
        res.status(STATUS_BAD_REQUEST).json(ApiResponse.fail('ID inválido'));
        return;
      }

      const categoria = await this.Servicio.updateCategorias(id.toString(), req.body, adminRequired);
      res.json(ApiResponse.ok('Categoría actualizada correctamente', categoria));
    } catch (error) {
      logger.error('Error al actualizar categoría:', error);
      res.status(STATUS_INTERNAL_SERVER_ERROR).json(ApiResponse.fail('Error al actualizar categoría'));
    }
  }

  /** DELETE /categorias/:id */
  async deleteCategoria(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(STATUS_BAD_REQUEST).json(ApiResponse.fail('ID inválido'));
        return;
      }

      await this.Servicio.deleteCategorias(id.toString());
      res.json(ApiResponse.ok('Categoría eliminada correctamente'));
    } catch (error) {
      logger.error('Error al eliminar categoría:', error);
      res.status(STATUS_INTERNAL_SERVER_ERROR).json(ApiResponse.fail('Error al eliminar categoría'));
    }
  }
}

export default new CategoriasController();
