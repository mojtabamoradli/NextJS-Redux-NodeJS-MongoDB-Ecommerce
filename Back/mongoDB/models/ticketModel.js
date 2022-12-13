import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
  attachment: { type: String },
  time: { type: String, required: true },
  date: { type: String, required: true },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export { Ticket };
