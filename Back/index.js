import express from "express";
import dotenv from "dotenv";
import { productsRouter } from "./routes/products.js";
import { shopDataRouter } from "./routes/shopData.js";
import { commentsRouter } from "./routes/comments.js";
import { ticketRouter } from "./routes/tickets.js";
import { emailRouter } from "./routes/email.js";
import { smsRouter } from "./routes/sms.js";
import { paymentRouter } from "./routes/payment.js";
import { usersRouter } from "./routes/users.js";
import { orderRouter } from "./routes/orders.js";
import { productsRatesRouter } from "./routes/productsRates.js";

import mongoose from "mongoose";

import { uploadByMulter } from "./multer/upload.js";
import {uploadProductsImagesByMulter} from "./multer/uploadProductsImages.js"
import {uploadTicketsFilesByMulter} from "./multer/uploadTicketsFiles.js"

const app = express(); //Invoke express

dotenv.config();

//middleware = attaches the data of the body to the request object
app.use(express.json());


// global middleware, next let you run every piece of the middleware of after each other
app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

// routes
app.use(emailRouter);
app.use(smsRouter);
app.use(productsRouter);
app.use(commentsRouter);
app.use(usersRouter);
app.use(ticketRouter);
app.use(shopDataRouter);
app.use(paymentRouter);
app.use(orderRouter);
app.use(productsRatesRouter);


//apps
app.use(uploadByMulter);
app.use(uploadProductsImagesByMulter);
app.use(uploadTicketsFilesByMulter);


// connect to db
mongoose
  .connect(process.env.MONGODB_ATLAS_URI)
  .then(() => {
    //Listen for request
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
