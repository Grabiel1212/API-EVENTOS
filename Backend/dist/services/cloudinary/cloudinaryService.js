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
exports.deletePhotoFromCloudinary = exports.uploadToCloudinaryEventos = exports.uploadToCloudinary = exports.uploadToCloudinaryCategorias = void 0;
exports.extractPublicId = extractPublicId;
exports.extractPublicIdEventos = extractPublicIdEventos;
exports.extractPublicIdCategorias = extractPublicIdCategorias;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
/**
 * Extrae el public_id desde una URL de Cloudinary.
 */
function extractPublicId(url) {
    try {
        const parsedUrl = new URL(url);
        const path = parsedUrl.pathname;
        const parts = path.split('/');
        const filenameWithExt = parts.slice(-1)[0];
        const filename = filenameWithExt.split('.')[0];
        return `eventos/fotousuarios/${filename}`;
    }
    catch (_a) {
        return null;
    }
}
function extractPublicIdEventos(url) {
    try {
        const parsedUrl = new URL(url);
        const path = parsedUrl.pathname;
        const parts = path.split('/');
        const filenameWithExt = parts.slice(-1)[0];
        const filename = filenameWithExt.split('.')[0];
        return `eventos/fotoeventos/${filename}`;
    }
    catch (_a) {
        return null;
    }
}
//agregar extractPublicIdCategorias para imágenes de categorías
function extractPublicIdCategorias(url) {
    try {
        const parsedUrl = new URL(url);
        const path = parsedUrl.pathname;
        const parts = path.split('/');
        const filenameWithExt = parts.slice(-1)[0];
        const filename = filenameWithExt.split('.')[0];
        return `eventos/fotocategorias/${filename}`;
    }
    catch (_a) {
        return null;
    }
}
const uploadToCloudinaryCategorias = (buffer, filename) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.default.uploader.upload_stream({
            resource_type: 'image',
            folder: 'eventos/fotocategorias',
            public_id: filename,
            overwrite: true,
        }, (error, result) => {
            if (error || !result)
                return reject(error);
            resolve({ url: result.secure_url, public_id: result.public_id });
        }).end(buffer);
    });
});
exports.uploadToCloudinaryCategorias = uploadToCloudinaryCategorias;
const uploadToCloudinary = (buffer, filename) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.default.uploader.upload_stream({
            resource_type: 'image',
            folder: 'eventos/fotousuarios',
            public_id: filename,
            overwrite: true,
        }, (error, result) => {
            if (error || !result)
                return reject(error);
            resolve({ url: result.secure_url, public_id: result.public_id });
        }).end(buffer);
    });
});
exports.uploadToCloudinary = uploadToCloudinary;
const uploadToCloudinaryEventos = (buffer, filename) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.default.uploader.upload_stream({
            resource_type: 'image',
            folder: 'eventos/fotoeventos',
            public_id: filename,
            overwrite: true,
        }, (error, result) => {
            if (error || !result)
                return reject(error);
            resolve({ url: result.secure_url, public_id: result.public_id });
        }).end(buffer);
    });
});
exports.uploadToCloudinaryEventos = uploadToCloudinaryEventos;
const deletePhotoFromCloudinary = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    yield cloudinary_1.default.uploader.destroy(publicId, { resource_type: 'image' });
});
exports.deletePhotoFromCloudinary = deletePhotoFromCloudinary;
