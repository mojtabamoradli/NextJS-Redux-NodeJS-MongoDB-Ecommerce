import express from "express";
import { getOrders, createOrder, updateOrder } from "../mongoDB/controllers/orderControllers.js"

const orderRouter = express.Router()

orderRouter.get("/orders", getOrders);

orderRouter.post("/orders", createOrder);
  
orderRouter.patch("/orders/:id", updateOrder);
  

export {orderRouter}
  