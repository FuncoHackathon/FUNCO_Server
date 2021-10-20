import { doTypesOverlap } from "graphql";
import Funding from "../models/Funding.js";
import User from "../models/User.js";

export const getLists = async (req, res) => {
  try {
    const fundings = await Funding.find({
      path: "owner",
      select: "name",
    }).sort({ createdAt: "desc" });
    return res.status(200).json({
      status: 200,
      fundings,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "펀딩 글 조회에 실패했습니다.",
    });
  }
};

export const getRanking = async (req, res) => {
  try {
    const fundings = await Funding.find({}).sort({ current: "desc" });
    const fundingsRanking = fundings.slice(0, 3);
    return res.status(200).json({
      status: 200,
      fundings: fundingsRanking,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "펀딩 순위 불러오기에 실패했습니다.",
    });
  }
};

export const getMadeFunding = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = User.findById(_id).populate("myFunding");
    const fundings = user.myfunding;
    return res.status(200).json({
      status: 200,
      fundings,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "내가 만든 펀딩 불러오기에 실패했습니다.",
    });
  }
};

export const getJoinedFunding = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = User.findById(_id).populate("joinedFunding");
    const fundings = user.joinedFunding;
    return res.status(200).json({
      status: 200,
      fundings,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "내가 참여한 펀딩 불러오기에 실패했습니다.",
    });
  }
};

export const postUpload = async (req, res) => {
  const { _id } = req.user;
  const { title, goal, closingYear, closingMonth, closingDay, story } =
    req.body;
  if (goal < 100000) {
    return res.status(400).json({
      status: 400,
      message: "펀딩 최소 목표 금액이 100,000원입니다.",
    });
  }
  try {
    Funding.create({
      title,
      goal,
      closingYear,
      closingMonth,
      closingDay,
      SVGGeometryElement,
    });
    return res.status(200).json({
      status: 200,
      message: "펀딩 게시에 성공했습니다 :)",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "펀딩 게시에 실패했습니다.",
    });
  }
};
