import { ProductRate } from "../models/productRateModel.js";
import mongoose from "mongoose";

const getProductsRates = async (request, response) => {
  const productsRates = await ProductRate.find({});
  response.status(200).json(productsRates);
};


const createProductRate = async (request, response) => {
  const { raterName, raterEmail, forId, forTitle, date, time, rate } = request.body;
  try {
    const productRate = await ProductRate.create({ raterName, raterEmail, forId, forTitle, date, time, rate });
    response.status(200).json(productRate);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export { getProductsRates, createProductRate };

