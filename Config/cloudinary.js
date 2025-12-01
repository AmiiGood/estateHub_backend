import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configuracion de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuracion del storage para multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "estatehub/propiedades", // Carpeta donde se guardan las imagenes
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      { width: 1200, height: 800, crop: "limit" }, // Limita el tamaño
      { quality: "auto" },
    ],
  },
});

const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "estatehub/contratos",
    allowed_formats: ["pdf", "doc", "docx"],
    resource_type: "raw", // Importante para documentos
  },
});

export { cloudinary, storage, documentStorage };