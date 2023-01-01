import { Router } from "express";
import { auth } from "../middlewares/user";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "./../controllers/categoryCtrl";

const router = Router();

router
  .route("/category/:id")
  .put(auth, updateCategory)
  .delete(auth, deleteCategory);

router.route("/category").post(auth, createCategory).get(getCategory);

export default router;
