import { StatusCodes } from "http-status-codes";
import Project from "../models/projectsModel.js";
import ApiError from "../../../utils/apiError.js";

// ============ Create Project ============
export const createProject = async (body) => {
  const project = await Project.create(body);
  return project;
};

// ============ Get All Projects ============
export const getAllProjects = async ({
  category,
  featured,
  page = 1,
  limit = 10,
}) => {
  const filter = {};
  if (category) filter.category = category;
  if (featured !== undefined) filter.featured = featured === "true";

  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Project.countDocuments(filter),
  ]);

  return {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: projects,
  };
};

// ============ Get Project By Slug ============
export const getProjectBySlug = async (slug) => {
  const project = await Project.findOne({ slug });

  if (!project) {
    throw new ApiError(
      `No project found with slug: ${slug}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return project;
};

// ============ Update Project ============
export const updateProject = async (slug, body) => {
  const project = await Project.findOneAndUpdate(
    { slug },
    { ...body },
    { new: true, runValidators: true },
  );

  if (!project) {
    throw new ApiError(
      `No project found with slug: ${slug}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return project;
};

// ============ Delete Project ============
export const deleteProject = async (slug) => {
  const project = await Project.findOneAndDelete({ slug });

  if (!project) {
    throw new ApiError(
      `No project found with slug: ${slug}`,
      StatusCodes.NOT_FOUND,
    );
  }

  return project;
};

// ============ Toggle Featured ============
export const toggleFeatured = async (slug) => {
  const project = await Project.findOne({ slug });

  if (!project) {
    throw new ApiError(
      `No project found with slug: ${slug}`,
      StatusCodes.NOT_FOUND,
    );
  }

  project.featured = !project.featured;
  await project.save();

  return project;
};
