import { NextFunction, Request, Response } from "express";

export const validRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, account, password } = req.body;
    if (!name) return res.status(400).json({ msg: "Please add your name!" });
    else if (name.length > 20) {
      return res.status(400).json({ msg: "Your name is up to 20 chars long." });
    }
    if (!account)
      return res.status(400).json({ msg: "Please add your email!" });
    else if (account.length > 20) {
      return res
        .status(400)
        .json({ msg: "Your email is up to 20 chars long." });
    }
  } catch (error) {}
};

function validPhone(phone: string): boolean {
  const re: RegExp = /^[+]/g;
  return re.test(phone);
}
function validEmail(email: string): boolean {
  const re: RegExp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}
