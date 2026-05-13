import { check } from "express-validator";
import validatorMiddleware from "../../../../middleware/validator.js";

export const createQuestionValidator = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 10 })
    .withMessage("Title must be at least 10 characters")
    .isLength({ max: 300 })
    .withMessage("Title must be less than 300 characters"),

  check("description").trim().notEmpty().withMessage("Description is required"),

  check("tags")
    .isArray({ min: 1 })
    .withMessage("Tags must be an array with at least one tag"),

  check("tags.*")
    .trim()
    .notEmpty()
    .withMessage("Each tag must be a non-empty string"),

  validatorMiddleware,
];

export const updateQuestionValidator = [
  check("title")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Title must be at least 10 characters")
    .isLength({ max: 300 })
    .withMessage("Title must be less than 300 characters"),

  check("tags")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Tags must have at least one tag"),

  validatorMiddleware,
];
