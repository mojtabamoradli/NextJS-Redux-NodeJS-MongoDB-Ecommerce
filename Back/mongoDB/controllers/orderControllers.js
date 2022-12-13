import { Order } from "../models/orderModel.js";
import mongoose from "mongoose";

const getOrders = async (request, response) => {
  const orders = await Order.find({});
  response.status(200).json(orders);
};

const createOrder = async (request, response) => {
  const { date, time, prepared, paid, sent, customer, email, phone, address, zipCode, total, basket } = request.body;
  try {
    const order = await Order.create({ date, time, prepared, paid, sent, customer, email, phone, address, zipCode, total, basket });
    response.status(200).json(order);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};




const updateOrder = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such order!" });
  }
  const order = await Order.findOneAndUpdate(
    { _id: id },
    {
      ...request.body,
    }
  );
  if (!order) {
    return response.status(400).json({ error: "No such order!" });
  }
  response.status(200).json(order);
};

export { getOrders, createOrder, updateOrder };
