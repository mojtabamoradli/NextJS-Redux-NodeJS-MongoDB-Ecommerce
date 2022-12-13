import express from "express";
import {getShopData, updateShopData} from "../mongoDB/controllers/shopControllers.js"

const shopDataRouter = express.Router()

shopDataRouter.get("/shop", getShopData);
  
shopDataRouter.patch("/shop/:id", updateShopData);
  

export {shopDataRouter}
  