import express from "express";
import {getProducts, getProduct, createProduct, deleteProduct, updateProduct} from "../mongoDB/controllers/productControllers.js"

const productsRouter = express.Router()

productsRouter.get("/products", getProducts);

productsRouter.get("/products/:id", getProduct);

productsRouter.post("/products", createProduct);

productsRouter.delete("/products/:id", deleteProduct);
  
productsRouter.patch("/products/:id", updateProduct);
  

export {productsRouter}
  