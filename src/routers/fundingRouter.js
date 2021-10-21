import express from "express";
import {
  getLists,
  getRanking,
  getMadeFunding,
  getJoinedFunding,
  postUpload,
  postUploadImg,
} from "../controllers/fundingController.js";
import { authenticateAccessToken, upload } from "../middlewares.js";

const fundingRouter = express.Router();

fundingRouter.get("/lists", getLists);
fundingRouter.get("/ranking", getRanking);
fundingRouter.get("/made", authenticateAccessToken, getMadeFunding);
fundingRouter.get("/joined", authenticateAccessToken, getJoinedFunding);
fundingRouter.post("/upload/img", upload.single("img"), postUploadImg);
fundingRouter.post("/upload", authenticateAccessToken, postUpload);

export default fundingRouter;
