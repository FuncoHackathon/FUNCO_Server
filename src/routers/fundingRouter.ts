import express from "express";

const fundingRouter = express.Router();

fundingRouter.get("/lists", (req, res) => res.send("informations"));
fundingRouter.get("/ranking", (req, res) => res.send("rank"));
fundingRouter.get("/made", (req, res) => res.send("내가 만든 펀딩들"));
fundingRouter.get("/joined", (req, res) => res.send("내가 참여한 펀딩"));
fundingRouter.post("/upload", (req, res) => res.send("funding upload"));

export default fundingRouter;
