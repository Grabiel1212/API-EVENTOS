"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pagoController_1 = __importDefault(require("../controller/pagoController"));
const router = express_1.default.Router();
router.post('/registrar', pagoController_1.default.registrarPago);
exports.default = router;
