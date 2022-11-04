import { Express } from "express";
import auth from "./auth";

export default function (app: Express) {
  app.use("/api", auth);
}
