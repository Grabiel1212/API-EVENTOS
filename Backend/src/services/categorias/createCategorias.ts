import Fuse from 'fuse.js';
import { PrismaClient } from '../../generated/prisma';
import { categorias } from '../../generated/prisma/client';
import { ApiError } from '../../helpers/ApiError';
import { STATUS_BAD_REQUEST, STATUS_FORBIDDEN, STATUS_INTERNAL_SERVER_ERROR } from "../../helpers/status";
import { uploadToCloudinaryCategorias } from "../cloudinary/cloudinaryService"; 
import { Categorias } from '../../model/categorias/categorias';


const prisma = new PrismaClient();

/**
 * Crea una nueva categoría en la base de datos.
 * 
 * @param categoriaData - Datos de la categoría a crear.
 * @param buffer - Imagen como buffer, si se subió una.
 * @returns La categoría creada.
 */


export async function createCategoria(
  categoriaData: Categorias,
  adminrequired: boolean = false,
): Promise <Categorias> {
  try {
    // 🔍 Verificar duplicidad por nombre

    if (!adminrequired) {
      // Aquí podrías agregar lógica para verificar si el usuario es admin
      // Por ejemplo, verificando un token o rol de usuario
       throw new ApiError(STATUS_FORBIDDEN, 'Acceso denegado', 'NO_AUTORIZADO');
    }
    const exists = await prisma.categorias.findFirst({
      where: { nombre: categoriaData.nombre }
    });

     if (exists) {
      throw new ApiError(
        STATUS_BAD_REQUEST,
        'La categoría ya existe',
        'CATEGORIA_DUPLICADA'
      );
    }

  

    const now = new Date();

    // 📦 Crear categoría
    const categoriaCreada = await prisma.categorias.create({
      data: {
        nombre: categoriaData.nombre,
        descripcion: categoriaData.descripcion,
        creado_categoria: now
      }
    });

    return mapPrismaCategoriaToModel(categoriaCreada);

  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new ApiError(
      STATUS_INTERNAL_SERVER_ERROR,
      'Error al crear la categoría: ' + (error as Error).message,
      'CATEGORIA_CREACION_FALLIDA'
    );
  }
}

 
function mapPrismaCategoriaToModel(prismaCategoria: any): Categorias {
  return {
    id_categoria: Number(prismaCategoria.id_categoria),
    nombre: prismaCategoria.nombre,
    descripcion: prismaCategoria.descripcion ?? '',
    creado_categoria: prismaCategoria.creado_categoria ?? new Date(),
  };
}

