import multer from "multer";
import { storage } from "../Config/cloudinary.js";

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Tipo de archivo no permitido. Solo se aceptan imágenes JPG, PNG y WEBP"
        ),
        false
      );
    }
  },
});

export default upload;
