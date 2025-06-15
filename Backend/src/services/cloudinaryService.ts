// src/services/cloudinary.service.ts
import cloudinary from '../utils/cloudinary';

export const uploadToCloudinary = async (
  buffer: Buffer,
  filename: string
): Promise<string> => {
  const result = await new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'image', public_id: `users/${filename}` },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    ).end(buffer);
  });

  return result;
};
