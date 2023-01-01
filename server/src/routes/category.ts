import { Router } from "express";
import { auth } from "../middlewares/user";
import { createCategory } from "./../controllers/categoryCtrl";

const router = Router();

router.post("/category", auth, createCategory);

export default router;
