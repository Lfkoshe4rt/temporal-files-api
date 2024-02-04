import { Request, Response } from "express";
import { IBody, IFile } from "../interfaces/interface";
import { allFiles, download, upload } from "../services/file";

const uploadFile = async (req: Request, res: Response) => {
  const { file, body } = req;

  try {
    const response = await upload(file as IFile, body as IBody);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: "File is required" });
  }
};

const downloadFile = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const response = await download(name);

    res.download(response.toString());
  } catch (error) {
    res.status(400).json({ message: "File not found" });
  }
};

const listFiles = async (req: Request, res: Response) => {
  const response = await allFiles();

  res.status(200).json(response);
};

export { downloadFile, listFiles, uploadFile };
