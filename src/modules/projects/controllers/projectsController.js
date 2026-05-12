import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as projectService from "../services/projectsService.js";

// ============ Create Project ============
export const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body);

  res.status(StatusCodes.CREATED).json({
    message: "Project created successfully",
    data: project,
  });
});

// ============ Get All Projects ============
export const getAllProjects = asyncHandler(async (req, res) => {
  const { category, featured, page, limit } = req.query;

  const result = await projectService.getAllProjects({
    category,
    featured,
    page,
    limit,
  });

  res.status(StatusCodes.OK).json(result);
});

// ============ Get Project By Slug ============
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const project = await projectService.getProjectBySlug(slug);

  res.status(StatusCodes.OK).json({ data: project });
});

// ============ Update Project ============
export const updateProject = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const project = await projectService.updateProject(slug, req.body);

  res.status(StatusCodes.OK).json({
    message: "Project updated successfully",
    data: project,
  });
});

// ============ Delete Project ============
export const deleteProject = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  await projectService.deleteProject(slug);

  res.status(StatusCodes.OK).json({ message: "Project deleted successfully" });
});

// ============ Toggle Featured ============
export const toggleFeatured = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const project = await projectService.toggleFeatured(slug);

  res.status(StatusCodes.OK).json({
    message: `Project is now ${project.featured ? "featured" : "unfeatured"}`,
    data: project,
  });
});
