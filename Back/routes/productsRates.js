import express from "express";
import {getProductsRates, createProductRate} from "../mongoDB/controllers/productRateControllers.js"

const productsRatesRouter = express.Router()

productsRatesRouter.get("/product_rate", getProductsRates);

productsRatesRouter.post("/product_rate", createProductRate);

export {productsRatesRouter}
  