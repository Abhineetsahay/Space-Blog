import { Request, Response } from "express";
import { User } from "../../models/User";

interface Validator {
  username: string;
  email: string;
}
export const AddUser = async (req: Request, res: Response) => {
  try {
    const { username, email }: Validator = req.body;
    if (await User.findOne({ username })) {
      return res.status(409).json({
        success: false,
        message: "Username already created",
      });
    }
    const newUser = new User({username, email});
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created Successfully",
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
