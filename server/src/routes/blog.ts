import { Router } from "express";
import { auth } from "../middlewares/user";
import { createBlog, getHomeBlogs } from "./../controllers/blogCtrl";

const router = Router();

router.route("/blog").post(auth, createBlog).get(auth, getHomeBlogs);

export default router;
