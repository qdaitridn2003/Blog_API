import createHttpError from 'http-errors';
import multer from 'multer';

const imageHandler = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 10 * 1000 * 1000, //10MB
  },
  fileFilter: (req, file, next) => {
    const tailFile = file.mimetype.split('/')[1];
    if (tailFile === 'jpg' || tailFile === 'jpeg' || tailFile === 'png' || tailFile === 'gif' || tailFile === 'svg') {
      next(null, true);
    } else {
      next(createHttpError('Image must have format like jpg, png, svg, jpeg, gif'));
    }
  },
});

export default imageHandler;
