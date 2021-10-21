import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  funding: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Funding",
  },
  createdAt: { type: Date, default: Date.now(), required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
