import { Router } from "express";
import { updateUser } from "../controllers/userCtrl";
import { auth } from "../middlewares/user";
import { validRegister } from "../middlewares/valid";

const router = Router();

router.patch("/user", auth, updateUser);

export default router;
