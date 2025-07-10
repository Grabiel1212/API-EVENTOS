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
const createUser_1 = require("./createUser");
const deleteUser_1 = require("./deleteUser");
const findEmail_1 = require("./findEmail");
const findUser_1 = require("./findUser");
const listarUser_1 = require("./listarUser");
const updatePassword_1 = require("./updatePassword");
const updateStatus_1 = require("./updateStatus");
const updateUser_1 = require("./updateUser");
class UserService {
    create(user, buffer, isAdminRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, createUser_1.createUser)(user, buffer, isAdminRequest);
        });
    }
    update(id_1, data_1, buffer_1) {
        return __awaiter(this, arguments, void 0, function* (id, data, buffer, isAdminRequest = false) {
            if (isAdminRequest) {
                return (0, updateUser_1.updateUserAsAdmin)(id, data, buffer, isAdminRequest);
            }
            else {
                return (0, updateUser_1.updateRegularUser)(id, data, buffer);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, deleteUser_1.deleteUser)(id); // esta función debe retornar void
        });
    }
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, updateStatus_1.updateUserStatus)(id, status); // Activar o desactivar usuario
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, findUser_1.findUserById)(id); // Buscar usuario por ID
        });
    }
    listActive() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, listarUser_1.listActiveUsers)(); // Listar usuarios activos
        });
    }
    listInactive() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, listarUser_1.listInactiveUsers)(); // Listar usuarios inactivos
        });
    }
    listByRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, listarUser_1.listUsersByRole)(role); // Listar usuarios por rol
        });
    }
    updatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, updatePassword_1.updatePassword)(email, password);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, findEmail_1.verificarCuentaParaRecuperacion)(email); // Buscar usuario por correo electrónico
        });
    }
}
exports.default = new UserService();
