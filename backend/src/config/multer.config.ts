import { Request,  } from 'express';
import multer, { FileFilterCallback } from 'multer';

const storage = multer.memoryStorage();


const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new Error('Arquivo recebido não é CSV'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export default upload;
