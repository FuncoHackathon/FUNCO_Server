import mongoose from "mongoose";

const fundingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  story: { type: String, required: true },
  goal: { type: Number, required: true },
  current: { type: Number, default: 0, required: true },
  closingYear: { type: Number, required: true },
  closingMonth: { type: Number, required: true },
  closingDay: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  img: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Funding = mongoose.model("Funding", fundingSchema);

export default Funding;
