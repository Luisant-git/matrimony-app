import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Controller('uploads')
export class UploadController {
  constructor() {
    // Ensure the uploads directory exists
    const uploadPath = './uploads';
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [ 'image/jpeg', 'image/png', 'image/gif', 'image/webp', 
          'image/bmp', 'image/tiff', 'image/svg+xml', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','video/mp4',  // Add support for video/mp4
          'video/webm', 
          'video/ogg', 
          ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return callback(new Error('Invalid file type. Only images and documents are allowed.'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFiles(@UploadedFiles() files) {
    if (!process.env.ENV_UPLOAD) {
      throw new Error('ENV_UPLOAD environment variable is not set.');
    }

    try {
      const urls = files.map(file => `${process.env.ENV_UPLOAD}/uploads/${file.filename}`);
      console.log("File URLs:", urls);  // Add this log to check URLs
      return { urls };
    } catch (error) {
      throw new Error('File upload failed: ' + error.message);
    }
  }
}
