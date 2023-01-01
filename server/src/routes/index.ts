import { Express } from "express";
import auth from "./auth";
import user from "./user";
import category from "./category";

export default function (app: Express) {
  app.use("/api", auth);
  app.use("/api", user);
  app.use("/api", category);
}
