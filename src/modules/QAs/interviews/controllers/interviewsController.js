import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as interviewService from "../services/interviewsService.js";

export const createInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.createInterview(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Interview created successfully", data: interview });
});

export const getAllInterviews = asyncHandler(async (req, res) => {
  const { level, technology, page, limit } = req.query;
  const result = await interviewService.getAllInterviews({
    level,
    technology,
    page,
    limit,
  });
  res.status(StatusCodes.OK).json(result);
});

export const getInterviewById = asyncHandler(async (req, res) => {
  const interview = await interviewService.getInterviewById(req.params.id);
  res.status(StatusCodes.OK).json({ data: interview });
});

export const updateInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.updateInterview(
    req.params.id,
    req.body,
  );
  res
    .status(StatusCodes.OK)
    .json({ message: "Interview updated successfully", data: interview });
});

export const deleteInterview = asyncHandler(async (req, res) => {
  await interviewService.deleteInterview(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ message: "Interview deleted successfully" });
});
