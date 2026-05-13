import { StatusCodes } from "http-status-codes";
import Question from "../models/questionsModel.js";
import ApiError from "../../../../utils/apiError.js";

// ============ Create Question ============
export const createQuestion = async (body, userId) => {
  const question = await Question.create({ ...body, author: userId });
  return question;
};

// ============ Get All Questions ============
export const getAllQuestions = async ({ tag, page = 1, limit = 10 }) => {
  const filter = {};
  if (tag) filter.tags = { $in: [tag] };

  const skip = (page - 1) * limit;

  const [questions, total] = await Promise.all([
    Question.find(filter)
      .populate("author", "fullName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Question.countDocuments(filter),
  ]);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: questions,
  };
};

// ============ Get Question By ID ============
export const getQuestionById = async (id) => {
  const question = await Question.findById(id).populate(
    "author",
    "fullName email",
  );

  if (!question) {
    throw new ApiError(
      `No question found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return question;
};

// ============ Update Question ============
export const updateQuestion = async (id, userId, body) => {
  const question = await Question.findOne({ _id: id, author: userId });

  if (!question) {
    throw new ApiError(
      "Question not found or not authorized",
      StatusCodes.NOT_FOUND,
    );
  }

  Object.assign(question, body);
  await question.save();

  return question;
};

// ============ Delete Question ============
export const deleteQuestion = async (id) => {
  const question = await Question.findByIdAndDelete(id);

  if (!question) {
    throw new ApiError(
      `No question found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return question;
};
