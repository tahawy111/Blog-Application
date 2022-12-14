import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { generateActiveToken } from "./../config/generateToken";
import sendMail from "./../config/sendMail";
import { validEmail } from "./../middlewares/valid";

const CLIENT_URL = `${process.env.BASE_URL}`;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, account, password } = req.body;
    const user = await User.findOne({ account });
    if (user)
      return res
        .status(403)
        .json({ msg: "Email or phone number already exists." });
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = { name, account, password: hashedPassword };
    const active_token = generateActiveToken(newUser);
    const url = `${CLIENT_URL}/active/${active_token}`;
    const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;
    const txt = "Verify Your Email Address";
    const mailOptions = {
      from: SENDER_MAIL,
      to: account,
      subject: "BlogDev",
      html: `
              <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Tahawy channel.</h2>
              <p>Congratulations! You're almost set to start using BlogDEV.
                  Just click the button below to validate your email address.
              </p>
              
              <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: block;width: fit-content;margin-left: auto;margin-right: auto;">${txt}</a>
          
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          
              <div>${url}</div>
              </div>
            `,
    };

    if (validEmail(account)) {
      await sendMail(mailOptions);
      //     const savedUser = await newUser.save();
      return res.status(201).json({
        msg: "Register success. Please Check Your Email",
        data: newUser,
        active_token,
      });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ msg: "Error occured Register" });
  }
};
