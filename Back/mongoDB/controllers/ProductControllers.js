import { Product } from "../models/productModel.js";
import mongoose from "mongoose";

const getProducts = async (request, response) => {
  const products = await Product.find({});
  response.status(200).json(products);
};

const getProduct = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such product!" });
  }
  const product = await Product.findById(id);
  if (!product) {
    return response.status(404).json({ error: "No such product!" });
  }
  response.status(200).json(product);
};

const createProduct = async (request, response) => {
  const { title, price, offPercent, description, category, count, album } = request.body;
  try {
    const product = await Product.create({ title, price, offPercent, description, category, count, album });
    response.status(200).json(product);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such product!" });
  }
  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    return response.status(400).json({ error: "No such product!" });
  }
  response.status(200).json(product);
};

const updateProduct = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such product!" });
  }
  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...request.body,
    }
  );
  if (!product) {
    return response.status(400).json({ error: "No such product!" });
  }
  response.status(200).json(product);
};

export { getProducts, getProduct, createProduct, deleteProduct, updateProduct };
