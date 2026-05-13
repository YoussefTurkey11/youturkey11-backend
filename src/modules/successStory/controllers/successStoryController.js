import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as successStoryService from "../services/successStoryService.js";

// ============ Create Success Story ============
export const createSuccessStory = asyncHandler(async (req, res) => {
  const story = await successStoryService.createSuccessStory(req.body);

  res.status(StatusCodes.CREATED).json({
    message: "Success story created successfully",
    data: story,
  });
});

// ============ Get All Success Stories ============
export const getAllSuccessStories = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;

  const result = await successStoryService.getAllSuccessStories({
    page,
    limit,
  });

  res.status(StatusCodes.OK).json(result);
});

// ============ Get Success Story By ID ============
export const getSuccessStoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const story = await successStoryService.getSuccessStoryById(id);

  res.status(StatusCodes.OK).json({ data: story });
});

// ============ Update Success Story ============
export const updateSuccessStory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const story = await successStoryService.updateSuccessStory(id, req.body);

  res.status(StatusCodes.OK).json({
    message: "Success story updated successfully",
    data: story,
  });
});

// ============ Delete Success Story ============
export const deleteSuccessStory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await successStoryService.deleteSuccessStory(id);

  res
    .status(StatusCodes.OK)
    .json({ message: "Success story deleted successfully" });
});
