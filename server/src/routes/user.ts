import { Router } from "express";
import {
  confirmUpdateUser,
  getUser,
  resetPassword,
  updateUser,
} from "../controllers/userCtrl";
import { auth } from "../middlewares/user";
import { validRegister } from "../middlewares/valid";

const router = Router();

router.patch("/user", auth, updateUser);
router.post("/confirmChangeEmail", confirmUpdateUser);
router.post("/resetPassword", auth, resetPassword);
router.get("/user/:id", getUser);

export default router;
