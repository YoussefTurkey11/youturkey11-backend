import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../utils/apiError.js";
import Interview from "../models/interviewsModel.js";

export const createInterview = async (body) => {
  const interview = await Interview.create(body);
  return interview;
};

export const getAllInterviews = async ({
  level,
  technology,
  page = 1,
  limit = 10,
}) => {
  const filter = {};
  if (level) filter.level = level;
  if (technology) filter.technologies = { $in: [technology] };

  const skip = (page - 1) * limit;

  const [interviews, total] = await Promise.all([
    Interview.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Interview.countDocuments(filter),
  ]);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: interviews,
  };
};

export const getInterviewById = async (id) => {
  const interview = await Interview.findById(id);

  if (!interview) {
    throw new ApiError(
      `No interview found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return interview;
};

export const updateInterview = async (id, body) => {
  const interview = await Interview.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!interview) {
    throw new ApiError(
      `No interview found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return interview;
};

export const deleteInterview = async (id) => {
  const interview = await Interview.findByIdAndDelete(id);

  if (!interview) {
    throw new ApiError(
      `No interview found with id: ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return interview;
};
