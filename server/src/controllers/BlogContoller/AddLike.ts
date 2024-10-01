import { Request, Response } from "express";
import { Blog } from "../../models/User"; // Assuming Blog is exported from User model
import { User } from "../../models/User"; // Assuming User model is being used for user-related operations

export const AddLike = async (req: Request, res: Response) => {
  try {
    const { username, blogId } = req.body; // Only need username and blogId
    const userToBeUpdated = await User.findOne({ username });

    if (!userToBeUpdated) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required.",
      });
    }

    const blogToUpdate = await Blog.findById(blogId);

    if (!blogToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // Check if the user has already liked the blog
    const hasLiked = userToBeUpdated.likedBlogs.includes(blogId);

    if (hasLiked) {
      // If already liked, unlike the blog
      userToBeUpdated.likedBlogs = userToBeUpdated.likedBlogs.filter(
        (id) => id.toString() !== blogId
      );
      blogToUpdate.likes -= 1; // Decrement likes
    } else {
      // If not liked, like the blog
      userToBeUpdated.likedBlogs.push(blogId);
      blogToUpdate.likes += 1; // Increment likes
    }

    await userToBeUpdated.save();
    await blogToUpdate.save();

    return res.status(200).json({
      success: true,
      message: hasLiked ? "Blog unliked successfully." : "Blog liked successfully.",
      likes: blogToUpdate.likes,
    });
  } catch (error: any) {
    console.error("Error adding/removing like:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
