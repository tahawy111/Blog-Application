import { Router } from "express";
import { activeAccount, register } from "../controllers/authCtrl";
import { validRegister } from "../middlewares/valid";

const router = Router();

router.post("/register", validRegister, register);
router.post("/active", activeAccount);

export default router;
