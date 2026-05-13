import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import * as skillService from "../services/skillsService.js";

// ============ Create Skill ============
export const createSkill = asyncHandler(async (req, res) => {
  const skill = await skillService.createSkill(req.body);

  res.status(StatusCodes.CREATED).json({
    message: "Skill created successfully",
    data: skill,
  });
});

// ============ Get All Skills ============
export const getAllSkills = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const result = await skillService.getAllSkills({ category });

  res.status(StatusCodes.OK).json(result);
});

// ============ Get Skill By ID ============
export const getSkillById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const skill = await skillService.getSkillById(id);

  res.status(StatusCodes.OK).json({ data: skill });
});

// ============ Update Skill ============
export const updateSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const skill = await skillService.updateSkill(id, req.body);

  res.status(StatusCodes.OK).json({
    message: "Skill updated successfully",
    data: skill,
  });
});

// ============ Delete Skill ============
export const deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await skillService.deleteSkill(id);

  res.status(StatusCodes.OK).json({ message: "Skill deleted successfully" });
});
