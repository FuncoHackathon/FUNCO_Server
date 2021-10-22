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
  postEditComment,
  deleteComment,
  deleteFundingUpload,
} from "../controllers/fundingController.js";
import { authenticateAccessToken, upload } from "../middlewares.js";

const fundingRouter = express.Router();

fundingRouter.get("/lists", getLists);
fundingRouter.get("/ranking", getRanking);
fundingRouter.get("/made", authenticateAccessToken, getMadeFunding);
fundingRouter.get("/joined", authenticateAccessToken, getJoinedFunding);
fundingRouter.post("/upload/img", upload.single("img"), postUploadImg);
fundingRouter.post("/upload", authenticateAccessToken, postUpload);
fundingRouter.get("/delete/:id", authenticateAccessToken, deleteFundingUpload);
fundingRouter.post("/fund", authenticateAccessToken, postJoinFunding);
fundingRouter.post("/comment", authenticateAccessToken, postUploadComment);
fundingRouter.post(
  "/comment/edit/:id",
  authenticateAccessToken,
  postEditComment
);
fundingRouter.get(
  "/comment/delete/:id",
  authenticateAccessToken,
  deleteComment
);

export default fundingRouter;
