import { Request, Response } from "express";
import { IBody, IFile } from "../interfaces/interface";
import { download, deleteOne, upload, getOne } from "../services/file";

const uploadFile = async (req: Request, res: Response) => {
  const { file, body } = req;

  try {
    const response = await upload(file as IFile, body as IBody);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: "File is required" });
  }
};

const oneFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { key = "" } = req.query;

  try {
    const response = await getOne(id, key as string);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: "File not found" });
  }
};

const downloadFile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await download(id);

    res.download(response.toString());
  } catch (error) {
    res.status(400).json({ message: "File not found" });
  }
};

const deleteFile = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const response = await deleteOne(name);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: "File not found" });
  }
};

export { deleteFile, downloadFile, uploadFile, oneFile };
