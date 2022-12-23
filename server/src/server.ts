import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes";

// Middlewares
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
routes(app);

// Mongo Connect
mongoose.connect(`${process.env.MONGO_URI}`, (): void =>
  console.log("DB Connected")
);

// Server Listenning
const PORT: number | string = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `App Is Listenning At http://localhost:${PORT}`,
    `http://localhost:3000`
  )
);
