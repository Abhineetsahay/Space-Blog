import { Request, Response } from "express";
import { User } from "../../models/User";

export const RemoveBookmark = async (req: Request, res: Response) => {
  try {
    const { username, title, imageUrl, summary, url } = req.body;

    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "Username not Found",
      });
    }
    
    findUser.bookmarks = findUser.bookmarks.filter(bookmark => 
      !(bookmark.title === title && bookmark.imageUrl === imageUrl && bookmark.summary === summary && bookmark.url === url)
    ) as any;
    await findUser.save();
    return res.status(200).json({
      success: true,
      message: "Bookmark removed successfully",
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
