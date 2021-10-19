import express from "express";

const userRouter = express.Router();

userRouter.get("/logout", (req, res) => res.send("logout"));
userRouter.get("/name", (req, res) => res.send("name"));
userRouter.post("/login", (req, res) => res.send("login"));
userRouter.post("/join", (req, res) => res.send("join"));
userRouter.delete("/account", (req, res) => res.send("delete account"));
userRouter.get("/email/:id", (req, res) => res.send(`email ${req.params.id}`));

export default userRouter;
