import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";


export const Authenticated = async (req, res, next) => {
  try {
    const token = req.header("Auth");

    if (!token) return res.json({ message: "Login first" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "&*^*&^*&%");

    const id = decoded.userId;

    let user = await User.findById(id);

    if (!user) return res.json({ message: "User not exist" });

    req.user = user;
    next();
    // console.log("token",token);

    // console.log(decoded)
  } catch (error) {
    if (error) {
      return res.json({ message: "Invalid or expired token" });
    } else {
      return res.json({ message: "Internal server error" });
    }
  }
}
export const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.json({ message: 'Access denied: Admins only' });
    }
  });
};

