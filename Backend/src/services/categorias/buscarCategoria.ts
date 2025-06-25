import Fuse from 'fuse.js';
import { PrismaClient } from '../../generated/prisma';
import { Categorias } from '../../model/categorias/categorias';

const prisma = new PrismaClient();

/**
 * Busca categorías por nombre con coincidencia parcial.
 * 
 * @param nombre - Parte del nombre de la categoría a buscar.
 * @returns Lista de categorías coincidentes.
 */
export async function buscarCategoriasPorNombre(nombre: string): Promise<Categorias[]> {
  const categorias = await prisma.categorias.findMany();

  const fuse = new Fuse(categorias, {
    keys: ['nombre'],
    threshold: 0.4,
  });

  const resultado = fuse.search(nombre);

  return resultado.map(({ item }) => ({
    id_categoria: Number(item.id_categoria),
    nombre: item.nombre,
    descripcion: item.descripcion ?? '',
    creado_categoria: item.creado_categoria ?? new Date()
  }));
}