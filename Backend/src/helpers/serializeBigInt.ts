export function serializeBigInts(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInts);
  }

  if (typeof obj === 'object' && obj !== null) {
    const result: any = {};
    for (const key in obj) {
      const value = obj[key];
      result[key] = typeof value === 'bigint' ? Number(value) : serializeBigInts(value);
    }
    return result;
  }

  return obj;
}
