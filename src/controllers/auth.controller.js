import { createAccessToken, getTokenVerification } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const calcAge = (birthDate) => {
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.json({
        error: "The email does not exist",
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.json({
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
        birthDate: userFound.birth_date,
        age: calcAge(userFound.birth_date),
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.send(false);

  const verified = await getTokenVerification(token);

  if (!verified) return res.send(false);

  const userFound = await User.findById(verified.id).select("-password");
  if (!userFound) return res.send(false);

  return res.json({
    data: {
      id: userFound._id,
      email: userFound.email,
      birthDate: userFound.birth_date,
      age: calcAge(userFound.birth_date),
    },
    error: null,
  });
};
