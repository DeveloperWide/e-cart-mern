import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      req.user = await User.findOne({ _id: decoded.userId }).select(
        "-password",
      );

      next();
    } catch (err) {
      return res.status(401).json({ message: "NOT Authorized" });
    }
  } else {
    return res.status(401).json({ message: "No Token" });
  }
};
