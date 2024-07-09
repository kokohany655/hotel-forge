import { Request, Response } from "express";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRE as string }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 68400000,
      })
      .status(201)
      .json({
        data: user,
        msg: "Created account successfully",
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "this user is not found" });
    }
    const confirm = await bcrypt.compare(password, user?.password);
    if (!confirm) {
      return res.status(400).json({ msg: "wrong email or password" });
    }
    const token = jwt.sign(
      { userId: user?._id },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRE as string }
    );

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 68400000,
      })
      .json({ msg: "login successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const validateToken = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ userId: req.userId });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res
    .cookie("token", "", { expires: new Date(0) })
    .status(200)
    .json({ msg: "logout successfully" });
};
