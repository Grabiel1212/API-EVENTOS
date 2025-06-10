"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUsuario = exports.listarUsuarios = void 0;
let usuarios = [
    {
        id: 1,
        nombre: "Juan",
        apellidos: "Pérez",
        foto_perfil: "",
        correo: "juan@example.com",
        contrasena: "123456",
        rol: "user"
    },
    {
        id: 2,
        nombre: "Ana",
        apellidos: "Gómez",
        foto_perfil: "",
        correo: "ana@example.com",
        contrasena: "abcdef",
        rol: "admin"
    },
    {
        id: 3,
        nombre: "Gabriela",
        apellidos: "Martínez",
        foto_perfil: "",
        correo: "gaby_12@example.com",
        contrasena: "abcdef",
        rol: "admin"
    },
    {
        id: 4,
        nombre: "David",
        apellidos: "Lopez",
        foto_perfil: "",
        correo: "david_12@example.com",
        contrasena: "abcdef",
        rol: "user"
    }
];
// Siempre arranca con el ID mayor actual + 1
let nextId = usuarios.reduce((max, u) => (u.id > max ? u.id : max), 0) + 1;
const listarUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return usuarios;
    }
    catch (error) {
        console.error("Error al listar usuarios:", error);
        throw new Error("Error al listar usuarios");
    }
});
exports.listarUsuarios = listarUsuarios;
const obtenerUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return usuarios.find(u => u.id === id);
    }
    catch (error) {
        console.error("Error al obtener usuario:", error);
        throw new Error("Error al obtener usuario");
    }
});
exports.obtenerUsuario = obtenerUsuario;
const crearUsuario = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoUsuario = Object.assign({ id: nextId++ }, usuario);
        usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }
    catch (error) {
        console.error("Error al crear usuario:", error);
        throw new Error("Error al crear usuario");
    }
});
exports.crearUsuario = crearUsuario;
const actualizarUsuario = (id, datos) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = usuarios.findIndex(u => u.id === id);
        if (index !== -1) {
            usuarios[index] = Object.assign(Object.assign({}, usuarios[index]), datos);
            return usuarios[index];
        }
        return undefined;
    }
    catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw new Error("Error al actualizar usuario");
    }
});
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = usuarios.findIndex(u => u.id === id);
        if (index !== -1) {
            usuarios.splice(index, 1);
            return true;
        }
        return false;
    }
    catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw new Error("Error al eliminar usuario");
    }
});
exports.eliminarUsuario = eliminarUsuario;
