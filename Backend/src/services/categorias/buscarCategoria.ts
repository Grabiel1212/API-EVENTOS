import { PrismaClient } from '../../generated/prisma';
import { Categorias } from '../../model/categorias/categorias';

const prisma = new PrismaClient();

/**
 * Busca una categoría por ID.
 * 
 * @param id - ID de la categoría.
 * @returns Categoría encontrada como un arreglo de un solo elemento.
 * @throws ApiError si no se encuentra la categoría.
 */
export async function buscarCategoriasPorId(id: number): Promise<Categorias | null> {
  const categoria = await prisma.categorias.findUnique({
    where: {
      id_categoria: id,
    },
  });

  if (!categoria) return null;

  return {
    id_categoria: Number(categoria.id_categoria),
    nombre: categoria.nombre,
    descripcion: categoria.descripcion ?? '',
    creado_categoria: categoria.creado_categoria ?? new Date(),
  };
}

