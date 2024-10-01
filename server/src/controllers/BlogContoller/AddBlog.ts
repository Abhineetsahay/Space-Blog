import { Request, Response } from "express";
import { Blog } from "../../models/User";
import { User } from "../../models/User";
export const AddBlog = async (req: Request, res: Response) => {
  try {
    const { username, title, description } = req.body;
    const UserTobeUpdated = await User.findOne({ username });
    if (!UserTobeUpdated) {
      return res.status(404).json({
        success: false,
        message: "User not Found.",
      });
    }

    if (!username || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields (username, title, description) are required.",
      });
    }

    const newBlog = new Blog({
      username,
      title,
      description,
    });
    UserTobeUpdated.posts.push(newBlog);
    await UserTobeUpdated.save();
    await newBlog.save();

    return res.status(201).json({
      success: true,
      message: "Blog added successfully.",
      blog: newBlog,
    });
  } catch (error: any) {
    console.error("Error adding blog:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
