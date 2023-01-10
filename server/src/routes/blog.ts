import { Router } from "express";
import { auth } from "../middlewares/user";
import {
  createBlog,
  getBlogsByCategory,
  getHomeBlogs,
} from "./../controllers/blogCtrl";

const router = Router();

router.route("/blog").post(auth, createBlog).get(getHomeBlogs);
router.route("/blog/:category_id").get(getBlogsByCategory);

export default router;
