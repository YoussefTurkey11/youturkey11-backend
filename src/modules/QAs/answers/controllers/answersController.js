import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as answerService from "../services/answersService.js";

export const createAnswer = asyncHandler(async (req, res) => {
  const answer = await answerService.createAnswer(req.body, req.user._id);

  res.status(StatusCodes.CREATED).json({
    message: "Answer created successfully",
    data: answer,
  });
});

export const getAnswersByQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const { page, limit } = req.query;

  const result = await answerService.getAnswersByQuestion(questionId, {
    page,
    limit,
  });

  res.status(StatusCodes.OK).json(result);
});

export const updateAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const answer = await answerService.updateAnswer(id, req.user._id, req.body);

  res.status(StatusCodes.OK).json({
    message: "Answer updated successfully",
    data: answer,
  });
});

export const deleteAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await answerService.deleteAnswer(id);

  res.status(StatusCodes.OK).json({ message: "Answer deleted successfully" });
});

export const voteAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const answer = await answerService.voteAnswer(id, req.user._id);

  res.status(StatusCodes.OK).json({
    message: answer.votes.includes(req.user._id)
      ? "Vote added"
      : "Vote removed",
    votesCount: answer.votes.length,
  });
});
