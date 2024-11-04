import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import conectDB from "@/config/database";
import { errorHandlerMiddleware } from "@/middlewares/errorHandler";
import { rateLimit } from "express-rate-limit";

import file from "@/routes/file";

const PORT = process.env.PORT || 0;

const app = express();

console.log(process.env.DATABASE);

conectDB();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 15,
});

app.use(limiter);

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use("/", file);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
