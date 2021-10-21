import express from "express";
import {
  postJoin,
  getEmailCheck,
  postLogin,
  getName,
  deleteAccount,
} from "../controllers/userController";
import { authenticateAccessToken } from "../middlewares.js";

const userRouter = express.Router();

userRouter.get("/name", authenticateAccessToken, getName);
userRouter.post("/login", postLogin);
userRouter.post("/join", postJoin);
userRouter.delete("/account", authenticateAccessToken, deleteAccount);
userRouter.get("/email/:id", getEmailCheck);

export default userRouter;
