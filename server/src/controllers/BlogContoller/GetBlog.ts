import { Request, Response } from "express";
import { Blog } from "../../models/User";

export const GetBlog = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query; 
    console.log(page);
    
    let skip = (Number(page) - 1) * Number(limit); 
    if(skip<0) skip=0;

    const Blogs = await Blog.find({})
      .skip(skip)
      .limit(Number(limit));

    const totalBlogs = await Blog.countDocuments({});

    if (!Blogs || Blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      Blogs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBlogs / Number(limit)),
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const GetBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Blog ID is required",
      });
    }
    const BlogToFound = await Blog.findById(id);
    if (!BlogToFound) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog found successfully",
      Blog: BlogToFound,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
