import express from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
// console.log("RAZORPAY_KEY_ID", RAZORPAY_KEY_ID);
// console.log("secret", RAZORPAY_SECRET);


router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ error: "Invalid amount" });
    }

    console.log("Creating order for amount:", amount);

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.error("Create order error:", error?.message, error?.stack, error?.error);
    res.status(500).json({ error: "Failed to create order" });
  }
});


export default router;
