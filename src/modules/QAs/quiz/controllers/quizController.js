import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as quizService from "../services/quizService.js";

export const createQuiz = asyncHandler(async (req, res) => {
  const quiz = await quizService.createQuiz(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Quiz created successfully", data: quiz });
});

export const getAllQuizzes = asyncHandler(async (req, res) => {
  const { difficulty, page, limit } = req.query;
  const result = await quizService.getAllQuizzes({ difficulty, page, limit });
  res.status(StatusCodes.OK).json(result);
});

export const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await quizService.getQuizById(req.params.id);
  res.status(StatusCodes.OK).json({ data: quiz });
});

export const submitQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;
  const result = await quizService.submitQuiz(id, answers);
  res.status(StatusCodes.OK).json({ data: result });
});

export const updateQuiz = asyncHandler(async (req, res) => {
  const quiz = await quizService.updateQuiz(req.params.id, req.body);
  res
    .status(StatusCodes.OK)
    .json({ message: "Quiz updated successfully", data: quiz });
});

export const deleteQuiz = asyncHandler(async (req, res) => {
  await quizService.deleteQuiz(req.params.id);
  res.status(StatusCodes.OK).json({ message: "Quiz deleted successfully" });
});
