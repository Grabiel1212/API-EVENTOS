
import { Categorias } from "../../model/categorias/categorias";
import { createCategoria } from "./createCategorias";

import { CategoriaInterface } from "../../model/categorias/categoriasInterface";
import { buscarCategoriasPorId } from "./buscarCategoria";
import { listarCategorias } from "./listarCategorias";
import { updateCategorias } from "./updateCategorias";

class CategoriasService implements CategoriaInterface {
  getCategorias(): Promise<Categorias[]> {
    return listarCategorias();
  }
  getCategoriaById(id: number): Promise<Categorias | null> {
  return buscarCategoriasPorId(id);
}
  createCategoria(data: Categorias, adminrequired?: boolean): Promise<Categorias> {
      return createCategoria(data, adminrequired);
  }
  updateCategoria(id: string, data: Partial<Categorias>, adminrequired?: boolean): Promise<Categorias>  {
   return updateCategorias(Number(id), data, adminrequired);
  }
  
}

export default new CategoriasService();



