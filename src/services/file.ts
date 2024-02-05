import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { convert } from "../utils/formate";

import { IBody, IFile } from "../interfaces/interface";

const upload = async (file: IFile, body: IBody) => {
  const { convertToMilliseconds } = convert();

  const { filename } = file;
  const { minutes = 1, privateFile = false, permanentFile = false } = body;

  const milliseconds = convertToMilliseconds(minutes);

  if (!permanentFile) {
    setTimeout(() => {
      if (file.path) {
        fs.unlinkSync(file.path);
      }
    }, milliseconds);
  }

  const fileResponse = {
    message: "File uploaded successfully",
    url: `${process.env.URL}/download/${filename}`,
    time: permanentFile ? "Permanent" : `${minutes} minutes`,
    status: privateFile ? "private" : "public",
    password: privateFile ? randomUUID() : "Not required",
  };

  return fileResponse;
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

  const pathFile = path.join(__dirname, `../uploads`);

  const files = fs.readdirSync(pathFile);

  const filesInfo = files.map((file) => {
    const { size, birthtime: created } = fs.statSync(`${pathFile}/${file}`);

    const fileInfo = {
      name: file.split(".")[0],
      url: `${process.env.URL}/download/${file}`,
      size: convertToUnits(size),
      created,
    };

    return fileInfo;
  });

  return filesInfo;
};

export { allFiles, download, upload };
