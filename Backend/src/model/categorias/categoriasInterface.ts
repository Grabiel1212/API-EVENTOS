
import { Categorias } from './categorias';


export interface CategoriaInterface {
  getCategorias(): Promise<Categorias[]>; // Obtiene todas las categorías
  getCategoriaById(id: string): Promise<Categorias | null>; // Obtiene una categoría por su ID
  createCategoria(categoria: Categorias): Promise<Categorias>; // Crea una nueva categoría
  updateCategoria(id: string, categoria: Categorias): Promise<Categorias | null>; // Actualiza una categoría existente
  deleteCategoria(id: string): Promise<boolean>; // Elimina una categoría por su ID
}