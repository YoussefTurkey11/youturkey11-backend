import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title field is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description field is required"],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        required: [true, "Tag field is required"],
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author field is required"],
    },
    answersCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
