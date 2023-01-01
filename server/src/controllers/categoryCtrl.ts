import { Response } from "express";
import { IReqAuth } from "./../config/interface";

export const createCategory = async (req: IReqAuth, res: Response) => {
  try {
    const name = req.body.name.toLowerCase();
    console.log({ name });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
