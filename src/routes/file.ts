import { Router } from "express";
import {
  uploadFile,
  downloadFile,
  deleteFile,
  oneFile,
} from "../controllers/file";
import { upload } from "../middlewares/fileUpload";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);

router.get("/download/:id", downloadFile);

router.delete("/delete/:name", deleteFile);

router.get("/file/:id", oneFile);

export default router;
