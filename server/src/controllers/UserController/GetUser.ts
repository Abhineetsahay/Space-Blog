import { Request, Response } from "express";
import { Blog, User } from "../../models/User";

export const GetUser = async (req: Request, res: Response) => {
          
  try {
    const {username} = req.query;
    const findUser = await User.findOne({ username });
    
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "Username not Found",
      });
    }
    const likedPostIds = findUser.likesPost;
    const LikePost=await Blog.find({_id:{$in:likedPostIds}})
    return res.status(200).json({
      success: true,
      message: "User Found Successfully",
      findUser,
      LikePost
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
