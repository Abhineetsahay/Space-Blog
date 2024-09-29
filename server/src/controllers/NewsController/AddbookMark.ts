import { Request, Response } from "express";
import { User } from "../../models/User";

export const AddbookMark = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "Username not Found",
      });
    }
    const {title,imageUrl,summary,url}=req.body;
    findUser.bookmarks.push({title,imageUrl,summary,url});
    await findUser.save();
    return res.status(200).json({
          success:true,
          message:"Bookmark added Successfully"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
