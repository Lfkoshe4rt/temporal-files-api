import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import conectDB from "./config/database";

import file from "./routes/file";

const PORT = process.env.PORT || 0;

const app = express();

conectDB();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use("/", file);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
