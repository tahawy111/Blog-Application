import { Router } from "express";
import { auth } from "../middlewares/user";
import { createBlog } from "./../controllers/blogCtrl";

const router = Router();

router.route("/blog").post(auth, createBlog);

export default router;
