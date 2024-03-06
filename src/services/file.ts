import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import File from "../models/file";
import { convert } from "../utils/formate";

import { IBody, IFile } from "../interfaces/interface";

const upload = async (file: IFile, body: IBody) => {
  const { convertToMilliseconds } = convert();

  const { filename, originalname } = file;
  const { minutes = 1, privateFile = false, permanentFile = false } = body;

  const milliseconds = convertToMilliseconds(minutes);

  const response = await File.create({
    name: originalname.split(".")[0],
    size: file.size,
    key: privateFile ? randomUUID() : "Not required",
    url: `${process.env.URL}/download/${filename}`,
    permanent: !!permanentFile,
    private: !!privateFile,
    time: minutes,
  });

  console.log(response);

  if (!permanentFile) {
    setTimeout(async () => {
      if (file.path) {
        fs.unlinkSync(file.path);

        await File.findByIdAndDelete(response._id);
      }
    }, milliseconds);
  }

  return response;
};

const download = async (name: string) => {
  const pathFile = path.join(__dirname, `../storage/${name}`);

  const fileExists = fs.existsSync(pathFile);

  if (!fileExists) {
    throw new Error("File not found");
  }

  return pathFile;
};

const allFiles = async () => {
  const { convertToUnits } = convert();

  const files = await File.find();

  const filesInfo = files.map((file) => {
    const {
      _id,
      name,
      size,
      url,
      permanent,
      private: isPrivate,
      createdAt,
    } = file;

    return {
      id: _id,
      name,
      size: convertToUnits(size),
      url,
      permanent,
      private: isPrivate,
      createdAt,
    };
  });

  return filesInfo;
};

const deleteOne = async (name: string) => {
  const file = await File.findByIdAndDelete({ name });
  const pathFile = path.join(__dirname, `../storage/${name}`);

  if (!file) {
    throw new Error("File not found");
  }

  fs.unlinkSync(pathFile);

  return file;
};

const getOne = async (id: string) => {
  const file = await File.findById(id);

  if (!file) {
    throw new Error("File not found");
  }

  return file;
};

export { allFiles, deleteOne, download, upload, getOne };
