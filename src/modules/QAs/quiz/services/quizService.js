import { StatusCodes } from "http-status-codes";
import Quiz from "../models/quizModel.js";
import ApiError from "../../../../utils/apiError.js";

export const createQuiz = async (body) => {
  const quiz = await Quiz.create(body);
  return quiz;
};

export const getAllQuizzes = async ({ difficulty, page = 1, limit = 10 }) => {
  const filter = {};
  if (difficulty) filter.difficulty = difficulty;

  const skip = (page - 1) * limit;

  const [quizzes, total] = await Promise.all([
    Quiz.find(filter)
      .select("-questions.correctAnswer")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Quiz.countDocuments(filter),
  ]);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: quizzes,
  };
};

export const getQuizById = async (id) => {
  const quiz = await Quiz.findById(id).select("-questions.correctAnswer");

  if (!quiz) {
    throw new ApiError(`No quiz found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return quiz;
};

export const submitQuiz = async (id, userAnswers) => {
  const quiz = await Quiz.findById(id);

  if (!quiz) {
    throw new ApiError(`No quiz found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  let score = 0;
  const results = quiz.questions.map((q, index) => {
    const isCorrect = q.correctAnswer === userAnswers[index];
    if (isCorrect) score++;
    return {
      question: q.questionText,
      yourAnswer: userAnswers[index],
      correctAnswer: q.correctAnswer,
      isCorrect,
    };
  });

  return {
    score,
    total: quiz.questions.length,
    percentage: Math.round((score / quiz.questions.length) * 100),
    results,
  };
};

export const updateQuiz = async (id, body) => {
  const quiz = await Quiz.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!quiz) {
    throw new ApiError(`No quiz found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return quiz;
};

export const deleteQuiz = async (id) => {
  const quiz = await Quiz.findByIdAndDelete(id);

  if (!quiz) {
    throw new ApiError(`No quiz found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return quiz;
};
