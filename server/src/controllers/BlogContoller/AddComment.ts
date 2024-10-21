import { Request, Response } from "express";
// import { User } from "../../models/User";
import { Blog } from "../../models/User";
export const AddComment = async (req: Request, res: Response) => {
    console.log(req.body);
    
  try {
    const {blogId,commentText,commentAuthor}=req.body;
    const findBlog=await Blog.findById({_id:blogId});
    if(!findBlog){
        return res.status(404).json({
            success:false,
            message:"Blog Not found",
        })
    }
    console.log(findBlog);
    
    const comment={
        commentAuthor:commentAuthor,
        commentText:commentText,
    }
    findBlog.comments.push(comment);
    await findBlog.save(); 
    return res.status(201).json({
        success:true,
        message:"Comment added Successfully"
    })
    
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
