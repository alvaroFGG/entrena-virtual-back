import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        error: "The email does not exist",
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "The password is incorrect",
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
    });

    res.json({
      data: {
        id: userFound._id,
        email: userFound.email,
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
