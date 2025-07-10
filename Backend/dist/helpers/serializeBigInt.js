"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeBigInts = serializeBigInts;
function serializeBigInts(obj) {
    if (Array.isArray(obj)) {
        return obj.map(serializeBigInts);
    }
    if (typeof obj === 'object' && obj !== null) {
        const result = {};
        for (const key in obj) {
            const value = obj[key];
            result[key] = typeof value === 'bigint' ? Number(value) : serializeBigInts(value);
        }
        return result;
    }
    return obj;
}
