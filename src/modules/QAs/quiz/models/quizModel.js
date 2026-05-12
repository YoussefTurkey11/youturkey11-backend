import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title field is required"],
      trim: true,
    },
    questions: [
      {
        questionText: {
          type: String,
          required: [true, "Question text is required"],
        },
        options: [
          {
            type: String,
            required: [true, "Option text is required"],
          },
        ],
        correctAnswer: {
          type: String,
          required: [true, "Correct answer is required"],
        },
      },
    ],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    duration: {
      type: Number,
      required: [true, "Duration field is required"],
      default: 60,
    },
  },
  { timestamps: true },
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
