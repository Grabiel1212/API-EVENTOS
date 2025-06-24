import cloudinary from '../../config/cloudinary';

/**
 * Extrae el public_id desde una URL de Cloudinary.
 */
export function extractPublicId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname;
    const parts = path.split('/');
    const filenameWithExt = parts.slice(-1)[0];
    const filename = filenameWithExt.split('.')[0];
    return `eventos/fotousuarios/${filename}`;
  } catch {
    return null;
  }
}

export function extractPublicIdEventos(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname;
    const parts = path.split('/');
    const filenameWithExt = parts.slice(-1)[0];
    const filename = filenameWithExt.split('.')[0];
    return `eventos/fotoeventos/${filename}`;
  } catch {
    return null;
  }
}

export const uploadToCloudinary = async (
  buffer: Buffer,
  filename: string
): Promise<{ url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'eventos/fotousuarios',
        public_id: filename,
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    ).end(buffer);
  });
};
export const uploadToCloudinaryEventos = async (
  buffer: Buffer,
  filename: string
): Promise<{ url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'eventos/fotoeventos',
        public_id: filename,
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    ).end(buffer);
  });
};


export const deletePhotoFromCloudinary = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
};
