import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import cartRouter from './Routes/cart.js';
import addressRouter from './Routes/address.js';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './Routes/paymentRoutes.js';
import adminRoutes from './Routes/admin.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middleware

// const allowedOrigins = [
//   "http://localhost:1000",
//   "https://xmart-1uzw.onrender.com"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

const allowedOrigins = ["http://localhost:5173", "https://xmart-1uzw.onrender.com", "https://xmart-ten.vercel.app/"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Serve frontend
// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, "../Project_Xmart/dist")));

// For any other route, send back index.html (Single Page App routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Project_Xmart/dist", "index.html"));
});

// Connect to MongoDB and then start the server
mongoose.connect(process.env.MONGODB_URI, {
  dbName: "MERN_E_Commerce"
})
.then(() => {
  console.log("✅ MongoDB Connected Successfully");
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB Connection Error:", err);
});
