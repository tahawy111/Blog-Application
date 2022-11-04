import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, account, password } = req.body;
    const user = await User.findOne({ account });
    if (user)
      return res
        .status(403)
        .json({ msg: "Email or phone number already exists." });
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({ name, account, password: hashedPassword });
    const savedUser = await newUser.save();
    return res
      .status(201)
      .json({ msg: "Register successfully.", data: savedUser });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ msg: "Error occured Register" });
  }
};
