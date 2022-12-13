import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: null },
    password: { type: String, required: true },
    privateKey: { type: String, default: (Math.random() * 10 ** 21).toString(36) },
    publicKey: { type: String, default: (Math.random() * 10 ** 21).toString(36) },
    role: { type: String, default: "user" },
    status: { type: String, default: "allowed" },
    emailVerified: { type: Boolean, default: false },
    TFA: { type: Boolean, default: false },
    TFASecret: { type: String, default: null },
    TFAQR: { type: String, default: null },
    address: { type: String, default: null },
    zipCode: { type: String, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
