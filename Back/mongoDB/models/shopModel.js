import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shopSchema = new Schema({
  tax: { type: String },
  shippingCost: { type: Array },
  couponCode: { type: String },
  shippingMethod: { type: Array },
});

const Shop = mongoose.model("Shop", shopSchema);

export { Shop };
