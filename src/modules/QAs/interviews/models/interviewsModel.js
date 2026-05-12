import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title field is required"],
      trim: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: [true, "Question field is required"],
        },
        answer: {
          type: String,
          required: [true, "Answer field is required"],
        },
      },
    ],
    level: {
      type: String,
      required: [true, "Level field is required"],
      trim: true,
    },
    technologies: [
      {
        type: String,
        required: [true, "Technologies field is required"],
        trim: true,
      },
    ],
  },
  { timestamps: true },
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
