import { Router } from "express";
import { confirmUpdateUser, updateUser } from "../controllers/userCtrl";
import { auth } from "../middlewares/user";
import { validRegister } from "../middlewares/valid";

const router = Router();

router.patch("/user", auth, updateUser);
router.post("/confirmChangeEmail", auth, confirmUpdateUser);

export default router;
