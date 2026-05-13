import { StatusCodes } from "http-status-codes";
import Answer from "../models/answersModel.js";
import Question from "../../questions/models/questionsModel.js";
import ApiError from "../../../../utils/apiError.js";

// ============ Create Answer ============
export const createAnswer = async (body, userId) => {
  const question = await Question.findById(body.question);
  if (!question) {
    throw new ApiError("Question not found", StatusCodes.NOT_FOUND);
  }

  const answer = await Answer.create({ ...body, author: userId });

  await Question.findByIdAndUpdate(body.question, {
    $inc: { answersCount: 1 },
  });

  return answer;
};

// ============ Get Answers By Question ============
export const getAnswersByQuestion = async (
  questionId,
  { page = 1, limit = 10 },
) => {
  const skip = (page - 1) * limit;

  const [answers, total] = await Promise.all([
    Answer.find({ question: questionId })
      .populate("author", "fullName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Answer.countDocuments({ question: questionId }),
  ]);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: answers,
  };
};

// ============ Update Answer ============
export const updateAnswer = async (id, userId, body) => {
  const answer = await Answer.findOne({ _id: id, author: userId });

  if (!answer) {
    throw new ApiError(
      "Answer not found or not authorized",
      StatusCodes.NOT_FOUND,
    );
  }

  answer.content = body.content;
  await answer.save();

  return answer;
};

// ============ Delete Answer ============
export const deleteAnswer = async (id) => {
  const answer = await Answer.findByIdAndDelete(id);

  if (!answer) {
    throw new ApiError(`No answer found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  await Question.findByIdAndUpdate(answer.question, {
    $inc: { answersCount: -1 },
  });

  return answer;
};

// ============ Vote Answer ============
export const voteAnswer = async (answerId, userId) => {
  const answer = await Answer.findById(answerId);

  if (!answer) {
    throw new ApiError(
      `No answer found with id: ${answerId}`,
      StatusCodes.NOT_FOUND,
    );
  }

  const alreadyVoted = answer.votes.includes(userId);

  if (alreadyVoted) {
    answer.votes.pull(userId);
  } else {
    answer.votes.push(userId);
  }

  await answer.save();

  return answer;
};
