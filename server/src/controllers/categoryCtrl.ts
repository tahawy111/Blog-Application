import { Request, Response } from "express";
import Category from "../models/Category";
import { IReqAuth } from "./../config/interface";

export const createCategory = async (req: IReqAuth, res: Response) => {
  try {
    if (!req.user)
      return res.status(500).json({ msg: "Invalid Authentication." });
    if (req.user.role !== "admin")
      return res.status(500).json({ msg: "You Are Not An Admin." });

    const name = req.body.name.toLowerCase();

    const category = await Category.findOne({ name });
    // if (category)
    //   res.status(403).json({ msg: "This Category Is Already Exists! 😕" });

    const newCat = new Category({ name });

    await newCat.save();

    const categories = await Category.find().sort("-createdAt");

    res.status(201).json({ msg: "Category Created ✔", categories });
  } catch (error: any) {
    let errMsg;
    if (error.code === 11000) {
      errMsg = "This Category Is Already Exists! 😕";
      return res.status(500).json({ err: errMsg });
    }
    return res.status(500).json({ err: error.message });
  }
};

export const getCategory = async (req: IReqAuth, res: Response) => {
  try {
    const categories = await Category.find().sort("-createdAt");
    res.json({ categories });
  } catch (error: any) {
    return res.status(400).json({ msg: error.message });
  }
};

export const updateCategory = async (req: IReqAuth, res: Response) => {
  try {
    if (!req.user)
      return res.status(500).json({ msg: "Invalid Authentication." });
    if (req.user.role !== "admin")
      return res.status(500).json({ msg: "You Are Not An Admin." });

    const name = req.body.name.toLowerCase();

    await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    const categories = await Category.find().sort("-createdAt");

    res.json({ msg: "Update Success ✔", categories });
  } catch (error: any) {
    let errMsg;
    if (error.code === 11000) {
      errMsg = "This Category Is Already Exists! 😕";
      return res.status(500).json({ err: errMsg });
    }
    return res.status(500).json({ err: error.message });
  }
};

export const deleteCategory = async (req: IReqAuth, res: Response) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    const categories = await Category.find().sort("-createdAt");
    res.json({ msg: "Delete Success! 🗑", categories });
  } catch (error: any) {
    return res.status(500).json({ err: error.message });
  }
};
