import { Router } from "express";
import {
  deleteFile,
  downloadFile,
  oneFile,
  uploadFile,
  onePrivateFile,
} from "../controllers/file";
import { upload } from "../middlewares/fileUpload";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);

router.post("/file/:id", onePrivateFile);

router.get("/download/:id", downloadFile);

router.delete("/delete/:id", deleteFile);

router.get("/file/:id", oneFile);

export default router;
