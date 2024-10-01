import { Request, Response } from "express";
import { Blog } from "../../models/User";

export const GetBlog = async (req: Request, res: Response) => {
  try {
    const Blogs=await Blog.find({});
    if(!Blogs || Blogs.length === 0){
        return res.status(404).json({
            success:false,
            message:"No blog Found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Blog found Successfully",
        Blogs
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
