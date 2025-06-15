// src/services/cloudinary.service.ts
import cloudinary from '../../config/cloudinary';


export const uploadToCloudinary = async (
  buffer: Buffer,
  filename: string
): Promise<string> => {
  const result = await new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { 
        resource_type: 'image',
        folder:'eventos/fotousuarios' ,
        public_id:filename 
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    ).end(buffer);
  });

  return result;
};
