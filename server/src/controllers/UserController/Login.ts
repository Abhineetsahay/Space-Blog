import { Request, Response } from "express";
import { User } from "../../models/User";

export const GetUserViaLogin = async (req: Request, res: Response) => {
    
  try {
    const {email} = req.query;
    
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "Username not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Found Successfully",
      findUser,
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
