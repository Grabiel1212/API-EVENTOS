"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = express_1.default.Router();
// GET todos los usuarios
router.get("/", usuario_controller_1.listarUsuarios);
// GET usuario por ID
router.get("/:id", usuario_controller_1.obtenerUsuario);
// POST nuevo usuario
router.post("/", usuario_controller_1.crearUsuario);
// PUT actualizar usuario
router.put("/:id", usuario_controller_1.actualizarUsuario);
// DELETE eliminar usuario
router.delete("/:id", usuario_controller_1.eliminarUsuario);
exports.default = router;
