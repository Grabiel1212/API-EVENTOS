
import { Categorias } from "../../model/categorias/categorias";
import { createCategoria } from "./createCategorias";
import { deleteCategorias} from "./deleteCategorias";
import { listarCategorias } from "./listarCategorias";
import { updateCategorias } from "./updateCategorias";
import { buscarCategoriasPorNombre } from "./buscarCategoria";

class CategoriasService {
  // Listar todas las categorías
  async getCategorias(): Promise<Categorias[]> {
    return listarCategorias();
  }

  // Crear una nueva categoría
  async createCategoria(data: Categorias, adminrequired?: boolean): Promise<Categorias> {
    return createCategoria(data, adminrequired);
  }

  // Actualizar una categoría
  async updateCategorias(id: string, data: Partial<Categorias>, adminrequired?: boolean): Promise<Categorias> {
    return updateCategorias(Number(id), data, adminrequired);
  }

  // Eliminar una categoría
  async deleteCategorias(id: string): Promise<boolean> {
    await deleteCategorias(Number(id));
    return true;
  }

  // Buscar categoría por nombre
  async searchByName(nombre: string): Promise<Categorias[]> {
    return buscarCategoriasPorNombre(nombre);
  }
}

export default new CategoriasService();