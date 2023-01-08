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

export const getHomeBlogs = async (req: IReqAuth, res: Response) => {
  // // Example 2
  // const blogs = await Blog.aggregate([
  //   // User
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "user",
  //       foreignField: "_id",
  //       pipeline: [{ $project: { password: 0 } }],
  //       as: "user",
  //     },
  //   },
  //   { $unwind: "$user" },
  // ]);

  // // Example 3
  // const blogs = await Blog.aggregate([
  //   // User
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "user",
  //       foreignField: "_id",
  //       as: "user",
  //     },
  //   },
  //   { $project: { "user.password": 0 } },
  //   { $unwind: "$user" },
  // ]);

  // Example 1
  const blogs = await Blog.aggregate([
    // User
    {
      $lookup: {
        from: "users", // here you put the full collection name
        let: { user_id: "$user" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
          { $project: { password: 0 } },
        ],
        as: "user", // here you put the name of the input field
      },
    },
    // array -> object
    { $unwind: "$user" },
    // Category
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    // array -> object
    { $unwind: "$category" },
    // Sorting
    { $sort: { createdAt: -1 } },
    // Group by category
    {
      $group: {
        _id: "$category._id",
        name: { $first: "$category.name" },
        blogs: { $push: "$$ROOT" }, // "$$ROOT" refers to the remaining fields from the input document
        count: { $sum: 1 },
      },
    },
    // Pagination for blogs
    {
      $project: {
        blogs: {
          $slice: ["$blogs", 0, 4],
        },
        count: 1,
        name: 1,
      },
    },
  ]);
  res.json(blogs);
};
