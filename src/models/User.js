import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  account: { type: String },
  myFunding: [{ type: mongoose.Schema.Types.ObjectId, ref: "Funding" }],
  joinedFunding: [{ type: mongoose.Schema.Types.ObjectId, ref: "Funding" }],
});

const Uer = mongoose.model("User", userSchema);

export default User;
