import { Request, Response } from "express";
import { IReqAuth, IToken } from "../config/interface";
import bcrypt from "bcrypt";
import User from "../models/User";
import { validEmail } from "../middlewares/valid";
import sendMail from "../config/sendMail";
import { CLIENT_URL } from "./authCtrl";
import { generateActiveToken } from "../config/generateToken";
import jwt from "jsonwebtoken";

export const updateUser = async (req: IReqAuth, res: Response) => {
  if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });
  // Check Inputs
  try {
    req.body.name === req.user?.name && delete req.body.name;
    req.body.avatar === req.user?.avatar && delete req.body.avatar;
    req.body.account === req.user?.account && delete req.body.account;

    if (bcrypt.compareSync(req.body.password, req.user?.password)) {
      delete req.body.password;
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, 12);
    }

    if (
      req.body.account !== req.user?.account &&
      req.body.account !== undefined
    ) {
      const active_token = generateActiveToken({ user: req.body });
      const url = `${CLIENT_URL}/changeEmail/${active_token}`;
      const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;
      const txt = "Verify Your Email Address";
      const mailOptions = {
        from: `"Change Email" <${SENDER_MAIL}>`,
        to: req.body.account,
        subject: "Change Email Verification",
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Tahawy channel.</h2>
              <p>Congratulations! You're almost set to start Change Email on BlogDEV.
              Just click the button below to Change your email address.
              </p>
              
              <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: block;width: fit-content;margin-left: auto;margin-right: auto;">${txt}</a>
          
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          
              <p>${url}</p>
              </div>
            `,
      };

      if (validEmail(req.body.account)) {
        await sendMail(mailOptions);
        //     const savedUser = await newUser.save();
        return res.status(201).json({
          msg: "Sent Verification Email. The Race is on! 5 minutes to confirm your new email",
          data: req.body,
          active_token,
        });
      } else {
        return res.status(400).json({ msg: "Invalid Email" });
      }
    }

    try {
      await User.findByIdAndUpdate(req.user?._id, req.body, {
        new: true,
      });
      res.json({ msg: "User Updated Successfully" });
    } catch (error: any) {
      return res.status(400).json({ msg: error.message });
    }
  } catch (error: any) {
    return res.status(400).json({ msg: error.message });
  }
};

export const confirmUpdateUser = async (req: IReqAuth, res: Response) => {
  try {
    const { active_token } = req.body;
    if (!active_token)
      return res.status(403).json({ msg: "Please add your token!" });
    const decoded = <IToken>(
      jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
    );
    const updateObj: any = {};
    if (decoded.user?.name) updateObj.name = decoded.user?.name;
    if (decoded.user?.account) updateObj.account = decoded.user?.account;
    if (decoded.user?.avatar) updateObj.avatar = decoded.user?.avatar;
    if (decoded.user?.password) updateObj.password = decoded.user?.password;

    const savedUser = await User.findByIdAndUpdate(req.user?._id, {
      name: decoded.user?.name,
      account: decoded.user?.account,
      password: decoded.user?.password,
      avatar: decoded.user?.avatar,
    });
    res.json({ msg: "User Updated Successfully", savedUser });
  } catch (error: any) {
    return res.status(400).json({ msg: error.message });
  }
};
