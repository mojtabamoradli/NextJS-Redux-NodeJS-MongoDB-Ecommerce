import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, default: null  },
    price: { type: String, default: null  },
    offPercent: { type: String, default: null  },
    description: { type: String, default: null  },
    category: { type: String, default: null  },
    count: { type: String, default: null  },
    album: { type: Array, default: null  },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export { Product };
