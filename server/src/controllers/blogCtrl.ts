import { Response } from "express";
import mongoose from "mongoose";
import Blog from "../models/Blog";
import { IReqAuth } from "./../config/interface";

const getAggregate: any = [
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
];

const Pagination = (
  req: IReqAuth
): { page: number; limit: number; skip: number } => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};

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
    const blogs = await Blog.aggregate(getAggregate);
    res.json({ blogs, msg: "Blog Created Successfully ✔" });
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
  const blogs = await Blog.aggregate(getAggregate);
  res.json({ blogs });
};
export const getBlogsByCategory = async (req: IReqAuth, res: Response) => {
  try {
    const { limit, skip } = Pagination(req);
    const Data = await Blog.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                category: new mongoose.Types.ObjectId(req.params.category_id),
              },
            },
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
            // Sorting
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [
            {
              $match: {
                category: new mongoose.Types.ObjectId(req.params.category_id),
              },
            },
            { $count: "count" },
          ],
        },
      },
      {
        $project: {
          count: { $arrayElemAt: ["$totalCount.count", 0] },
          totalData: 1,
        },
      },
    ]);

    const count = Data[0].count;
    let total: number = 0;

    if (total % limit === 0) {
      total = count / limit;
    } else {
      total = Math.floor(total / limit) + 1;
    }
    res.json({ blogs: Data[0].totalData, count, total });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};
