import { StatusCodes } from "http-status-codes";
import Skill from "../models/skillsModel.js";
import ApiError from "../../../utils/apiError.js";

// ============ Create Skill ============
export const createSkill = async (body) => {
  const existSkill = await Skill.findOne({
    title: { $regex: new RegExp(`^${body.title}$`, "i") },
    category: body.category,
  });

  if (existSkill) {
    throw new ApiError("Skill already exists", StatusCodes.BAD_REQUEST);
  }

  const skill = await Skill.create(body);
  return skill;
};

// ============ Get All Skills ============
export const getAllSkills = async ({ category }) => {
  const filter = {};
  if (category) filter.category = category;

  const skills = await Skill.find(filter).sort({ category: 1, title: 1 });

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return { total: skills.length, data: grouped };
};

// ============ Get Skill By ID ============
export const getSkillById = async (id) => {
  const skill = await Skill.findById(id);

  if (!skill) {
    throw new ApiError(`No skill found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return skill;
};

// ============ Update Skill ============
export const updateSkill = async (id, body) => {
  const skill = await Skill.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!skill) {
    throw new ApiError(`No skill found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return skill;
};

// ============ Delete Skill ============
export const deleteSkill = async (id) => {
  const skill = await Skill.findByIdAndDelete(id);

  if (!skill) {
    throw new ApiError(`No skill found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return skill;
};
