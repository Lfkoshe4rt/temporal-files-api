import { Request, Response, NextFunction } from "express";
import { IBody, IFile } from "../interfaces/interface";
import {
  download,
  deleteOne,
  upload,
  getOne,
  getPrivateFile,
} from "../services/file";

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  const { file, body } = req;

  try {
    const response = await upload(file as IFile, body as IBody);
    res.status(200).json({ status: "SUCCESS", data: response });
  } catch (error) {
    next(error);
  }
};

const oneFile = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const response = await getOne(id);

    res.status(200).json({ status: "SUCCESS", data: response });
  } catch (error) {
    next(error);
  }
};

const onePrivateFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { key = "" } = req.body;

  try {
    const response = await getPrivateFile(id, key as string | undefined);

    res.status(200).json({ status: "SUCCESS", data: response });
  } catch (error) {
    next(error);
  }
};

const downloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const response = await download(id);

    res.download(response.toString());
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const response = await deleteOne(id);

    res.status(200).json({ status: "SUCCESS", data: response });
  } catch (error) {
    next(error);
  }
};

export { deleteFile, downloadFile, uploadFile, oneFile, onePrivateFile };
