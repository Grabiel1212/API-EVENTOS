
import express from "express";
import {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuario.controller";

const router = express.Router();

// GET todos los usuarios
router.get("/", listarUsuarios);

// GET usuario por ID
router.get("/:id", obtenerUsuario);

// POST nuevo usuario
router.post("/", crearUsuario);

// PUT actualizar usuario
router.put("/:id", actualizarUsuario);

// DELETE eliminar usuario
router.delete("/:id", eliminarUsuario);

export default router;
