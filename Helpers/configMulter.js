import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const newFileName = `${file.fieldname}-${Date.now()}${extension}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

export default upload;
