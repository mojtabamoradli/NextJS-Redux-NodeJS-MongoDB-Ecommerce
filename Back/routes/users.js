import express from "express";
import {getUsers, signupUser, alterUser, signupGoogleUser} from "../mongoDB/controllers/userControllers.js"

const usersRouter = express.Router()

usersRouter.get("/auth/users", getUsers);

usersRouter.post("/auth/users/signup", signupUser);

usersRouter.post("/auth/users/signup/google", signupGoogleUser);
  
usersRouter.patch("/auth/users/:id", alterUser);
  

export {usersRouter}
  