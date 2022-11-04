import { Router } from "express";
import { register } from "../controllers/authCtrl";
import { validRegister } from "../middleware/valid";

const router = Router();

router.post("/register", validRegister, register);

export default router;
