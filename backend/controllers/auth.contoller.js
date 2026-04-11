import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: "User already Exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hash,
  });

  generateToken(res, user._id);

  return res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id);
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res.status(400).json({
      message: "Wrong email or password",
    });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    secure: true,
    expires: new Date(0),
  });

  return res.status(200).json({
    message: "Logged Out Successfully",
  });
};
