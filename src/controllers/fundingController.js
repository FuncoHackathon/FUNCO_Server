import Funding from "../models/Funding.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const getLists = async (req, res) => {
  try {
    const fundings = await Funding.find({})
      .populate({ path: "owner", select: "name" })
      .sort({ _id: "desc" });
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
    const user = await User.findById(_id).populate("myFunding");
    const fundings = user.myFunding;
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

export const postUploadImg = (req, res) => {
  try {
    return res.status(200).json({
      status: 200,
      img: req.file.filename,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "이미지 업로드에 실패했습니다.",
    });
  }
};

export const postUpload = async (req, res) => {
  const { _id } = req.user;
  const {
    title,
    tags,
    goal,
    closingYear,
    closingMonth,
    closingDay,
    story,
    img,
  } = req.body;
  if (goal < 100000) {
    return res.status(400).json({
      status: 400,
      message: "펀딩 최소 목표 금액이 100,000원입니다.",
    });
  }
  try {
    const newFunding = await Funding.create({
      title,
      tags,
      goal,
      closingYear,
      closingMonth,
      closingDay,
      img,
      story,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.myFunding.push(newFunding);
    await user.save();
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

export const deleteFundingUpload = async (req, res) => {
  const {
    user: { _id },
    params: { id },
  } = req;
  try {
    const funding = Funding.findById(id);
    if (!funding) {
      return res.status(404).json({
        status: 404,
        message: "삭제할 펀딩글을 찾지 못했습니다.",
      });
    }
    if (funding._id !== _id) {
      return res.status(400).json({
        status: 400,
        message: "펀딩글을 수정할 권한이 없습니다.",
      });
    }
    for (comment of funding.comments) {
      await Comment.deleteOne(comment);
    }
    await Funding.deleteOne(id);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "펀딩글 삭제에 실패했습니다.",
    });
  }
};

export const postJoinFunding = async (req, res) => {
  const { _id } = req.user;
  const { amount, fundingId } = req.body;
  try {
    const funding = await Funding.findById(fundingId);
    if (!funding) {
      return res.status(404).json({
        status: 404,
        message: "펀딩 게시글을 찾지 못했습니다.",
      });
    }
    funding.current += amount;
    await funding.save();
    const user = await User.findById(_id);
    user.joinedFunding.push(postingId);
    await user.save();
    return res.status(200).json({
      status: 200,
      message: "펀딩 참여에 성공했습니다 :)",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "펀딩 참여에 실패했습니다.",
    });
  }
};

export const postUploadComment = async (req, res) => {
  const { _id } = req.user;
  const { fundingId, text } = req.body;
  try {
    const funding = await Funding.findById(fundingId);
    if (!funding) {
      return res.status(404).json({
        status: 404,
        message: "펀딩 댓글을 업로드할 게시글을 찾지 못했습니다.",
      });
    }
    const newComment = await Comment.create({
      text,
      owner: _id,
      funding: funding._id,
    });
    funding.comments.push(newComment);
    await funding.save();
    return res.status(200).json({
      status: 200,
      message: "댓글 업로드에 성공했습니다.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      messge: "펀딩 댓글 업로드에 실패했습니다.",
    });
  }
};

export const postEditComment = async (req, res) => {
  const {
    user: { _id },
    params: { id },
    body: { text },
  } = req;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        status: 400,
        message: "수정할 댓글을 찾지 못했습니다.",
      });
    }
    if (comment.owner !== _id) {
      return res.status(400).json({
        status: 400,
        message: "댓글을 수정할 권한이 없습니다.",
      });
    }
    comment.text = text;
    await comment.save();
    return res.status(200).json({
      status: 200,
      message: "댓글을 수정하였습니다.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "댓글 수정에 실패했습니다.",
    });
  }
};

export const deleteComment = async (req, res) => {
  const {
    user: { _id },
    params: { id },
  } = req;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        status: 400,
        message: "수정할 댓글을 찾지 못했습니다.",
      });
    }
    if (comment.owner !== _id) {
      return res.status(400).json({
        status: 400,
        message: "댓글을 수정할 권한이 없습니다.",
      });
    }
    const funding = await Funding.findById(comment.funding);
    funding.comments = funding.comments.filter(
      (commentInFunding) => commentInFunding !== comment._id
    );
    await funding.save();
    await Comment.deleteOne(id);
    return res.status(200).json({
      status: 200,
      message: "댓글 삭제를 성공했습니다 :)",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "댓글 삭제를 실패했습니다.",
    });
  }
};
