import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentRouter = express.Router();

dotenv.config();


paymentRouter.use(bodyParser.urlencoded({ extended: true }));
paymentRouter.use(bodyParser.json());

paymentRouter.post("/payment", cors(), async (req, res) => {
    try {
      const payment = await stripe.paymentIntents.create({
        amount: `${req.body.amount}`,
        currency: "USD",
        description: "Ecommerce Company",
        payment_method: `${req.body.id}`,
        confirm: true,
      });
      console.log("Payment", payment);
      res.json({
        message: "Payment successful",
        success: true,
      });
    } catch (error) {
      console.log("Error", error);
      res.json({
        message: "Payment failed",
        success: false,
      });
    }
  });



export { paymentRouter };
