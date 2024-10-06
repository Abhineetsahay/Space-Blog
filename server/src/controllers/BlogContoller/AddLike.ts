import { Request, Response } from "express";
import { Blog, User } from "../../models/User";

interface BlogAddRemoval {
  username: string;
  blogId: string;
}

export const AddRemoveLike = async (req: Request, res: Response) => {
  try {
    const { username, blogId }: BlogAddRemoval = req.body;

    const user = await User.findOne({ username });
    const blog = await Blog.findById(blogId);

    if (!user || !blog) {
      return res.status(404).json({
        success: false,
        message: "User or Blog not found",
      });
    }

    const blogInUserLikes = user.likesPost.some(
      (postId: any) => postId.toString() === blogId
    );

    if (blogInUserLikes) {
      blog.likes -= 1;
      await blog.save();
      user.likesPost = user.likesPost.filter(
        (postId: any) => postId.toString() !== blogId
      );
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Blog unliked successfully.",
        likes: blog.likes,
      });
    } else {

      blog.likes += 1;
      await blog.save();

      user.likesPost.push(blog._id);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Blog liked successfully.",
        likes: blog.likes,
      });
    }
  } catch (error: any) {
    console.error("Error adding/removing like:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
