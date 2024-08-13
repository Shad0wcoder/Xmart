import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import cartRouter from './Routes/cart.js';
import addressRouter from './Routes/address.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Replaces bodyParser.json()

const __dirname = path.resolve();
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Routers
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);

// Static Files
app.use(express.static(path.join(__dirname, "/Project_Xmart/dist")));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Project_Xmart", "dist", "index.html"));
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected Successfully..."))
    .catch((err) => console.log("MongoDB connection error: ", err));

// Start Server
const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
