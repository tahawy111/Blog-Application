import { Router } from "express";
import {
  activeAccount,
  register,
  login,
  logout,
  refreshToken,
  googleLogin,
  facebookLogin,
} from "../controllers/authCtrl";
import { test } from "../controllers/userCtrl";
import { validRegister } from "../middlewares/valid";

const router = Router();

router.post("/register", validRegister, register);
router.post("/active", activeAccount);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh_token", refreshToken);
router.post("/google_login", googleLogin);
router.post("/facebook_login", facebookLogin);

// Tests
router.post("/test", test);

export default router;
