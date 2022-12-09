import { Router } from "express";
import {
  activeAccount,
  register,
  login,
  logout,
  refreshToken,
  googleLogin,
} from "../controllers/authCtrl";
import { validRegister } from "../middlewares/valid";

const router = Router();

router.post("/register", validRegister, register);
router.post("/active", activeAccount);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh_token", refreshToken);
router.post("/google_login", googleLogin);

export default router;
