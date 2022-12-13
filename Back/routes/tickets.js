import express from "express";
import { getTickets, createTicket, deleteTicket, updateTicket } from "../mongoDB/controllers/ticketControllers.js"

const ticketRouter = express.Router()

ticketRouter.get("/tickets", getTickets);

ticketRouter.post("/tickets", createTicket);

ticketRouter.delete("/tickets/:id", deleteTicket);
  
ticketRouter.patch("/tickets/:id", updateTicket);
  

export {ticketRouter}
  