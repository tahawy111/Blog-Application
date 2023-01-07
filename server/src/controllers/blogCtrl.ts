import { Response } from "express";
import Blog from "../models/Blog";
import { IReqAuth } from "./../config/interface";

export const createBlog = async (req: IReqAuth, res: Response) => {
  if (!req.user)
    return res.status(400).json({ msg: "Invalid Authentication." });

  try {
    const { title, content, description, thumbnail, category } = req.body;

    const newBlog = new Blog({
      user: req.user._id,
      title,
      content,
      description,
      thumbnail,
      category,
    });

    await newBlog.save();
    res.json({ newBlog });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

const getHomeBlogs = async (req: IReqAuth, res: Response) => {
  const blogs = await Blog.aggregate([
    // User
    {
      $lookup: {
        from: "users",
        let: { user_id: "${user}" },
        pipeline: [{ $match: { expr: { $eq: ["$_id", "$$user_id"] } } }],
        as: "user",
      },
    },
  ]);
};
