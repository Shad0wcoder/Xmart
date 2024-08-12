import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// user register
export const register = async (req, res) => {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) {
      return res.json({ message: "All fields are required.", success: false });
    }
    try {
        let user = await User.findOne({ email })
        if (user) return res.json({ message: "User Already exist ", success: false })

        const hashPass = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: hashPass, role: role || 'user' });

        res.json({ message: "User register successfully...! ", user, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
};

// user login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Email and password are required.", success: false });
    }
    try {
      let user = await User.findOne({ email });
      if (!user) return res.json({ message: "User Not Find", success: false });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.json({ message: "Invalid Password", success: false });
  
      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET || "&*^*&^*&%" ,{
        expiresIn:'365d'
      })
  
      res.json({ message: `Welcome ${user.name}`,token, success: true,});
    } catch (error) {
      res.json({ message: error.message });
    }
  };

// get All users
export const users = async (req, res) => {
    try {
        let users = await User.find().sort({ createdAt: -1 })
        res.json(users)
    } catch (error) {
        res.json(error.message)
    }
}

// get profile
export const profile = async (req, res) => {
    res.json({user:req.user})
}

// Update user role
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  
  if (!role || !['user', 'admin'].includes(role)) {
      return res.json({ message: 'Invalid role specified.', success: false });
  }
  
  try {
      let user = await User.findById(id);
      if (!user) return res.json({ message: 'User not found.', success: false });

      user.role = role;
      await user.save();

      res.json({ message: 'User role updated successfully.', user, success: true });
  } catch (error) {
      res.json({ message: error.message });
  }
};
