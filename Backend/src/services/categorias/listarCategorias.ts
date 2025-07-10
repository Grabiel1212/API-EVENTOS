import { categorias as CategoriaPrisma, PrismaClient } from '../../generated/prisma';
import { Categorias } from '../../model/categorias/categorias';

const prisma = new PrismaClient();

/**
 * Lista todas las categorías almacenadas en la base de datos.
 * 
 * @returns {Promise<Categorias[]>} Arreglo con todas las categorías encontradas.
 */
export async function listarCategorias(): Promise<Categorias[]> {
  const categorias = await prisma.categorias.findMany();

  return categorias.map((categoria: CategoriaPrisma) => ({
    id_categoria: Number(categoria.id_categoria),
    nombre: categoria.nombre,
    descripcion: categoria.descripcion ?? undefined,
    creado_categoria: categoria.creado_categoria ?? new Date()
  }));
}
