import express from "express";
import {
  getLists,
  getRanking,
  getMadeFunding,
  getJoinedFunding,
  postUpload,
  postUploadImg,
  postJoinFunding,
  postUploadComment,
} from "../controllers/fundingController.js";
import { authenticateAccessToken, upload } from "../middlewares.js";

const fundingRouter = express.Router();

fundingRouter.get("/lists", getLists);
fundingRouter.get("/ranking", getRanking);
fundingRouter.get("/made", authenticateAccessToken, getMadeFunding);
fundingRouter.get("/joined", authenticateAccessToken, getJoinedFunding);
fundingRouter.post("/upload/img", upload.single("img"), postUploadImg);
fundingRouter.post("/upload", authenticateAccessToken, postUpload);
fundingRouter.post("/fund", authenticateAccessToken, postJoinFunding);
fundingRouter.post("/comment", authenticateAccessToken, postUploadComment);

export default fundingRouter;
