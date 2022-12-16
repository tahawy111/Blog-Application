import { Router } from "express";
import {
  confirmUpdateUser,
  resetPassword,
  updateUser,
} from "../controllers/userCtrl";
import { auth } from "../middlewares/user";
import { validRegister } from "../middlewares/valid";

const router = Router();

router.patch("/user", auth, updateUser);
router.post("/confirmChangeEmail", confirmUpdateUser);
router.post("/resetPassword", auth, resetPassword);

export default router;
