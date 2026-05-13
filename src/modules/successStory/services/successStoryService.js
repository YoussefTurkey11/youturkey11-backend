import { StatusCodes } from "http-status-codes";
import SuccessStory from "../models/successStoryModel.js";
import ApiError from "../../../utils/apiError.js";

// ============ Create Success Story ============
export const createSuccessStory = async (body) => {
  const story = await SuccessStory.create(body);
  return story;
};

// ============ Get All Success Stories ============
export const getAllSuccessStories = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [stories, total] = await Promise.all([
    SuccessStory.find().sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    SuccessStory.countDocuments(),
  ]);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: stories,
  };
};

// ============ Get Success Story By ID ============
export const getSuccessStoryById = async (id) => {
  const story = await SuccessStory.findById(id);

  if (!story) {
    throw new ApiError(
      `No success story found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return story;
};

// ============ Update Success Story ============
export const updateSuccessStory = async (id, body) => {
  const story = await SuccessStory.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!story) {
    throw new ApiError(
      `No success story found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return story;
};

// ============ Delete Success Story ============
export const deleteSuccessStory = async (id) => {
  const story = await SuccessStory.findByIdAndDelete(id);

  if (!story) {
    throw new ApiError(
      `No success story found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return story;
};
