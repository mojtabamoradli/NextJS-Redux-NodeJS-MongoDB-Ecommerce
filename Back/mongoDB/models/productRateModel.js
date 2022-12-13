import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productRateSchema = new Schema(
  {
    date: { type: String },
    time: { type: String },
    raterEmail: { type: String },
    raterName: { type: String },
    forId: { type: String },
    forTitle: { type: String },
    rate: { type: String },
  },
  { timestamps: true }
);

const ProductRate = mongoose.model("ProductRate", productRateSchema);

export { ProductRate };
