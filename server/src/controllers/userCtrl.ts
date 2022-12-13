import { Request, Response } from "express";

export const updateUser = (req: Request, res: Response) => {
  try {
    res.json({ msg: "Update Success!" });
  } catch (error) {}
};
