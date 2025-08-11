import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";


export const Authenticated = async (req, res, next) => {
  try {
    const token = req.header("Authorization");


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

// middleware/auth.js
// export const isAdmin = (req, res, next) => {
//   if (req.user?.role === 'admin') {
//     return next();
//   }
//   return res.status(403).json({ message: 'Access denied. Admins only.' });
// };

