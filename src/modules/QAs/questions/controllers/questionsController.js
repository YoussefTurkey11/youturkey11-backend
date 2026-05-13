import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as questionService from "../services/questionsService.js";

export const createQuestion = asyncHandler(async (req, res) => {
  const question = await questionService.createQuestion(req.body, req.user._id);

  res.status(StatusCodes.CREATED).json({
    message: "Question created successfully",
    data: question,
  });
});

export const getAllQuestions = asyncHandler(async (req, res) => {
  const { tag, page, limit } = req.query;

  const result = await questionService.getAllQuestions({ tag, page, limit });

  res.status(StatusCodes.OK).json(result);
});

export const getQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const question = await questionService.getQuestionById(id);

  res.status(StatusCodes.OK).json({ data: question });
});

export const updateQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const question = await questionService.updateQuestion(
    id,
    req.user._id,
    req.body,
  );

  res.status(StatusCodes.OK).json({
    message: "Question updated successfully",
    data: question,
  });
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await questionService.deleteQuestion(id);

  res.status(StatusCodes.OK).json({ message: "Question deleted successfully" });
});
