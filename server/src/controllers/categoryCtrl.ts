import { Response } from "express";
import Category from "../models/Category";
import { IReqAuth } from "./../config/interface";

export const createCategory = async (req: IReqAuth, res: Response) => {
  try {
    if (!req.user)
      return res.status(500).json({ msg: "Invalid Authentication." });
    if (req.user.role !== "admin")
      return res.status(500).json({ msg: "You Are Not An Admin." });

    const name = req.body.name.toLowerCase();

    const newCat = new Category({ name });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};
