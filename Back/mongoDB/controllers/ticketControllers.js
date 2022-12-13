import { Ticket } from "../models/ticketModel.js";

// get all Tickets
const getTickets = async (request, response) => {
  const Message = await Ticket.find({});
  response.status(200).json(Message);
};

// create new message
const createTicket = async (request, response) => {
  const { to, from, message, attachment, time, date } = request.body;

  // add doc to db
  try {
    const Message = await Ticket.create({ to, from, message, attachment, time, date });
    response.status(200).json(Message);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// delete a message
const deleteTicket = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such ticket" });
  }
  const message = await Ticket.findOneAndDelete({ _id: id });
  if (!message) {
    return response.status(400).json({ error: "No such ticket" });
  }
  response.status(200).json(message);
};

// update a message
const updateTicket = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such ticket" });
  }
  const message = await Ticket.findOneAndUpdate(
    { _id: id },
    {
      ...request.body,
    }
  );
  if (!message) {
    return response.status(400).json({ error: "No such ticket" });
  }
  response.status(200).json(message);
};

export { getTickets, createTicket, deleteTicket, updateTicket };
