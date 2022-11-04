import { Router } from "express";
import { register } from "../controllers/authCtrl";

const router = Router();

router.post("/register", register);

export default router;
