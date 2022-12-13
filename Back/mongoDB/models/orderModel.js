import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    date: { type: String, default: null  },
    time: { type: String, default: null  },
    paid: { type: Boolean, default: false  },
    prepared: { type: Boolean, default: false  },
    sent: { type: Boolean, default: false  },
    customer: { type: String, default: null  },
    email: { type: String, default: null  },
    phone: { type: String, default: null  },
    address: { type: String, default: null  },
    zipCode: { type: String, default: null  },
    total: { type: String, default: null  },
    basket: { type: Array, default: null  },

  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export { Order };