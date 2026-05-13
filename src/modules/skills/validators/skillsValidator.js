import { check } from "express-validator";
import validatorMiddleware from "../../../middleware/validator.js";

export const createSkillValidator = [
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["tech", "soft"])
    .withMessage("Category must be tech or soft"),

  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters")
    .isLength({ max: 50 })
    .withMessage("Title must be less than 50 characters"),

  validatorMiddleware,
];

export const updateSkillValidator = [
  check("category")
    .optional()
    .isIn(["tech", "soft"])
    .withMessage("Category must be tech or soft"),

  check("title")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters")
    .isLength({ max: 50 })
    .withMessage("Title must be less than 50 characters"),

  validatorMiddleware,
];
