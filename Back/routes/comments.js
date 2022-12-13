import express from "express";
import {getComments, getComment, createComment, deleteComment, updateComment} from "../mongoDB/controllers/commentControllers.js"

const commentsRouter = express.Router()

commentsRouter.get("/comments", getComments);

commentsRouter.get("/comments/:id", getComment);

commentsRouter.post("/comments", createComment);

commentsRouter.delete("/comments/:id", deleteComment);
  
commentsRouter.patch("/comments/:id", updateComment);
  

export {commentsRouter}
  