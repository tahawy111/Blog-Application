import { NextFunction, Request, Response } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization;
    console.log(token);
    next();
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
