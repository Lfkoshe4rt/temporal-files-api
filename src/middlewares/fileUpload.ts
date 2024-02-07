import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../storage"),
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(".")[0];
    const uniqueSuffix = `${fileName}-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`;
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const upload = multer({ storage });

export { upload };
