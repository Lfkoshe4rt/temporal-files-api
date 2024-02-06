import { Router } from "express";
import {
  uploadFile,
  downloadFile,
  listFiles,
  deleteFile,
} from "../controllers/file";
import { upload } from "../middlewares/fileUpload";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);

router.get("/download/:name", downloadFile);

router.get("/files", listFiles);

router.delete("/delete/:name", deleteFile);

export default router;
