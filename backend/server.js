// Load environment variables
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import Stripe from "stripe";
import cors from "cors";


const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Calculate order amount
const calculateOrderAmount = (items) => {
  return items.reduce((total, item) => total + item.amount, 0);
};

// Create payment intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "cad",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
