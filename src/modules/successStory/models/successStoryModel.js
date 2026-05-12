import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title field is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description field is required"],
    },
    link: {
      type: String,
      trim: true,
      required: [true, "Link field is required"],
    },
    image: {
      type: String,
      trim: true,
      required: [true, "Image field is required"],
    },
  },
  { timestamps: true },
);

const SuccessStory = mongoose.model("SuccessStory", successStorySchema);

export default SuccessStory;
