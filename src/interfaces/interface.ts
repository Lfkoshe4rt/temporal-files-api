export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface IBody {
  minutes: number;
  privateFile: boolean;
  permanentFile: boolean;
}
