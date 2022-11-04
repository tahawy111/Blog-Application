import { NextFunction, Request, Response } from "express";

export const validRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, account, password } = req.body;
  if (!name) return res.status(403).json({ msg: "Please add your name!" });
  else if (name.length > 20) {
    return res.status(403).json({ msg: "Your name is up to 20 chars long." });
  }
  if (!account)
    return res
      .status(403)
      .json({ msg: "Please add your email or phone number!" });
  else if (!validPhone(account) && !validEmail(account)) {
    return res
      .status(403)
      .json({ msg: "Email or phone number format is incorrect." });
  }
  if (password.length < 6) {
    return res.status(403).json({ msg: "Password must be at least 6 chars." });
  }

  next();
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
