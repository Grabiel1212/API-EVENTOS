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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
function copiarArchivos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield (0, glob_1.glob)('src/generated/client/**/*');
            files.forEach(file => {
                const dest = path_1.default.join('dist', path_1.default.relative('src/generated/client', file));
                fs_extra_1.default.copySync(file, dest);
                console.log(`✅ Copiado: ${file} → ${dest}`);
            });
        }
        catch (err) {
            console.error('❌ Error al copiar archivos:', err);
        }
    });
}
copiarArchivos();
