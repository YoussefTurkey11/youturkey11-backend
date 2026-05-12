import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["tech", "soft"],
      default: "tech",
      required: [true, "Category field is required"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Title field is required"],
    },
  },
  { timestamps: true },
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
