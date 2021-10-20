import express from "express";
import {
  postJoin,
  getEmailCheck,
  postLogin,
  getName,
} from "../controllers/userController";
import { authenticateAccessToken } from "../middlewares.js";

const userRouter = express.Router();

userRouter.get("/logout", authenticateAccessToken, (req, res) =>
  res.send("logout")
);
userRouter.get("/name", authenticateAccessToken, getName);
userRouter.post("/login", postLogin);
userRouter.post("/join", postJoin);
userRouter.delete("/account", (req, res) => res.send("delete account"));
userRouter.get("/email/:id", getEmailCheck);

export default userRouter;
