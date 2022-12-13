import { Comment } from "../models/commentModel.js";
import mongoose from "mongoose";

const getComments = async (request, response) => {
  const comments = await Comment.find({});
  response.status(200).json(comments);
};

const getComment = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such comment!" });
  }
  const comment = await Comment.findById(id);
  if (!comment) {
    return response.status(404).json({ error: "No such comment!" });
  }
  response.status(200).json(comment);
};

const createComment = async (request, response) => {
  const { commentatorName, commentatorEmail, comment, forId, forTitle, approved, date, time } = request.body;
  try {
    const com = await Comment.create({ commentatorName, commentatorEmail, comment, forId, forTitle, approved, date, time });
    response.status(200).json(com);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteComment = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such comment!" });
  }
  const comment = await Comment.findOneAndDelete({ _id: id });
  if (!comment) {
    return response.status(400).json({ error: "No such comment!" });
  }
  response.status(200).json(comment);
};

const updateComment = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such comment!" });
  }
  const commentToEdit = await Comment.findOneAndUpdate(
    { _id: id },
    {
      ...request.body,
    }
  );
  if (!commentToEdit) {
    return response.status(400).json({ error: "No such comment!" });
  }
  response.status(200).json(commentToEdit);
};

export { getComments, getComment, createComment, deleteComment, updateComment };
