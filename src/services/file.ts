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

  const createResponseObject = (response: any) => {
    const { _id, name, createdAt, key, private: isPrivate } = response;
    return { _id, name, createdAt, key, private: isPrivate };
  };

  try {
    const response = await File.create({
      name: originalname.split(".")[0],
      size: file.size,
      key: privateFile ? randomUUID() : "Not required",
      url: `${process.env.URL}/download/${filename}`,
      permanent: !!permanentFile,
      private: !!privateFile,
      time: minutes,
    });

    if (!permanentFile) {
      setTimeout(async () => {
        try {
          if (file.path) {
            fs.unlinkSync(file.path);
            await File.findByIdAndDelete(response._id);
            console.log("File deleted successfully");
          }
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      }, milliseconds);
    }

    return createResponseObject(response);
  } catch (error) {
    console.error("Error saving file:", error);
    throw new Error("Failed to save file");
  }
};

const download = async (id: string) => {
  const file = await File.findById(id);

  if (!file) {
    throw new Error(`File not found`);
  }

  const { url } = file;

  const pathFile = path.join(__dirname, `../storage/${url.split("/").pop()}`);

  const fileExists = fs.existsSync(pathFile);

  if (!fileExists) {
    throw new Error("File not found");
  }

  return pathFile;
};

const deleteOne = async (id: string) => {
  const file = await File.findByIdAndDelete(id);

  if (!file) {
    throw new Error("File not found");
  }

  const pathFile = path.join(
    __dirname,
    `../storage/${file.url.split("/").pop()}`
  );

  if (!fs.existsSync(pathFile)) {
    throw new Error(`File not found at path`);
  }

  fs.unlinkSync(pathFile);

  return file;
};

const getOne = async (id: string) => {
  const file = await File.findById(id);

  if (!file) {
    throw new Error(`File not found for id: ${id}`);
  }

  if (file.private) {
    throw new Error("Unauthorized access");
  }

  return file;
};

const getPrivateFile = async (id: string, key: string | undefined) => {
  const file = await File.findById(id);

  if (!file) {
    throw new Error(`File not found for id: ${id}`);
  }

  if (file.key !== key) {
    throw new Error("Unauthorized access");
  }

  return file;
};

export { deleteOne, download, getOne, upload, getPrivateFile };
