import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import File from "../models/file";
import { convert } from "../utils/formate";

import { IBody, IFile } from "../interfaces/interface";

const upload = async (file: IFile, body: IBody) => {
  const { convertToMilliseconds } = convert();

  const { filename } = file;
  const { minutes = 1, privateFile = false, permanentFile = false } = body;

  const milliseconds = convertToMilliseconds(minutes);

  const response = await File.create({
    name: filename.split(".")[0],
    size: file.size,
    key: privateFile ? randomUUID() : "Not required",
    url: `${process.env.URL}/download/${filename}`,
    permanent: !!permanentFile,
    private: !!privateFile,
  });

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
  const pathFile = path.join(__dirname, `../uploads/${name}`);

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
    const { name, size, url, permanent, private: isPrivate } = file;

    return {
      name,
      size: convertToUnits(size),
      url,
      permanent,
      private: isPrivate,
    };
  });

  return filesInfo;
};

const deleteOne = async (name: string) => {
  const file = await File.findByIdAndDelete({ name });
  const pathFile = path.join(__dirname, `../uploads/${name}`);

  if (!file) {
    throw new Error("File not found");
  }

  fs.unlinkSync(pathFile);

  return file;
};

export { allFiles, deleteOne, download, upload };
