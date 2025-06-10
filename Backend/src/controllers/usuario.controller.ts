import { Request, Response } from 'express';
import * as usuarioService from '../services/usuario.service';

export const listarUsuarios = async (req: Request, res: Response) => {
  console.log("usuario.controller.ts: listarUsuarios");
  try {
    const response = await usuarioService.listarUsuarios();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ message: "Error al listar usuarios" });
  }
};

export const obtenerUsuario = async (req: Request, res: Response) => {
  console.log("usuario.controller.ts: obtenerUsuario");
  try {
    const id = parseInt(req.params.id);
    const usuario = await usuarioService.obtenerUsuario(id);

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export const crearUsuario = async (req: Request, res: Response) => {
  console.log("usuario.controller.ts: crearUsuario");
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  console.log("usuario.controller.ts: actualizarUsuario");
  try {
    const id = parseInt(req.params.id);
    const actualizado = await usuarioService.actualizarUsuario(id, req.body);

    if (actualizado) {
      res.status(200).json(actualizado);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  console.log("usuario.controller.ts: eliminarUsuario");
  try {
    const id = parseInt(req.params.id);
    const eliminado = await usuarioService.eliminarUsuario(id);

    if (eliminado) {
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
